
<div class="inputs-wrapper">
	<div class="type-tabs">
		<div class="type">
			Limit
		</div>
		<div class="type">
			Market
		</div>
	</div>
	<div class="side-tabs">
		<div class="side sel">
			Buy
		</div>
		<div class="side">
			Sell	
		</div>
	</div>
	<div class="price input-wrapper">
		<div class="label">
			Price
		</div>
		<input type="text" maxlength="15" />
		<div class="denom">
			USDC
		</div>
	</div>
	<div class="quantity input-wrapper">
		<div class="label">
			Amount	
		</div>
		<input type="text" maxlength="15" />
		<div class="denom">
			BTC
		</div>
	</div>
	<div class="total input-wrapper">
		<div class="label">
			Total	
		</div>
		<input type="text" maxlength="15" disabled />
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
	<div class="trade-btn theme-btn">
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

	.type-tabs .type {
		flex-grow: 1;

		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
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
</style>