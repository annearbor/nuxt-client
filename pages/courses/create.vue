<template>
	<div v-if="course">
		<TemplateCourseWizard
			:steps="stepList"
			:current-step="0"
			:course="course"
			:user="user"
			:teachers="teachers"
			:classes="classes"
			@course-creation-submit="create()"
		/>
		{{ user._id }}
		<h2>Teachers</h2>
		{{ teachers }}

		<h2>Students</h2>
		{{ students }}

		<h2>Klassen</h2>
		{{ classes }}
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import TemplateCourseWizard from "@components/TemplateCourseWizard";

export default {
	components: { TemplateCourseWizard },
	async asyncData({ store }) {
		try {
			const teacherRole = (await store.dispatch("roles/find", {
				query: {
					name: "teacher",
				},
			})).data[0];

			const studentsRole = (await store.dispatch("roles/find", {
				query: {
					name: "student",
				},
			})).data[0];

			const query = {
				roles: [teacherRole._id],
			};

			const teachers = (await store.dispatch("users/find", { query })).data;

			const query2 = {
				roles: [studentsRole._id],
			};
			const students = (await store.dispatch("users/find", { query: query2 }))
				.data;

			await store.dispatch("classes/find");

			return {
				teachers,
				students,
			};
		} catch (err) {}
	},
	data() {
		return {
			stepList: [
				{ name: "Kurs anlegen" },
				{ name: "Kurs-Mitglieder" },
				{ name: "Abschließen" },
			],
			course: {
				name: "",
				description: "",
				teachers: [],
				teacherIds: [],
				substitutions: [],
				classes: [],
			},
		};
	},
	computed: {
		...mapState("auth", {
			user: "user",
		}),
		...mapGetters("classes", {
			classes: "list",
		}),
	},
	created(ctx) {
		this.course.teacherIds.push(this.user._id);
	},
	methods: {
		async create(id) {
			try {
				const course = await this.$store.dispatch("courses/create", {
					schoolId: this.user.schoolId,
					name: this.course.name,
					description: this.course.description,
					teacherIds: this.course.teachers.map((teacher) => {
						return teacher["_id"];
					}),
					substitutionIds: this.course.substitutions.map((substitution) => {
						return substitution["_id"];
					}),
					classIds: this.course.classes.map((c) => {
						return c["_id"];
					}),
				});

				this.$router.push({ name: "courses" });
			} catch (e) {}
		},
	},
};
</script>
