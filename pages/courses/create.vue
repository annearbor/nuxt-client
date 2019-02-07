<template>
	<div v-if="course">
		<TemplateCourseWizard
			:steps="stepList"
			:current-step="0"
			:course="course"
			:user="user"
			@course-creation-submit="create()"
		/>
		{{ user._id }}
		<h2>Teachers</h2>
		{{ teachers }}

		<h2>Students</h2>
		{{ students }}
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import TemplateCourseWizard from "@components/TemplateCourseWizard";

export default {
	components: { TemplateCourseWizard },
	async asyncData ({ store })  {
		try {
			const teacherRole = (await store.dispatch("roles/find", {
				query: {
					name: 'teacher'
				}
			})).data[0];

			const studentsRole = (await store.dispatch("roles/find", {
				query: {
					name: 'student'
				}
			})).data[0];

			const query = {
				roles: [teacherRole._id]
			};
			const teachers = (await store.dispatch("users/find", { query })).data

			const query2 = {
				roles: [studentsRole._id]
			};			
			const students = (await store.dispatch("users/find", { query: query2 })).data

			return {
				teachers,
				students
			}
		} catch (err) { 
			console.log('err')
			console.log(err)
		}
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
				teacherIds: [],
			},
		};
	},
	computed: {
		...mapState("auth", {
			user: "user",
		})
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
					teacherIds: [this.user._id],
				});

				this.$router.push({ name: "courses" });
			} catch (e) {}
		},
	},
};
</script>
