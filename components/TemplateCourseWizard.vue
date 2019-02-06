<template>
	<div class="root">
		<h2>Kurs anlegen</h2>
		<h6
			>In einem Kurs wird gemeinsam mit den Teilnehmern an Themen, Hausaufgaben
			und Dateien gearbeitet.</h6
		>
		<div class="steps">
			<StepProgress :steps="steps" :current-step="currentStep" />

			<div v-show="currentStep == 0">
				<h3>Step 1</h3>
				<BaseInput
					v-model="course.name"
					name="name"
					label="Kursname"
					type="text"
					placeholder="z.B. 10a"
					maxlength="30"
				></BaseInput>

				<BaseInput
					v-model="course.description"
					name="description"
					label="Kursbeschreibung"
					type="textarea"
					placeholder=""
					maxlength="255"
				></BaseInput>

				<h6>Unterrichtender Lehrer</h6>
				<MultiSelect
					v-model="course.teacherIds"
					:options="teachers"
					:multiple="true"
				></MultiSelect>

				<h6>Vertretungs-Lehrer</h6>
				<MultiSelect
					v-model="course.teacherIds"
					:options="teachers"
					:multiple="true"
				></MultiSelect>
			</div>

			<div v-show="currentStep == 1">
				<h3>Step 2</h3>

				{{ course.teacherIds }}
			</div>

			<div v-show="currentStep == 2">
				<h3>Geschafft!</h3>
			</div>

			<div class="step-wrapper">
				<BaseButton
					type="button"
					class="btn btn-primary"
					:disabled="firststep"
					@click="lastStep"
				>
					Zurück
				</BaseButton>
				<BaseButton
					v-if="!laststep"
					type="button"
					class="btn btn-primary"
					:disabled="laststep"
					@click="nextStep"
				>
					Weiter
				</BaseButton>
				<BaseButton
					v-if="laststep"
					type="submit"
					class="btn btn-primary"
					@click="$emit('course-creation-submit')"
				>
					Kurs anlegen und weiter
				</BaseButton>
			</div>
		</div>
	</div>
</template>

<script>
import "../styles/base.scss";
import StepProgress from "./StepProgress.vue";
import BaseInput from "./ui/BaseInput";
import BaseButton from "./ui/BaseButton";
import MultiSelect from "vue-multiselect";

export default {
	name: "TemplateCourseWizard",
	components: { StepProgress, MultiSelect },
	props: {
		currentStep: Number,
		steps: Array,
		step: Number,
		course: Object,
		user: Object,
	},
	data() {
		return {
			teachers: ["Frau Holle"],
		};
	},
	computed: {
		firststep() {
			return this.currentStep == 0;
		},

		laststep() {
			return this.currentStep == this.steps.length - 1;
		},
		fullname() {
			return this.user.firstName + " " + this.user.lastName;
		},
	},
	created() {
		this.teachers.push(this.user._id);
	},
	methods: {
		nextStep() {
			this.currentStep = this.currentStep + 1;
		},

		lastStep() {
			this.currentStep = this.currentStep - 1;
		},
	},
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.steps {
	padding: 20px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.step-wrapper {
	display: flex;
	justify-content: space-between;
}
</style>
