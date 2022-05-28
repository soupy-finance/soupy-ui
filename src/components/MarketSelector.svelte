<script lang="ts">
	let showDropdown: boolean = false
	let marketName: string = "BTC/USDT"
</script>

<div class="wrapper">
	<div class="market-name">
		{marketName}
	</div>
	{#if showDropdown}
		<div class="dropdown">

		</div>
	{/if}
</div>

<style>
	.market-name {
		padding: 1em;
	}
</style>