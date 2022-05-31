<script lang="ts">
	import TopBar from "../components/AppTopBar.svelte";
	import Chart from "../components/Chart.svelte";
	import MarketSelector from "../components/MarketSelector.svelte";
	import OrderBook from "../components/OrderBook.svelte";
	import OrderInput from "../components/OrderInput.svelte";
	import { toPriceStr, toQtyStr, toPercentageStr } from "../number";
	import type { RecentTrades } from "../types";

	let tickerPrice: number = 30000;
	let tickerChange: number = 0;
	let tickerHigh: number = 0;
	let tickerLow: number = 0;
	let tickerVol: number = 0;

	let recentTrades: RecentTrades = [
		{ 
			price: 30000,
			size: 0.8,
			time: Date.now(),
			sell: false,
		},
		{ 
			price: 30000,
			size: 0.9,
			time: Date.now(),
			sell: true,
		},
		{ 
			price: 30000,
			size: 1.2,
			time: Date.now(),
			sell: true,
		},
		{ 
			price: 30000,
			size: 0.01,
			time: Date.now(),
			sell: true,
		},
		{ 
			price: 30000,
			size: 0.01,
			time: Date.now(),
			sell: false,
		},
	]; 
</script>

<div class="wrapper">
	<TopBar />
	<div class="core">
		<div class="left-wrapper">
			<div class="market-info-wrapper">
				<MarketSelector />
				<div class="market-info ticker-price">
					{toPriceStr(tickerPrice)} USDC
				</div>
				<div class="market-info ticker-change">
					<div class="label">
						Change:
					</div>
					{toPercentageStr(tickerChange)}%
				</div>	
				<div class="market-info ticker-high">
					<div class="label">
						24h High:
					</div>
					{toPriceStr(tickerHigh)}
				</div>
				<div class="market-info ticker-low">
					<div class="label">
						24h Low:
					</div>
					{toPriceStr(tickerLow)}
				</div>
				<div class="market-info ticker-vol">
					<div class="label">
						24h Volume:
					</div>
					{toQtyStr(tickerVol)} 
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
			<div class="recent-trades-wrapper">
				<div class="title">
					Recent Trades
				</div>
				<div class="headers">
					<div class="header price">
						Price
					</div>
					<div class="header size">
						Size	
					</div>
					<div class="header time">
						Time	
					</div>
				</div>
				<div class="recent-trades">
					{#each recentTrades as trade}
						<div class="recent-trade">
							<div class="price {trade.sell ? "sell" : "buy"}">
								{toPriceStr(trade.price)}
							</div>
							<div class="size">
								{toQtyStr(trade.size)}
							</div>
							<div class="time">
								{(new Date(trade.time)).toLocaleTimeString("it-IT")}
							</div>
						</div>
					{/each}
				</div>
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

		border-right: 2px solid var(--bg-color-third);
	}

	.center-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		width: 22em;
		border-right: 2px solid var(--bg-color-third);
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

		border-bottom: 2px solid var(--bg-color-third);
	}

	.chart-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.history-wrapper, .recent-trades-wrapper, .order-info-wrapper {
		flex-grow: 1;
	}

	.history-wrapper {
		border-top: 2px solid var(--bg-color-third);
	}

	.market-info {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		margin: 0em 0.5em;
	}

	.market-info .label {
		margin: 0em 0.5em 0em 1em;

		opacity: 0.6;
	}

	.market-info.ticker-price {
		margin-left: 2em;
		padding-right: 1em;
		border-right: 1px solid var(--bg-color-third);

		font-size: 1.05em;
		font-weight: 600;
	}

	.recent-trades-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		padding: 1em;
	}

	.recent-trades-wrapper .title {
		margin: 0em 0em 1em 0em;

		font-size: 1.1em;
		font-weight: 600;
	}

	.recent-trades-wrapper .headers {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;

		margin-bottom: 0.5em;

		opacity: 0.6;
	}
	
	.recent-trades {
		display: flex;
		flex-flow: column;
		align-items: stretch;
		justify-content: flex-start;
	}

	.recent-trade {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: space-between;
	}

	.recent-trade .price {
		font-weight: 600;
	}

	.recent-trade .price.sell {
		color: #eb5757;
	}

	.recent-trade .price.buy {
		color: #27ae60;
	}

	.recent-trades .time {
		width: 2.5em;

		direction: rtl;
		white-space: nowrap;
	}

	.order-info-wrapper {
		margin-top: 4em;
		border-top: 2px solid var(--bg-color-third);
	}
</style>