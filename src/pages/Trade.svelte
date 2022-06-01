<script lang="ts">
	import TopBar from "../components/AppTopBar.svelte";
	import Chart from "../components/Chart.svelte";
	import MarketSelector from "../components/MarketSelector.svelte";
	import OrderBook from "../components/OrderBook.svelte";
	import OrderInput from "../components/OrderInput.svelte";
	import { toPriceStr, toQtyStr, toPercentageStr } from "../number";
	import type { RecentTrades } from "../types";

	let borderThickness: string = "3px";
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

<div class="wrapper" style="--border-thickness: {borderThickness};">
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
			<div class="orders-wrapper">
				<div class="type-tabs">
					<div class="tab sel">
						Open Orders
					</div>
					<div class="tab">
						Order History	
					</div>
				</div>
				<div class="headers">
					<div class="header">
						Market	
					</div>
					<div class="header">
						Price	
					</div>
					<div class="header">
						Amount
					</div>
					<div class="header">
						Filled	
					</div>
					<div class="header">
						Value	
					</div>
					<div class="header">
						Date	
					</div>
				</div>
				<div class="rows">
					<div class="row">
						<div class="col">
							BTC/USDC
						</div>
						<div class="col">
							3000 USDC
						</div>
						<div class="col">
							1 BTC
						</div>
						<div class="col">
							0 BTC
						</div>
						<div class="col">
							3000 USDC
						</div>
						<div class="col">
							{(new Date(Date.now())).toLocaleString()}
						</div>
					</div>	
				</div>
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
				<div class="info-section">
					<div class="title">
						Fees
					</div>
					<div class="info-rows">
						<div class="info-row">
							<div class="header">
								Maker
							</div>
							<div>
								0.02%
							</div>
						</div>
						<div class="info-row">
							<div class="header">
								Taker	
							</div>
							<div>
								0.05%
							</div>
						</div>
					</div>
				</div>
				<div class="info-section">
					<div class="title">
						Assets	
					</div>
					<div class="info-rows">
						<div class="info-row">
							<div class="header">
								USDC	
							</div>
							<div>
								1000	
							</div>
						</div>
						<div class="info-row">
							<div class="header">
								BTC	
							</div>
							<div>
								2.4	
							</div>
						</div>
					</div>
				</div>
				<div class="balance-btns">
					<div class="balance-btn">
						⭳ Deposit
					</div>
					<div class="balance-btn">
						⭱ Withdraw 
					</div>
				</div>
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

		border-right: var(--border-thickness) solid var(--bg-color-third);
	}

	.center-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		width: 22em;
		border-right: var(--border-thickness) solid var(--bg-color-third);
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

		border-bottom: var(--border-thickness) solid var(--bg-color-third);
	}

	.chart-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.orders-wrapper, .recent-trades-wrapper, .order-info-wrapper {
		flex-grow: 1;
	}

	.orders-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
		
		border-top: var(--border-thickness) solid var(--bg-color-third);
	}

	.orders-wrapper .type-tabs {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.orders-wrapper .tab {
		padding: 1em;
		
		font-weight: 600;
		cursor: pointer;
	}

	.orders-wrapper .tab.sel {
		border-top: var(--border-thickness) solid var(--theme-color);
		background: linear-gradient(180deg, rgba(229,0,0,0.3) 0%, rgba(0,0,0,0) 28%);
	}

	.orders-wrapper .headers {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		margin-left: 1em;

		opacity: 0.6;
	}

	.orders-wrapper .header {
		width: 8em;
	}

	.orders-wrapper .rows {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.orders-wrapper .row {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;

		margin-left: 1em;
	}

	.orders-wrapper .col {
		width: 8em;
		margin-top: 0.2em;

		white-space: nowrap;
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
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
		
		margin-top: 3em;
		padding: 1em;
		border-top: var(--border-thickness) solid var(--bg-color-third);
	}

	.order-info-wrapper .info-section {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.order-info-wrapper .title {
		margin-bottom: 0.5em;

		font-weight: 600;
	}

	.order-info-wrapper .info-rows {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		margin-bottom: 1em;
	}

	.order-info-wrapper .info-row {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;

		margin-bottom: 0.2em;
	}

	.order-info-wrapper .header {
		opacity: 0.6;
	}

	.order-info-wrapper .balance-btns {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: space-evenly;
	}

	.order-info-wrapper .balance-btn {
		padding: 0.5em;
		border-radius: 0.5em;

		background-color: var(--bg-color-third);
		cursor: pointer;
	}
</style>