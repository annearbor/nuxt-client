<template>
	<div v-if="course">
		<section class="section">
			<h1>Kurs erstellen</h1>
			<BaseInput
				v-model="course.name"
				:name="course.name"
				label="Name"
				type="text"
				placeholder="Dream Team"
				maxlength="30"
			></BaseInput>
			<BaseInput
				v-model="course.description"
				:name="course.description"
				label="Beschreibung"
				type="textarea"
				placeholder="Everything you have to know"
				maxlength="255"
			></BaseInput>
			<button class="button is-primary" @click="create()">Speichern</button>
			<h1>{{ course.name }}</h1>
			<p>{{ course.description }}</p>
		</section>

		<TemplateCourseWizard :steps="stepList" :current-step="0" />
	</div>
</template>

<script>
import { mapState } from "vuex";
import TemplateCourseWizard from "@components/TemplateCourseWizard";

export default {
	components: { TemplateCourseWizard },
	data() {
		return {
			course: {
				name: "",
				description: "",
			},
			stepList: [{ name: "eins" }, { name: "zwei" }, { name: "drei" }],
		};
	},
	computed: {
		...mapState("auth", {
			user: "user",
		}),
	},
	methods: {
		async create(id) {
			try {
				const course = await this.$store.dispatch("courses/create", {
					schoolId: this.user.schoolId,
					name: this.course.name,
					description: this.course.description,
				});

				this.$toast.open({
					message: "Kurs erstellt",
					type: "is-success",
				});

				this.$router.push({ name: "courses" });
			} catch (e) {
				this.$toast.open({
					message: "Fehler beim Erstellen des Kurses",
					type: "is-danger",
				});
			}
		},
	},
};
</script>
