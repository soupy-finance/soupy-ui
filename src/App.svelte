<script lang="ts">
	import axios from "axios";
	import { Router, Route } from "svelte-navigator";
	import noodleClient from "noodle-ts-client/dist";
	import type { Markets } from "./markets";

	import Home from "./pages/Home.svelte";
	import Trade from "./pages/Trade.svelte";

	let themeColor = "#e53700";
	let	bgColor = "#040816";
	let	bgColorSec = "#10162d";
	let	bgColorThird = "#19203b";
	let borderColor = "#19203b";

	let markets: Markets; 

	async function loadData() {
		await noodleClient.setRestAddr(import.meta.env.VITE_NOODLE_REST_ADDR);
		await noodleClient.setRpcAddr(import.meta.env.VITE_NOODLE_RPC_ADDR);
		await noodleClient.setEventsAddr(import.meta.env.VITE_NOODLE_EVENTS_ADDR);

		let res: any = await noodleClient.query.getDexParams();
		markets = JSON.parse(res.data.params.markets);

		// let apiMarketData: Markets = await axios.get(`${import.meta.env.VITE_API_REST_ADDR}/markets`);

		// for (let marketKey in apiMarketData) {
		// 	if (markets[marketKey]) {
		// 		markets[marketKey] = {
		// 			...markets[marketKey],
		// 			...apiMarketData[marketKey],
		// 		};
		// 	}
		// }
	}
</script>

<main style="
	--theme-color: {themeColor};
	--bg-color: {bgColor}; 
	--bg-color-sec: {bgColorSec}; 
	--bg-color-third: {bgColorThird}; 
	--border-color: {borderColor};">
	<Router>
		<Route path="/" component={Home} />
		<Route path="/trade/*">
			<!-- svelte-ignore empty-block -->
			{#await loadData()}
			{:then}
			<Route path=":market" let:params let:navigate>
				{#if markets[params.market.toLowerCase()]}
					<Trade 
						marketKey={params.market.toLowerCase()}
						markets={markets} />
				{:else}
					{navigate("/trade")}	
				{/if}
			</Route>
			<Route path="/" let:navigate>
				{navigate(import.meta.env.VITE_DEFAULT_MARKET)}	
			</Route>
			<Route path="/*" let:navigate>
				{navigate("/trade")}	
			</Route>
			{/await}
		</Route>
		<Route path="/*" let:navigate>
			{navigate("/")}	
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