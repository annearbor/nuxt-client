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
		{{ users }}
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import TemplateCourseWizard from "@components/TemplateCourseWizard";

export default {
	components: { TemplateCourseWizard },
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
		}),
		...mapGetters("users", {
			users: "list",
		}),
	},
	created(ctx) {
		this.course.teacherIds.push(this.user._id);
		const query = {};
		this.$store.dispatch("users/find", {
			query: query,
		});
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
