<script lang="ts">
	import type { Book } from "../types";

	let price: number = 0;
	let book: Book = {
		bids: [],
		asks: [],
		decimals: 1,
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
			{#each book.bids as level}
				<div class="level">
					<div class="price">
						{level.price}	
					</div>	
					<div class="amount">
						{level.quantity}	
					</div>	
					<div class="total">
						{level.total}	
					</div>	
				</div>
			{/each}
		</div>
		<div class="price">
			{price}
		</div>
		<div class="book-side bids">
			{#each book.asks as level}
				<div class="level">
					<div class="price">
						{level.price}	
					</div>	
					<div class="amount">
						{level.quantity}	
					</div>	
					<div class="total">
						{level.total}	
					</div>	
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
		border-bottom: 1px solid var(--bg-color-third);
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
	}

	.book-side {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.level {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
	}

	.price {
		margin: 1em 0em;
	}
</style>