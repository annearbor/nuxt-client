<template>
	<div>
		<section class="section">
			<button
				class="button is-info"
				@click="$router.push({ name: 'teams-create' })"
				>Neues Team erstellen</button
			>
		</section>
		<section class="section">
			<div class="tile is-ancestor">
				<div v-for="(team, i) of teams" :key="i" class="tile is-parent is-4">
					<article
						:class="{
							'is-primary': i % 3 == 0,
							'is-info': i % 3 == 1,
							'is-success': i % 3 == 2,
						}"
						class="tile is-child notification"
					>
						<p class="title">{{ team.name }}</p>
						<p class="subtitle">{{ team.description }}</p>
						<p>
							<BaseLink :to="{ name: 'teams-id', params: { id: team._id } }"
								>Anschauen</BaseLink
							>
						</p>
					</article>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import isAuthenticated from "@middleware/is-authenticated";

export default {
	head() {
		return {
			title: "Teams",
		};
	},
	middleware: [isAuthenticated],
	computed: {
		...mapGetters("teams", {
			teams: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("teams/find");
		},
	},
};
</script>