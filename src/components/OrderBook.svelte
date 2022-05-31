<script lang="ts">
	import { toPriceStr, toQtyStr, toPercentageStr } from "../number";
	import type { Book } from "../types";

	let price: number = 30000;
	let book: Book = {
		bids: [
			{
				price: 30000,
				quantity: 1.2,
				total: 1.2,
			},
			{
				price: 29000,
				quantity: 3.5,
				total: 5.7,
			},
			{
				price: 28000,
				quantity: 2.3,
				total: 7,
			},
			{
				price: 27000,
				quantity: 0.8,
				total: 7.8,
			},
			{
				price: 26000,
				quantity: 4.0,
				total: 10.1,
			},
		],
		asks: [
			{
				price: 31000,
				quantity: 1.2,
				total: 1.2,
			},
			{
				price: 32000,
				quantity: 3.5,
				total: 4.7,
			},
			{
				price: 33000,
				quantity: 2.3,
				total: 7.0,
			},
			{
				price: 34000,
				quantity: 6.0,
				total: 13.0,
			},
			{
				price: 35000,
				quantity: 4.4,
				total: 17.4,
			},
		],
		max: 17.4,
	};
</script>

<div class="book-wrapper">
	<div class="title">
		Order Book
	</div>
	<div class="book">
		<div class="headers">
			<div class="header">
				Price
			</div>
			<div class="header">
				Amount	
			</div>
			<div class="header">
				Total	
			</div>
		</div>
		<div class="book-side asks">
			{#each book.asks as level}
				<div class="level">
					<div class="price">
						{toPriceStr(level.price)}	
					</div>	
					<div class="amount">
						{toQtyStr(level.quantity)}	
					</div>	
					<div class="total">
						{toQtyStr(level.total)}	
					</div>	
					<div class="depth-bar" style="width: {level.total / book.max * 70}%" />
				</div>
			{/each}
		</div>
		<div class="last-price bid">
			{price}
		</div>
		<div class="book-side bids">
			{#each book.bids as level}
				<div class="level">
					<div class="price">
						{toPriceStr(level.price)}	
					</div>	
					<div class="amount">
						{toQtyStr(level.quantity)}	
					</div>	
					<div class="total">
						{toQtyStr(level.total)}	
					</div>	
					<div class="depth-bar" style="width: {level.total / book.max * 70}%" />
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.book-wrapper {
		display: flex;
		flex-flow: column;
		align-items: stretch;
		justify-content: flex-start;

		padding: 1em;
		border-bottom: 2px solid var(--bg-color-third);
	}

	.title {
		margin: 0em 0em 1em 0em;

		font-size: 1.1em;
		font-weight: 600;
	}

	.book {
		display: flex;
		flex-flow: column;
		align-items: stretch;
		justify-content: flex-start;
	}

	.headers {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;

		margin-bottom: 0.5em;

		opacity: 0.6;
	}

	.book-side {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.book-side.asks {
		flex-direction: column-reverse;
	}

	.last-price {
		margin: 1em 0em;

		font-size: 1.05em;
		font-weight: 700;
	}

	.level {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;

		position: relative;
	}

	.price {
		font-weight: 600;
	}

	.total {
		width: 2.7em;

		direction: rtl;
	}

	.asks .price, .last-price.ask {
		color: #eb5757;
	}

	.bids .price, .last-price.bid {
		color: #27ae60;
	}

	.depth-bar {
		position: absolute;
		right: 0em;
		height: 100%;
		z-index: -1;

		opacity: 0.2;
	}

	.asks .depth-bar {
		background-color: #eb5757;
	}

	.bids .depth-bar {
		background-color: #27ae60;
	}
</style>