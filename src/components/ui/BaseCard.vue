<template>
	<section v-bind="$attrs" class="card">
		<header class="customcard-header">
			<slot name="header" />
		</header>
		<div class="customcard-content">
			<slot />
		</div>
		<footer class="customcard-footer">
			<slot name="footer" />
		</footer>
	</section>
</template>

<style lang="scss" scoped>
@import "@styles";

.card {
	padding: var(--space-sm) var(--space-md);
	overflow: hidden;
	background: #fff;
	border: 1px solid var(--color-gray);
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-sm);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;
	&:hover {
		box-shadow: var(--shadow-sm);
	}
}
</style>
