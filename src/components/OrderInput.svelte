<script lang="ts">
	import * as noodleClient from "noodle-ts-client/dist";
	import { account } from "../account";
	import type { Market } from "../markets";

	export let marketKey: string;
	export let marketInfo: Market;
	export let mainAsset: string;
	export let quoteAsset: string;
	let price: number = 0; 
	let quantity: number = 0; 
	let orderValue: number = 0;
	let side: boolean = false;
	let orderType: noodleClient.types.OrderType = noodleClient.types.OrderType.Limit;

	$: {
		orderValue = price * quantity;

		if (isNaN(orderValue))
			orderValue = 0;
	}
	$: {
		if (price < 0)
			price = 0;

		if (quantity < 0)
			quantity = 0;
	}

	function sendOrder() {
		noodleClient.tx.createOrder(marketKey, price, quantity, side, orderType);
	}
</script>

<div class="inputs-wrapper">
	<div class="type-tabs">
		<div 
			class="tab {orderType == noodleClient.types.OrderType.Limit && "sel"}"
			on:click={() => orderType = noodleClient.types.OrderType.Limit}>
			Limit
		</div>
		<div 
			class="tab {orderType == noodleClient.types.OrderType.Market && "sel"}"
			on:click={() => orderType = noodleClient.types.OrderType.Market}>
			Market
		</div>
	</div>
	<div class="side-tabs">
		<div 
			class="side {!side && "sel"}"
			on:click={() => side = false}>
			Buy
		</div>
		<div 
			class="side {side && "sel"}"
			on:click={() => side = true}>
			Sell	
		</div>
	</div>
	<div class="price input-wrapper">
		<div class="label">
			Price
		</div>
		<input 
			type="text" 
			maxlength="15"
			bind:value={price} />
		<div class="denom">
			USDC
		</div>
	</div>
	<div class="quantity input-wrapper">
		<div class="label">
			Amount	
		</div>
		<input 
			type="text" 
			maxlength="15"
			bind:value={quantity} />
		<div class="denom">
			BTC
		</div>
	</div>
	<div class="total input-wrapper">
		<div class="label">
			Value	
		</div>
		<input 
			type="text" 
			maxlength="15" 
			bind:value={orderValue}
			disabled />
		<div class="denom">
			USDC	
		</div>
	</div>
	<div class="flags">
		<div class="flag">
			<input type="checkbox" />
			<div class="label">
				Post Only
			</div>
		</div>
		<div class="flag">
			<input type="checkbox" />
			<div class="label">
					IoC
			</div>
		</div>
		<div class="flag">
			<input type="checkbox" />
			<div class="label">
					FoK	
			</div>
		</div>
	</div>
	<div 
		class="trade-btn theme-btn"
		on:click={() => $account.wallet && sendOrder()}
		disabled={!$account.wallet}>
		Trade
	</div>
</div>

<style>
	.inputs-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: flex-start;

		padding: 0em 2em;
	}

	.type-tabs {
		align-self: stretch;

		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;

		height: 3em;
	}

	.type-tabs .tab {
		flex-grow: 1;

		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;

		font-weight: 600;
		cursor: pointer;
	}

	.type-tabs .tab.sel {
		border-top: var(--border-thickness) solid var(--theme-color);
		background: linear-gradient(180deg, rgba(229,0,0,0.3) 0%, rgba(0,0,0,0) 28%);
	}

	.side-tabs {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;

		margin: 1em 0em;
		padding: 0.3em;
		border-radius: 0.5em;

		background-color: var(--bg-color-sec);
	}

	.side-tabs .side {
		padding: 0.7em 3em;
		border-radius: 0.5em;

		cursor: pointer;
	}

	.side-tabs .side.sel {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;

		background-color: var(--bg-color-third);
	}

	.input-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		
		position: relative;

		margin-top: 1em;
		padding: 0.8em;
		border: 2px solid white;
		border-radius: 0.5em;
	}

	.input-wrapper .label {
		position: absolute;
		top: -1em;

		padding: 0.3em;

		background-color: var(--bg-color);
	}

	.input-wrapper .denom {
		position: absolute;
		right: 0.8em;
	}

	.input-wrapper input {
		background: none;
		border: none;

		font-size: 1em;
		color: white;
		outline: none;
	}

	.input-wrapper.total {
		border-color: #a0a0a0;
		color: #a0a0a0;
	}

	.flags {
		align-self: stretch;

		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: flex-start;

		margin-top: 2em;
		padding-top: 1em;
		border-top: 1px solid var(--bg-color-third);
	}

	.flag {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		margin-right: 1em;

		white-space: nowrap;
	}

	.trade-btn {
		margin-top: 2em;
		padding: 0.8em 5em;

		border-radius: 0.5em;
	}

	.trade-btn[disabled=true] {
		opacity: 0.6;
		cursor: default;
	}
</style>