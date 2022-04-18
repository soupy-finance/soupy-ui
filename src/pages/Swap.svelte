<script lang="ts">
	import {
		Router, Route, Link, router
	} from "yrv";

	import AssetInput from "../components/AssetInput.svelte";

	let swapFromNetwork: string = "solana";
	let swapToNetwork: string = "solana";
	let swapFromAsset: string = "btc";
	let swapToAsset: string = "eth";
	let lastSwapFromAsset: string = swapFromAsset;
	let lastSwapToAsset: string = swapToAsset;
	let swapFromAssetQuantity: number = 0;
	let networks: Object = {
		"solana": "sol",
		"ethereum": "eth",
		"avalanche": "avax",
		"terra": "luna",
		"bsc": "bnb",
		"fantom": "ftm"
	};
	let assets: Object = {
		"usdc": {
			name: "USD Coin",
			price: 1,
			balance: 0,
			cmcId: 3408,
			color: "#2775ca"
		},
		"ust": {
			name: "Terra USD",
			price: 1,
			balance: 0,
			cmcId: 7129,
			color: "#5493f7"
		},
		"usdt": {
			name: "Tether",
			price: 1,
			balance: 0,
			cmcId: 825,
			color: "#26a17b"
		},
		"btc": {
			name: "Bitcoin",
			price: 41000,
			balance: 0,
			cmcId: 1,
			color: "#f7931a"
		},
		"eth": {
			name: "Ether",
			price: 4100,
			balance: 0,
			cmcId: 1027,
			color: "#797f9f"
		},
		"sol": {
			name: "Solana",
			price: 100,
			balance: 0,
			cmcId: 5426,
			color: "#667ee0"
		},
		"avax": {
			name: "Avalanche",
			price: 80,
			balance: 0,
			cmcId: 5805,
			color: "#e84142"
		},
		"luna": {
			name: "Terra",
			price: 90,
			balance: 0,
			cmcId: 4172,
			color: "#172852"
		},
		"bnb": {
			name: "BNB",
			price: 400,
			balance: 0,
			cmcId: 1839,
			color: "#bd9108"
		},
		"ftm": {
			name: "Fantom",
			price: 2,
			balance: 0,
			cmcId: 3513,
			color: "#1969ff"
		},
		"matic": {
			name: "Polygon",
			price: 2,
			balance: 0,
			cmcId: 3890,
			color: "#8247e5"
		},
	};

	$: swapToAssetQuantity = assets[swapFromAsset].price * swapFromAssetQuantity / assets[swapToAsset].price;
	$: {
		if (swapFromAsset == swapToAsset) {
			if (swapFromNetwork == swapToNetwork) {
				if (lastSwapFromAsset == swapFromAsset) {
					swapFromAsset = lastSwapToAsset;
					lastSwapFromAsset = swapFromAsset;
					lastSwapToAsset = swapToAsset;
				}
				else {
					swapToAsset = lastSwapFromAsset;
					lastSwapToAsset = swapToAsset;
					lastSwapFromAsset = swapFromAsset;
				}
			}
		}
		else {
			lastSwapFromAsset = swapFromAsset;
			lastSwapToAsset = swapToAsset;
		}
	}

	function flipAssets() {
		let temp: string = swapFromAsset;
		swapFromAsset = swapToAsset;
		swapToAsset = temp;
	}
</script>

<div class="wrapper">
	<div class="swap">
		<div class="entry">
			<AssetInput 
				assets={assets} 
				networks={networks}
				bind:currentNetwork={swapFromNetwork}
				bind:currentAssetSymbol={swapFromAsset}
				bind:quantity={swapFromAssetQuantity} />
			<div class="reverse-btn" on:click={flipAssets}>
				⟹
			</div>
			<AssetInput 
				secondary
				assets={assets} 
				networks={networks}
				quantity={swapToAssetQuantity}
				bind:currentNetwork={swapToNetwork}
				bind:currentAssetSymbol={swapToAsset} />
		</div>
		<div class="swap-btn">
			Swap
		</div>
		<div class="process-info">

		</div>
	</div>
</div>

<style>
	.wrapper {
		flex-grow: 1;
	}

	.swap {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
		
		max-width: 55em;
		margin: auto;
	}

	.entry {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;

		margin-bottom: 2em;
	}

	.swap-settings {
		flex-grow: 2;

		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
	}

	.reverse-btn {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		
		margin: 0em 1em;
		width: 2em;
		height: 2em;

		border-radius: 50em;
		background-color: var(--theme-color-sec);
		color: var(--bg-color);
		box-shadow: 0px 0px 3px 0.1px black; 
		cursor: pointer;
	}

	.swap-btn {
		align-self: center;

		padding: 0.5em;
		border-radius: 0.2em;

		background-color: var(--theme-color);
		box-shadow: 0px 0px 3px 0.1px black; 
		cursor: pointer;
	}

	.swap-btn:hover {
		opacity: 0.8;
	}

	.swap-info {
		flex-grow: 1;

		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: space-between;
	}

	.info-row {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: space-between;
	}

	.info-title {
		font-weight: bold;
		color: var(--theme-color-sec);
	}

	.process-info {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}
</style>

