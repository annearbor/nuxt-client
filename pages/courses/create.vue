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
			const roles = await store.dispatch("roles/find");
			const teacherRole = roles.data.find((r) => r.name === "teacher");
			const query = {
				roles: [teacherRole._id],
			};
			await store.dispatch("users/find", {
				query,
			});

			await store.dispatch("classes/find");
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
				substitutions: [],
				classes: [],
			},
		};
	},
	computed: {
		...mapState("auth", {
			user: "user",
		}),
		...mapGetters("users", {
			teachers: "list",
		}),
		...mapGetters("classes", {
			classes: "list",
		}),
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
