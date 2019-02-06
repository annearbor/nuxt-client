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
				<div class="form-group">
					<label for="coursename">Kursname</label>
					<input
						name="coursename"
						class="form-control"
						aria-describedby="coursename"
						placeholder=""
					/>
				</div>
				<div class="form-group">
					<label for="teacher">Unterrichtender Lehrer</label>
					<input
						name="teacher"
						class="form-control"
						aria-describedby="teacher"
						placeholder=""
					/>
				</div>
				<div class="form-group">
					<label for="teacher">Vertretungslehrer</label>
					<input
						name="replacementteacher"
						class="form-control"
						aria-describedby="replacementteacher"
						placeholder=""
					/>
				</div>
			</div>

			<div v-show="currentStep == 1">
				<h3>Step 2</h3>
				<div class="form-group">
					<label for="select">Kursmitglieder auswählen</label>
					<select class="form-control" name="select">
						<option>1a</option>
						<option>2a</option>
						<option>3c</option>
						<option>4a</option>
						<option>5b</option>
					</select>
				</div>
			</div>

			<div v-show="currentStep == 2">
				<h3>Geschafft!</h3>
			</div>

			<div class="step-wrapper">
				<button
					type="button"
					class="btn btn-primary"
					:disabled="firststep"
					@click="lastStep"
				>
					Zurück
				</button>
				<button
					type="button"
					class="btn btn-primary"
					:disabled="laststep"
					@click="nextStep"
				>
					Weiter
				</button>
				<button v-if="laststep" type="submit" class="btn btn-primary">
					Kurs anlegen und weiter
				</button>
			</div>
			{{ firststep }}, {{ laststep }}
		</div>
	</div>
</template>

<script>
import "../styles/base.scss";
import StepProgress from "./StepProgress.vue";
import BaseInput from "./ui/BaseInput";
import BaseButton from "./ui/BaseButton";

export default {
	name: "TemplateCourseWizard",
	components: { StepProgress },
	props: {
		currentStep: Number,
		steps: Array,
		step: Number,
	},
	computed: {
		firststep() {
			return this.currentStep == 0;
		},

		laststep() {
			return this.currentStep == this.steps.length - 1;
		},
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.steps {
	padding: 20px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.step-wrapper {
	text-align: right;
}
</style>
