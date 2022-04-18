<script lang="ts">
	import AssetLogo from "./AssetLogo.svelte";
	import AssetSearch from "./AssetSearch.svelte";
	import { capitalize } from "../utils";
	import type { Asset } from "../types";

	export let assets: Object;
	export let networks: Object;
	export let currentNetwork: string;
	export let currentAssetSymbol: string;
	export let secondary: boolean = false;
	export let quantity: number = 0;

	let currentAsset: Asset;
	let currentAssetColor: string;
	let currentAssetGradient: string;
	let currentNetworkColor: string;
	let showAssetSearch: boolean = false;
	let showNetworkSearch: boolean = false;

	$: currentAsset = assets[currentAssetSymbol];
	$: currentAssetColor = currentAsset.color;
	$: currentAssetColorShift = gradientBrightnessShift(currentAssetColor);
	$: currentAssetGradient = `linear-gradient(90deg, ${currentAssetColor} 0%, ${currentAssetColorShift} 100%)`
	$: currentNetworkColor = assets[networks[currentNetwork]].color;

	function gradientBrightnessShift(color: string): string {
		let shiftAmt = 0x0e0e0e;
		let colorNum: number = parseInt(color.slice(1, color.length), 16);
		let newColorNum: number = colorNum + shiftAmt;

		if ((newColorNum & 0x0000ff) < (colorNum & 0x0000ff))
			newColorNum = (newColorNum & 0xffff00) | colorNum;

		if ((newColorNum & 0x00ff00) < (colorNum & 0x00ff00))
			newColorNum = (newColorNum & 0xff00ff) | colorNum;

		if ((newColorNum & 0xff0000) < (colorNum & 0xff0000))
			newColorNum = (newColorNum & 0x00ffff) | colorNum;

		return "#" + (newColorNum).toString(16);
	}

	function setMaxQuantity() {
		quantity = currentAsset.balance;
	}
</script>


<div 
	class="wrapper"
	style="--asset-color: {currentAssetGradient}; --asset-shift-color: {currentAssetColorShift}; --network-color: {currentNetworkColor};">
	<div class="network" on:click={(e) => showNetworkSearch = true}>
		<AssetLogo cmcId={assets[networks[currentNetwork]].cmcId} />
		<div class="asset-name">
			{capitalize(currentNetwork)}
		</div>	
	</div>
	<div class="asset">
		{#if currentAsset}
			<div class="logo-and-name" on:click={(e) => showAssetSearch = true}>
				<AssetLogo cmcId={currentAsset.cmcId} />
				<div class="asset-name">
					{currentAsset.name}
				</div>	
			</div>
			{#if !secondary}
				<div class="quantity">
					<div class="input-wrapper">
						<input 
							bind:value={quantity}
							placeholder=0 />
						<div class="max-btn" on:click={setMaxQuantity}>
							MAX
						</div>
					</div>
					<div class="divider">
						/
					</div>
					<div class="balance">
						{currentAsset.balance} {currentAssetSymbol.toUpperCase()}
					</div>
				</div>
			{:else}
				<div class="recv-qty">
					{quantity} {currentAssetSymbol.toUpperCase()}
				</div>
			{/if}
		{:else}
			<div class="logo-and-name placeholder">
				<div class="asset-logo placeholder" />
				<div class="asset-name placeholderj" />	
			</div>
			<div class="price placeholder" />
			<div class="balance placeholder" />
		{/if}
		<AssetSearch 
			bind:show={showAssetSearch}
			bind:currentAssetSymbol={currentAssetSymbol}
			assets={assets} />
		<AssetSearch 
			isNetwork	
			bind:show={showNetworkSearch}
			bind:currentNetwork={currentNetwork}
			assets={assets}
			networks={networks} />
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		width: 14em;
	}

	.network {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		margin-bottom: 1em;
		padding: 0.2em;
		border-radius: 0.2em;
		
		background-color: var(--network-color);
		box-shadow: 0px 0px 3px 0.1px black; 
		font-weight: bold;
		cursor: pointer;
	}

	.asset {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		justify-content: flex-start;

		padding: 1em;
		border-radius: 0.2em;

		background: var(--asset-color);
		box-shadow: 0px 0px 3px 0.1px black; 
	}

	.logo-and-name {
		align-self: stretch;

		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		
		margin-bottom: 1em;
		padding: 0.2em;
		border-radius: 0.2em;

		background-color: var(--asset-shift-color);
		font-weight: bold;
		cursor: pointer;
	}

	.quantity {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
	}

	.input-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		
		position: relative;
	}

	.quantity input {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 0.5em;
		border-radius: 0.2em;
		border: none;

		background-color: var(--asset-shift-color);
		color: white;
		font-size: 1em;
	}

	.max-btn {
		position: absolute;
		right: 0.2em;
		padding: 0.2em;
		border-radius: 0.2em;

		background-color: #444;
		font-size: 0.7em;
		cursor: pointer;
	}

	.divider {
		margin: 0em 0.5em;
	}

	.balance {
		white-space: nowrap;
	}

	.recv-qty {
		align-self: stretch;

		padding: 0.5em;
		border-radius: 0.2em;

		background-color: var(--asset-shift-color);
	}
</style>