<script lang="ts">
	import { toPriceStr, toQtyStr, toPercentageStr } from "../number";
	import type { Books } from "../orderBook";

	export let price: number = 0;
	export let mainAsset: string = "";
	export let quoteAsset: string = "";
	export let books: Books;
</script>

<div class="book-wrapper">
	<div class="title">
		Order Book
	</div>
	<div class="book">
		<div class="headers">
			<div class="header">
				Price ({quoteAsset})
			</div>
			<div class="header">
				Amount ({mainAsset})	
			</div>
			<div class="header">
				Total ({mainAsset})	
			</div>
		</div>
		<div class="book-side asks">
			{#each books.asks as level}
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
					<div class="depth-bar" style="width: {level.total / books.max * 70}%" />
				</div>
			{/each}
		</div>
		<div class="last-price">
			{toPriceStr(price)}
		</div>
		<div class="book-side bids">
			{#each books.bids as level}
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
					<div class="depth-bar" style="width: {level.total / books.max * 70}%" />
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
		border-bottom: var(--border-thickness) solid var(--bg-color-third);
	}

	.title {
		margin: 0em 0em 1em 0em;

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