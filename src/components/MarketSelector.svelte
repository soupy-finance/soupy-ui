<script lang="ts">
	import type { Market, Markets } from "../markets";

	export let marketPair: string;
	export let markets: Markets; 
	let marketPairs: string[]
	let showDropdown: boolean = false

	$: marketPairs = Object.keys(markets);
</script>

<div class="market-sel-wrapper">
	<div class="market-name">
		{marketPair} 
	</div>
	<div class="drop-arrow">
		▼
	</div>
	{#if showDropdown}
		<div class="dropdown">
			<div class="search-wrapper">

			</div>
			<div class="buttons-wrapper">
			</div>
			<div class="headers">
				<div class="header">
					Market
				</div>
				<div class="header">
					Price
				</div>
				<div class="header">
					24h Change	
				</div>
			</div>
			<div class="markets-wrapper">
				{#each marketPairs as _marketPair}
					<div class="market">

					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.market-sel-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		padding: 1em;
		border-right: 1px solid var(--bg-color-sec);
	}

	.market-name {
		font-size: 1.05em;
	}

	.drop-arrow {
		margin-left: 0.5em;

		font-size: 0.8em;
	}
</style>