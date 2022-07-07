<script lang="ts">
	import axios from "axios";
	import { Router, Route } from "svelte-navigator";
	import * as noodleClient from "noodle-ts-client/dist";
	import { assets } from "./assets";
	import type { Markets } from "./markets";

	import Home from "./pages/Home.svelte";
	import Trade from "./pages/Trade.svelte";
	import Notification from "./components/Notification.svelte";

	let themeColor = "#e53700";
	let	bgColor = "#040816";
	let	bgColorSec = "#10162d";
	let	bgColorThird = "#19203b";
	let borderColor = "#19203b";

	let markets: Markets; 

	async function loadData() {
		await noodleClient.setRestAddr(import.meta.env.VITE_NOODLE_REST_ADDR);
		await noodleClient.setRpcAddr(import.meta.env.VITE_NOODLE_RPC_ADDR);
		await noodleClient.setWsAddr(import.meta.env.VITE_NOODLE_EVENTS_ADDR);

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

		noodleClient.events.addEventsListener(
			`tm.event='NewBlock' AND prices.data EXISTS`, 
			(events, data) => {
				let prices = JSON.parse(events.prices[0].data);

				// assets.update((assets) => {
				// 	for (let assetKey in prices) {
				// 		if (assets[assetKey]) {
				// 			assets[assetKey].price = prices[assetKey];
				// 		}
				// 	}
				// 	return assets;
				// });

				for (let assetKey in prices) {
					if ($assets[assetKey]) {
						$assets[assetKey].price = parseFloat(prices[assetKey]);
					}
				}
			}
		);
	}
</script>

<main style="
	--theme-color: {themeColor};
	--bg-color: {bgColor}; 
	--bg-color-sec: {bgColorSec}; 
	--bg-color-third: {bgColorThird}; 
	--border-color: {borderColor};">
	<Router>
		<!-- svelte-ignore empty-block -->
		{#await loadData()}
		{:then}
		<Route path="/" component={Home} />
		<Route path="/trade/*">
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
		</Route>
		<Route path="/*" let:navigate>
			{navigate("/")}	
		</Route>
		{/await}
	</Router>
	<Notification />
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