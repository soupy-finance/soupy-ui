<script>
	import { Link } from "svelte-navigator";
</script>

<div class="topbar home">
	<Link to="/" class="link">
		<div class="logo" />
	</Link>
	<div class="navbar">
		<a href="#" class="link">Home</a>
		<a href="#about" class="link">About</a>
		<a href="#timeline" class="link">Timeline</a>
		<a href="https://docs.soupy.finance" class="link">Docs</a>
	</div>
	<Link to="/trade">
		<div class="app-btn">
			Go to app	
		</div>
	</Link>
</div>

<style>
	:global(.topbar.home .logo) {
		width: 3em;
		height: 3em;
		background-image: url("/images/logo_no_bg.svg");
		background-size: contain;
	}

	.topbar {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-evenly;

		margin: 1em 0em 5em 0em;
	}

	.navbar {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: center;
	}

	.link {
		margin: 0em 1em;
		padding: 0.4em; 
		border-radius: 0.2em;
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

	.app-btn {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		padding: 0.6em 0.7em;
		border-radius: 0.5em;

		background: rgb(229,0,0);
		background: linear-gradient(90deg, rgba(229,0,0,1) 0%, rgba(229,110,0,1) 100%);	
		box-shadow: 0px 0px 3px 0.1px black; 
		color: white;
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