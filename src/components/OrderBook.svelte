<script lang="ts">
	let price: number = 0;
	let bids = [];
	let asks = [];
</script>

<div class="wrapper">
	<div class="title">
		Order Book
	</div>
	<div class="book">
		<div class="asks">

		</div>
		<div class="price">
			{price}
		</div>
		<div class="bids">

		</div>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-flow: column;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.book {
		display: flex;
		flex-flow: column;
		align-items: stretch;
		justify-content: flex-start;
	}
</style>