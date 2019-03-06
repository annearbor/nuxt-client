<template>
	<transition name="modal">
		<div v-if="active" class="modal-mask">
			<div
				class="modal-wrapper"
				@mousedown.self="handleBackgroundClick"
				@touchstart.self="handleBackgroundClick"
			>
				<div class="modal-container">
					<slot />
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		active: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		handleBackgroundClick() {
			this.close();
		},
		close() {
			this.$emit("update:active", false);
		},
	},
};
</script>

<style>
.modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9998;
	display: table;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 300px;
	margin: 0 auto;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
}

.modal-header {
	position: relative;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: flex-start;
	padding: 20px;
	background-color: #f5f5f5;
	border-bottom: 1px solid #dbdbdb;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
}

.modal-header h3 {
	font-size: 1.5rem;
	font-weight: 600;
}

.modal-body {
	padding: 20px;
	background-color: #fff;
}

.modal-footer {
	position: relative;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: flex-end;
	padding: 20px;
	background-color: #f5f5f5;
	border-top: 1px solid #dbdbdb;
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;
}

.modal-default-button {
	float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>