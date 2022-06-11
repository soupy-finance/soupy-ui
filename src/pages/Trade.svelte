<script lang="ts">
	import axios from "axios";
	import { noodleClient } from "../noodle";
	import { toPriceStr, toQtyStr, toPercentageStr } from "../number";
	import { parseBooksFromChainData, Books } from "../orderBook";
	import type { Market, Markets, RecentTrades, OpenOrders, OrderHistory, Account } from "../markets";

	import TopBar from "../components/AppTopBar.svelte";
	import Chart from "../components/Chart.svelte";
	import MarketSelector from "../components/MarketSelector.svelte";
	import OrderBook from "../components/OrderBook.svelte";
	import OrderInput from "../components/OrderInput.svelte";

	export let marketKey: string 
	export let markets: Markets; 
	let marketPair: string;
	let marketInfo: Market;
	let borderThickness: string = "3px";
	let recentTrades: RecentTrades = [];
	let openOrders: OpenOrders = []; 
	let orderHistory: OrderHistory = [];
	let books: Books;
	let account: Account;

	$: marketPair = marketKey.split("-").join("/").toUpperCase();
	$: marketInfo = markets[marketKey];
	$: mainAsset = marketKey.split("-")[0].toUpperCase();
	$: quoteAsset = marketKey.split("-")[1].toUpperCase();
	$: {
		if (account) {
			(async () => {
				let data: {open: OpenOrders, history: OrderHistory} = 
					await axios.get(`${import.meta.env.VITE_API_REST_ADDR}/accountOrders/${account}`);
				openOrders = data.open;
				orderHistory = data.history;
			})();
		}
	}

	async function loadData() {
		let res: any[] = await Promise.all([
			$noodleClient.modules.dex.query.queryBooks(marketKey),
			// axios.get(`${import.meta.env.VITE_API_REST_ADDR}/recentTrades/${marketKey}`),
		]);

		books = parseBooksFromChainData(res[0].data);
		// recentTrades = res[1];
	}
</script>

<svelte:head>
	<title>
		Trade | Soupy
	</title>
</svelte:head>

<div class="wrapper" style="--border-thickness: {borderThickness};">
	<TopBar />
	<!-- svelte-ignore empty-block -->
	{#await loadData()}
	{:then}
	<div class="core">
		<div class="left-wrapper">
			<div class="market-info-wrapper">
				<MarketSelector 
					marketPair={marketPair}
					markets={markets} />
				<div class="market-info ticker-price">
					{toPriceStr(marketInfo.price)} {quoteAsset} 
				</div>
				<div class="market-info ticker-change">
					<div class="label">
						24h Change:
					</div>
					{toPercentageStr(marketInfo.change)}%
				</div>	
				<div class="market-info ticker-high">
					<div class="label">
						24h High:
					</div>
					{toPriceStr(marketInfo.high) + " " + quoteAsset}
				</div>
				<div class="market-info ticker-low">
					<div class="label">
						24h Low:
					</div>
					{toPriceStr(marketInfo.low) + " " + quoteAsset}
				</div>
				<div class="market-info ticker-vol">
					<div class="label">
						24h Volume:
					</div>
					{toQtyStr(marketInfo.volume) + " " + mainAsset} 
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
					{#each openOrders as order}
						<div class="row">
							<div class="col">
								{order.market}	
							</div>
							<div class="col">
								{toPriceStr(order.price)} {order.quoteAsset} 
							</div>
							<div class="col">
								{toQtyStr(order.quantity)} {mainAsset} 
							</div>
							<div class="col">
								{toQtyStr(order.filled)} {mainAsset} 
							</div>
							<div class="col">
								{toQtyStr(order.price * order.quantity)} {quoteAsset} 
							</div>
							<div class="col">
								{(new Date(Date.now())).toLocaleString()}
							</div>
						</div>	
					{/each}
				</div>
			</div>
		</div>
		<div class="center-wrapper">
			<OrderBook
				price={marketInfo.price}
				books={books}
				mainAsset={mainAsset}
				quoteAsset={quoteAsset} />
			<div class="recent-trades-wrapper">
				<div class="title">
					Recent Trades
				</div>
				<div class="headers">
					<div class="header price">
						Price ({quoteAsset})
					</div>
					<div class="header size">
						Size ({mainAsset})	
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
								{quoteAsset}	
							</div>
							<div>
								1000	
							</div>
						</div>
						<div class="info-row">
							<div class="header">
								{mainAsset}	
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
	{/await}
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

	.recent-trades-wrapper .headers .time {
		width: 5em;

		direction: rtl;
		white-space: nowrap;
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