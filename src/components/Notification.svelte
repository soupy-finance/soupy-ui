<script>
	import { notification, NotifType } from "../notification";
</script>

{#if $notification.title}
<div class="notif">
	<div class="icon">
		{#if $notification.type == NotifType.Success}
			✓
		{:else if $notification.type == NotifType.Error}
			ⓧ
		{:else}
			<!-- 🛈 -->
			ⓘ	
		{/if}
	</div>
	<div class="main">
		<div class="title">
			{$notification.title}
		</div>
		<div class="content">
			{$notification.content}
		</div>
	</div>
</div>
{/if}

<style>
	.notif {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;

		position: fixed;
		bottom: 2em;
		right: 2em;
		width: 20em;

		z-index: 2;
		background-color: var(--bg-color-third);
		box-shadow: 0px 0px 10px 3px black;
	}

	.icon {
		width: 1em;
		padding: 1em;

		font-size: 2em;
	}

	.main {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
		
		border-left: 2px solid black;

		overflow-x: hidden;
	}

	.title {
		padding: 0.5em 1em;

		white-space: nowrap;
		font-weight: 700;
	}

	.content {
		padding: 0.5em 0.5em 0.5em 1em;
	}
</style>