<div class="footer">
	<div class="brand">
		<img 
			src="/images/logo_no_bg.svg" 
			alt="logo"
			width=60 />
		<div class="site-name">
			Soupy
		</div>
	</div>
	<div class="sitemap">
		<a href="#">Home</a>
		<a href="#about">About</a>
		<a href="#timeline">Timeline</a>
		<a href="https://docs.soupy.finance">Docs</a>
	</div>
	<div class="socials">
		<a href="https://twitter.com/SoupyFinance" target="_blank">
			<img
				src="/images/icons/twitter.svg"
				alt="twitter"
				width=20 />
		</a>
		<a href="https://github.com/soupy-finance" target="_blank">
			<img
				src="/images/icons/github.svg"
				alt="github"
				width=20 />
		</a>
		<a href="https://discord.gg/2eaQKjVUM3" target="_blank">
			<img
				src="/images/icons/discord.svg"
				alt="discord"
				width=20 />
		</a>
	</div>
</div>

<style>
	.footer {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: center;
		
		background-color: black;
	}

	.brand {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		font-weight: bold;
	}

	.sitemap {
		flex-basis: 22em;

		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;

		margin: 2em 15em;
	}

	.socials {
		flex-basis: 6em;

		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;

		opacity: 0.6;
	}	

	@media (max-width: 1200px) {
		.footer {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			justify-content: flex-start;

			padding: 0em 2em;
		}

		.sitemap {
			flex-basis: 0em;

			margin: 1em 0em;
		}

		.socials {
			flex-basis: 0em;
		}

		.sitemap a, .socials a {
			margin: 0em 0.3em;
		}
	}
</style>