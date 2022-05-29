<script lang="ts">
	import TopBar from "../components/AppTopBar.svelte";
	import Chart from "../components/Chart.svelte";
	import MarketSelector from "../components/MarketSelector.svelte";
	import OrderBook from "../components/OrderBook.svelte";
	import OrderInput from "../components/OrderInput.svelte";

	let tickerPrice: number = 0;
	let tickerChange: number = 0;
	let tickerHigh: number = 0;
	let tickerLow: number = 0;
	let tickerVol: number = 0;
</script>

<div class="wrapper">
	<TopBar />
	<div class="core">
		<div class="left-wrapper">
			<div class="market-info-wrapper">
				<MarketSelector />
				<div class="ticker-price">
					{tickerPrice}
				</div>
				<div class="ticker-change">
					Change: {tickerChange}%
				</div>	
				<div class="ticker-high">
					24h High: {tickerHigh}
				</div>
				<div class="ticker-low">
					24h Low: {tickerLow}
				</div>
				<div class="ticker-vol">
					24h Vol: {tickerVol} 
				</div>
			</div>
			<div class="chart-wrapper">
				<Chart />
			</div>
			<div class="history-wrapper">

			</div>
		</div>
		<div class="center-wrapper">
			<OrderBook />
			<div class="trades-wrapper">

			</div>
		</div>
		<div class="right-wrapper">
			<OrderInput />
			<div class="order-info-wrapper">
				<!-- Fees, balances, account leverage, deposit/withdraw button -->
			</div>
		</div>
	</div>
</div>

<style>
	.wrapper {
		flex-grow: 1;

		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.core {
		flex-grow: 1;

		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.left-wrapper {
		flex-grow: 1;

		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		border-right: 1px solid var(--bg-color-third);
	}

	.center-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		width: 22em;
		border-right: 1px solid var(--bg-color-third);
	}

	.right-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		width: 22em;
	}

	.market-info-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		border-bottom: 1px solid var(--bg-color-third);
	}

	.market-info-wrapper div {
		margin: 0em 1em;
	}

	.chart-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.history-wrapper, .trades-wrapper, .order-info-wrapper {
		flex-grow: 1;
	}

	.history-wrapper {
		border-top: 1px solid var(--bg-color-third);
	}
</style>