<template>
	<div class="root">
		<div v-for="(time, i) of value" :key="i" class="time-wrapper">
			<base-button design="icon" class="btn-delete" @click="popTime(time)">
				<base-icon icon="delete" source="material" />
			</base-button>
			<base-select
				v-model="time.weekday"
				:options="weekdayOptions"
				:allow-empty="false"
				label="name"
				class="item"
			/>
			<base-input
				v-model="time.room"
				label="Raum"
				name="room"
				type="text"
				class="item"
			/>
			<base-input
				v-model="time.startTime"
				label="Start"
				name="startTime"
				type="time"
				class="item"
			/>
			<base-input
				v-model="time.duration"
				label="Dauer"
				name="duration"
				type="text"
				class="item"
			/>
		</div>
		<base-button design="primary" @click="addTime">
			Schulstundentermin im Stundenplan anlegen
		</base-button>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			weekdays: [
				{ value: 0, name: "Montag" },
				{ value: 1, name: "Dienstag" },
				{ value: 2, name: "Mittwoch" },
				{ value: 3, name: "Donnerstag" },
				{ value: 4, name: "Freitag" },
				{ value: 5, name: "Samstag" },
				{ value: 6, name: "Sonntag" },
			],
		};
	},
	computed: {
		weekdayOptions() {
			return this.weekdays.map((weekday) => ({
				value: weekday,
				label: weekday.name,
			}));
		},
	},
	methods: {
		addTime() {
			this.value.push({
				weekday: this.weekdays[0],
				startTime: "08:00",
				duration: "60",
				room: "H1",
			});
		},
		popTime(t) {
			this.value.pop(t);
		},
	},
};
</script>

<style scoped>
.time-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.btn-delete {
	padding-right: var(--space-sm);
}
.item {
	padding: 0 var(--space-xxxs);
}
</style>
