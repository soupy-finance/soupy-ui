<script lang="ts">
	import Modal from "./Modal.svelte";
	import AssetLogo from "./AssetLogo.svelte";
	import { capitalize } from "../utils";

	export let show: boolean = false;
	export let isNetwork: boolean = false;
	export let assets: Object = {};
	export let networks: Object = {};
	export let currentAssetSymbol: string = "";
	export let currentNetwork: string = "";

	let query: string = "";
	let queriedAssets: string[];
	let queriedNetworks: string[];

	$: {
		if (!isNetwork)
			queriedAssets = Object.keys(assets).filter((symbol) => assetQueried(symbol, query));
		else 
			queriedNetworks = Object.keys(networks).filter((network) => networkQueried(network, query));
	}

	function chooseAsset(symbol) {
		currentAssetSymbol = symbol;
		show = false;
	}

	function chooseNetwork(network) {
		currentNetwork = network;
		show = false;
	}

	function assetQueried(symbol, query) {
		symbol = symbol.toLowerCase();
		query = query.toLowerCase();
		let name = assets[symbol].name.toLowerCase();

		return symbol.indexOf(query) != -1 || name.indexOf(query) != -1;
	}

	function networkQueried(network, query) {
		network = network.toLowerCase();
		query = query.toLowerCase();
		let symbol = networks[network];

		return network.indexOf(query) != -1 || symbol.indexOf(query) != -1;
	}
</script>

{#if show}
	<Modal bind:show width={25}>
		<div class="modal-content">
			<div class="modal-top">
				<input 
					class="query-input" 
					placeholder="Asset Name"
					bind:value={query} />
				<div class="close-btn" on:click|stopPropagation={() => show = false}>
					✕
				</div>
			</div>
			<div class="asset-list">
				{#if !isNetwork}
					{#each queriedAssets as symbol}
						<div 
							class="asset-row {currentAssetSymbol == symbol ? "sel" : ""}" 
							on:click|stopPropagation={() => chooseAsset(symbol)}>
							<div class="asset-info">
								<AssetLogo cmcId={assets[symbol].cmcId} />	
								<div class="asset-symbol">
									{symbol.toUpperCase()}
								</div>
							</div>
							<div class="balance">
								{assets[symbol].balance} {symbol.toUpperCase()}
							</div>
						</div>
					{/each}
				{:else}
					{#each queriedNetworks as network}
						<div 
							class="asset-row {currentNetwork == network ? "sel" : ""}" 
							on:click|stopPropagation={() => chooseNetwork(network)}>
							<div class="asset-info">
								<AssetLogo cmcId={assets[networks[network]].cmcId} />	
								<div class="asset-symbol">
									{capitalize(network)}
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</Modal>
{/if}

<style>
	.modal-content {
		flex-grow: 1;

		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		padding: 1em;
	}

	.modal-top {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
	}

	.query-input {
		flex-grow: 1;

		margin-right: 1em;
		padding: 0.5em;
		border: 1px solid #1c1c1c;
		border-radius: 0.2em;

		background-color: transparent;
		color: white;
		font-size: 1em;
	}

	.close-btn {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		
		width: 2em;
		height: 2em;

		color: white;
		cursor: pointer;
	}
	
	.close-btn:hover {
		opacity: 0.8;
	}

	.asset-list {
		flex-grow: 1;

		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		overflow-y: auto;
	}

	.asset-row {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		margin-top: 1em;
		padding: 0.5em;
		border-radius: 0.2em;

		cursor: pointer;
	}

	.asset-row.sel {
		background-color: #302f2c;
		cursor: default;
	}

	.asset-row.sel:hover {
		background-color: #302f2c;
	}

	.asset-info {
		flex-grow: 1;

		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
	}

	.asset-symbol {
		font-weight: bold;
	}

	.asset-row:hover {
		background-color: #2c2b28;
	}
</style>
