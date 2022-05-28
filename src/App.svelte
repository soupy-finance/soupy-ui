<script lang="ts">
	import {
		Router, Route, Link, router
	} from "yrv";

	import Home from "./pages/Home.svelte";
	import Trade from "./pages/Trade.svelte";

	let	bgColor = "#040816";
	let	bgColorSec = "#10162d";
	let	bgColorThird = "#19203b";
	let borderColor = "#19203b";
</script>

<main style="
	--bg-color: {bgColor}; 
	--bg-color-sec: {bgColorSec}; 
	--bg-color-third: {bgColorThird}; 
	--border-color: {borderColor};">
	<Router path="/" condition={() => window.location.pathname == "/"}>
		<Home />
	</Router>
	<Router>
		<Route path="/trade">
			<Trade />
		</Route>
	</Router>
</main>

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