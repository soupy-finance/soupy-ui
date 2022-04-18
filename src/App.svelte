<script lang="ts">
	import {
		Router, Route, Link, router
	} from "yrv";

	import Home from "./pages/Home.svelte";
	// import Swap from "./pages/Swap.svelte";
	// import Trade from "./pages/Trade.svelte";
	// import Farm from "./pages/Farm.svelte";
</script>

<Router>
	<main>
		{#if window.location.pathname == "/"}
			<Route path="/">
				<Home />
			</Route>
		{:else}
			<!-- <Route path="/swap"><Swap /></Route>
			<Route path="/trade"><Trade /></Route>
			<Route path="/farm"><Farm /></Route>
			<Route path="/build"></Route> -->
			<Route fallback>404</Route>
		{/if}
	</main>
</Router>

<style>
	main {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		width: 100%;
		height: 100%;
	}
</style>