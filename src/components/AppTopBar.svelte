<script>
	import {
		Link
	} from "yrv";
</script>

<div class="topbar app">
	<div class="left">
		<Link href="/" class="link">
			<div class="logo" />
		</Link>
		<div class="navbar">
			<Link href="/swap">
				Swap	
			</Link>
			<Link href="/trade">
				Trade
			</Link>
			<Link href="/farm">
				Farm	
			</Link>
			<Link href="/borrow">
				Borrow	
			</Link>
		</div>
	</div>
	<div class="wallet-btn">
		Connect wallet	
	</div>
</div>

<style>
	:global(.topbar.app .logo) {
		display: block;
		width: 2.5em;
		height: 2.5em;
		margin: 0em 0.4em 0em 0.8em; 

		background-image: url("/images/logo_no_bg.svg");
		background-size: contain;
	}

	:global(.topbar.app .navbar a) {
		margin: 0em 0.6em;
	}

	:global(.topbar.app .navbar a[aria-current]) {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		padding: 0.3em 0.7em;
		border-radius: 0.5em;

		background: rgb(229,0,0);
		background: linear-gradient(90deg, rgba(229,0,0,1) 0%, rgba(229,110,0,1) 100%);	
		box-shadow: 0px 0px 3px 0.1px black; 
		color: white;
		cursor: pointer;
	}

	.topbar {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;

		margin: 0.3em 0em 0em 0em;
		border-bottom: 2px solid var(--border-color);
	}

	.left {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
	}

	.navbar {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
	}

	.logo {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		font-size: 1.5em;
		font-weight: bold;
		text-decoration: none;
	}

	.wallet-btn {
		margin-right: 2em;
		padding: 0.4em 0.8em;
		border-radius: 0.5em;

		background-color: var(--bg-color-third);
		cursor: pointer;
	}

	@media (max-width: 950px) {
		.topbar {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			justify-content: flex-start;
		}

		.navbar {
			margin: 2em 0em;
		}
	}
</style>