<template>
	<div v-if="course">
		<section class="section">
			<h1>Kurs erstellen</h1>
			<BaseInput
				v-model="course.name"
				label="Name"
				type="text"
				placeholder="Dream Team"
				maxlength="30"
			></BaseInput>
			<BaseInput
				v-model="course.description"
				label="Beschreibung"
				type="textarea"
				placeholder="Everything you have to know"
				maxlength="255"
			></BaseInput>
			<BaseInput
				v-model="course.name"
				label="Name"
				type="text"
				placeholder="Dream Team"
				maxlength="30"
			></BaseInput>
			<button class="button is-primary" @click="create()">Speichern</button>
		</section>

		<TemplateCourseWizard
			:steps="stepList"
			:current-step="0"
			:course="course"
			:user="user"
			@course-creation-submit="create()"
		/>

		{{ this.user._id }}
	</div>
</template>

<script>
import { mapState } from "vuex";
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
	},
	created() {
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
