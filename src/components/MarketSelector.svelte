<script lang="ts">
	let showDropdown: boolean = false
	let marketName: string = "BTC/USDC"
</script>

<div class="market-sel-wrapper">
	<div class="market-name">
		{marketName} 
	</div>
	<div class="drop-arrow">
		▼
	</div>
	{#if showDropdown}
		<div class="dropdown">

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