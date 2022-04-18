<script lang="ts">
	export let show: boolean;
	export let width: number = 30;
	export let height: number = 40;
	export let margin: number = 5;
</script>

{#if show}
	<div 
		class="modal-wrapper" 
		style="--height: {height}em; --width: {width}em; --margin: {margin}em;"
		on:mousedown|stopPropagation={() => show = false}>
		<div class="modal" on:mousedown|stopPropagation>
			<slot />	
		</div>
	</div>
{/if}

<style>
	.modal-wrapper {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: center;
		align-content: center;
		
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;

		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal {
		flex-basis: var(--width); 

		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;

		margin: var(--margin);
		max-height: var(--height);
		border-radius: 0.2em;

		background-color: var(--bg-color);
		cursor: default;
	}
</style>