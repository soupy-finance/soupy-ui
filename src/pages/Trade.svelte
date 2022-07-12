<script lang="ts">
	import { onDestroy } from "svelte";
	import axios from "axios";
	import * as noodleClient from "noodle-ts-client/dist";
	import { 
		parseBooksFromChainData, 
		processBookUpdateQueue, 
		addBookOrder, 
		updateBookOrder, 
		removeBookOrder, 
		Books, 
		BookUpdate 
	} from "../orderBook";
	import { toPriceStr, toQtyStr, toPercentageStr, parseAssetInt } from "../number";
	import { Market, Markets, RecentTrades, OpenOrders, OrderHistory, sortOpenOrders } from "../markets";
	import { account } from "../account";
	import { assets } from "../assets";
	import { balances } from "../balances";

	import TopBar from "../components/AppTopBar.svelte";
	import Chart from "../components/Chart.svelte";
	import MarketSelector from "../components/MarketSelector.svelte";
	import OrderBook from "../components/OrderBook.svelte";
	import OrderInput from "../components/OrderInput.svelte";

	export let marketKey: string 
	export let markets: Markets; 
	let marketPair: string;
	let marketInfo: Market;
	let books: Books;
	let recentTrades: RecentTrades = [];
	let openOrders: OpenOrders = []; 
	let orderHistory: OrderHistory = [];
	let mainAssetPrice: number = 0;
	let mainAssetBalance: number = 0;
	let quoteAssetBalance: number = 0;
	let booksBlockHeight: number = 0;
	let booksUpdateQueue: BookUpdate[] = []; 
	let eventsHandlersIds: number[] = [];

	let borderThickness: string = "3px";

	$: marketPair = marketKey.split("-").join("/").toUpperCase();
	$: marketInfo = markets[marketKey];
	$: mainAsset = marketKey.split("-")[0].toUpperCase();
	$: quoteAsset = marketKey.split("-")[1].toUpperCase();
	$: mainAssetPrice = mainAsset ? $assets[mainAsset.toLowerCase()].price : 0;
	$: mainAssetBalance = mainAsset ? ($balances[mainAsset.toLowerCase()] || 0) : 0;
	$: quoteAssetBalance = quoteAsset ? ($balances[quoteAsset.toLowerCase()] || 0) : 0;
	// $: {
	// 	if ($account.address) {
	// 		(async () => {
	// 			let res: any[] = await Promise.all([
	// 				noodleClient.query.getBalance($account.address, mainAsset.toLowerCase()),
	// 				noodleClient.query.getBalance($account.address, quoteAsset.toLowerCase()),
	// 			]);

	// 			mainAssetBalance = parseAssetInt(res[0].data.balance.amount);
	// 			quoteAssetBalance = parseAssetInt(res[1].data.balance.amount);
	// 		})();
	// 	}
	// }
	$: {
		if ($account.address) {
			(async () => {
				let res: any[] = await Promise.all([
					noodleClient.query.getOpenOrders($account.address),	
					//axios.get(`${import.meta.env.VITE_API_REST_ADDR}/orderHistory/${$account.address}`),
				]);

				let newOpenOrders: any = JSON.parse(res[0].data.orders || "{}");
				openOrders = Object.values(newOpenOrders).map((order: any) => ({
					id: order.Id,
					market: order.Market.toUpperCase(),
					price: parseFloat(order.Price),
					quantity: parseFloat(order.Quantity),
					filled: parseFloat(order.Filled),
					side: order.Side == "a",
					date: parseInt(order.Date) * 1000,
					mainAsset: order.Market.split("-")[0].toUpperCase(),
					quoteAsset: order.Market.split("-")[1].toUpperCase(),
				}));
				openOrders = sortOpenOrders(openOrders); 

				// orderHistory = res[1];
			})();
		}
	}

	async function loadData() {
		let res: any[] = await Promise.all([
			noodleClient.query.getBooks(marketKey),
			// axios.get(`${import.meta.env.VITE_API_REST_ADDR}/recentTrades/${marketKey}`),
		]);

		books = parseBooksFromChainData(res[0].data);
		booksBlockHeight = parseInt(res[0].headers.get("Grpc-Metadata-X-Cosmos-Block-Height"));
		books = processBookUpdateQueue(books, booksUpdateQueue, booksBlockHeight);

		// recentTrades = res[1];
	}

	function onDepositClick() {
		axios.get(`${import.meta.env.VITE_FAUCET_ADDR}/deposit?address=${$account.address}`);
	}

	eventsHandlersIds.push(noodleClient.events.addEventsListener(
		`tm.event='Tx' AND add_offer.market EXISTS AND add_offer.market='${marketKey}'`, 
		(events, data) => {
			let blockHeight = parseInt(data.value.TxResult.height);

			for (let order of events.add_offer) {
				let update = {
					blockHeight,
					type: "add",
					id: order.id,
					quantity: parseFloat(order.quantity),
					price: parseFloat(order.price),
					side: order.side == "a",
				};

				if (booksBlockHeight == 0)
					booksUpdateQueue.push(update);
				else
					books = addBookOrder(books, update.id, update.price, update.quantity, update.side);

				openOrders.push({
					id: order.id,
					market: order.market,
					price: parseFloat(order.price),
					quantity: parseFloat(order.quantity),
					filled: 0,
					side: order.side == "a",
					date: blockHeight * 1000,
					mainAsset: order.market.split("-")[0].toUpperCase(),
					quoteAsset: order.market.split("-")[1].toUpperCase(),
				});
				openOrders = sortOpenOrders(openOrders);
			}
		}
	));

	eventsHandlersIds.push(noodleClient.events.addEventsListener(
		`tm.event='Tx' AND update_offer.market EXISTS AND update_offer.market='${marketKey}'`, 
		(events, data) => {
			let blockHeight = parseInt(data.value.TxResult.height);

			for (let order of events.update_offer) {
				order = {
					blockHeight,
					type: "update",
					id: order.id,
					quantity: parseFloat(order.quantity),
				};

				if (booksBlockHeight == 0)
					booksUpdateQueue.push(order);
				else
					books = updateBookOrder(books, order.id, order.quantity);

				openOrders = openOrders.map((_order: any) => {
					if (_order.id == order.id)
						return { ..._order, filled: order.quantity - _order.quantity };
					else
						return _order;
				});
			}
		}
	));

	eventsHandlersIds.push(noodleClient.events.addEventsListener(
		`tm.event='Tx' AND remove_offer.market EXISTS AND remove_offer.market='${marketKey}'`, 
		(events, data) => {
			let blockHeight = parseInt(data.value.TxResult.height);

			for (let order of events.remove_offer) {
				order = {
					blockHeight,
					type: "remove",
					id: order.id,
				};

				if (booksBlockHeight == 0)
					booksUpdateQueue.push(order);
				else
					books = removeBookOrder(books, order.id);

				openOrders = openOrders.filter((_order: any) => _order.id != order.id);
			}
		}
	));

	onDestroy(() => {
		for (let id of eventsHandlersIds)
			noodleClient.events.removeEventsListener(id);
	});
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
					{toPriceStr(mainAssetPrice)} {quoteAsset} 
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
					<div class="header side">
						Side	
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
					<div class="header date">
						Date	
					</div>
				</div>
				<div class="rows">
					{#each openOrders as order}
						<div class="row">
							<div class="col">
								{order.market}	
							</div>
							<div class="col side {order.side ? "sell" : "buy"}">
								{order.side ? "Sell" : "Buy"}
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
							<div class="col date">
								{(new Date(order.date)).toLocaleString()}
							</div>
							<div class="col cancel-btn">
								Cancel
							</div>
						</div>	
					{/each}
				</div>
			</div>
		</div>
		<div class="center-wrapper">
			<OrderBook
				price={mainAssetPrice}
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
			<OrderInput
				marketKey={marketKey}
				marketInfo={marketInfo}
				mainAsset={mainAsset}
				quoteAsset={quoteAsset} />
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
								{toPercentageStr(marketInfo.fees.maker)}%
							</div>
						</div>
						<div class="info-row">
							<div class="header">
								Taker	
							</div>
							<div>
								{toPercentageStr(marketInfo.fees.taker)}%
							</div>
						</div>
					</div>
				</div>
				{#if $account.address}
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
								{quoteAssetBalance}	
							</div>
						</div>
						<div class="info-row">
							<div class="header">
								{mainAsset}	
							</div>
							<div>
								{mainAssetBalance}
							</div>
						</div>
					</div>
				</div>
				<div class="balance-btns">
					<div 
						class="balance-btn"
						on:click={onDepositClick}>
						⭳ Deposit
					</div>
					<div class="balance-btn">
						⭱ Withdraw 
					</div>
				</div>
				{/if}
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
		margin-top: 0.2em;

		white-space: nowrap;
	}

	.orders-wrapper .col.buy {
		color: #27ae60;
	}

	.orders-wrapper .col.sell {
		color: #eb5757;
	}

	.orders-wrapper .header, .orders-wrapper .col {
		width: 8em;
	}

	.header.side, .col.side {
		width: 4em;
	}

	.header.date, .col.date {
		width: 12em;
	}

	.cancel-btn {
		opacity: 0.8;
		cursor: pointer;
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