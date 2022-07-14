<script>
	import TopBar from "../components/HomeTopBar.svelte";
	import Footer from "../components/Footer.svelte";
	import AssetLogo from "../components/AssetLogo.svelte";
	import { assets } from "../stores";

	let displayedAssets = ["eth", "atom", "sol", "avax", "luna", "bnb", "ftm"];
</script>

<div class="wrapper">
	<TopBar />
	<div class="section a">
		<h1>
			The centralized exchange killer
		</h1>
		<h3>
			A decentralized, layer one exchange with cross-chain liquidity
		</h3>
		<h3>		
			Deposit from and withdraw to any chain 
		</h3>
		<a class="docs-btn" href="https://docs.soupy.finance">
			Check our docs <div class="chev">›</div>
		</a>
		<img 
			class="any-chain-fig" 
			src="/images/any_chain.svg" 
			alt="any chain" />
	</div>
	<div id="about" class="section b">
		<div class="headers">
			<h2>
				On-chain order books combined with oracle AMMs
			</h2>
			<div class="sub-headers">
				<h3>
					From simple swaps, to advanced spot trading, to perpetual futures, there's something for everyone
				</h3>
				<h3>
					Market make on the books by simply depositing into a pool
				</h3>
			</div>
		</div>
		<img 
			class="on-chain-fig" 
			src="/images/on_chain.svg" 
			alt="on chain" />
	</div>
	<div class="section c">
		<div class="headers-wrapper">
			<div class="header">
				<h2>
					Blazing fast, with sub-second transactions 
				</h2>
				<img 
					class="blazing-fast-fig" 
					src="/images/blazing_fast.svg" 
					alt="blazing fast" 
					width=150 />
			</div>
			<div class="sub-headers">
				<h3>
					The most performant on-chain exchange in existence
				</h3>
				<h3>
					Oracles, relays, and trading logic are seamlessly integrated into our custom Cosmos chain, Noodle
				</h3>
			</div>
		</div>
		<div class="price-widgets">
			{#each displayedAssets as symbol (symbol)}
				<div class="price-widget">
					<div class="top">
						<div class="asset-header">
							<AssetLogo cmcId={$assets[symbol].cmcId} />
							<div class="asset-name">
								{$assets[symbol].symbol}	
							</div>	
						</div>
						<div class="change">
							<div class="percent">
								1.0%
							</div>
							<div class="time">
								last 24h
							</div>
						</div>
					</div>
					<div class="price">
						${$assets[symbol].price}	
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="section d">
		<div class="box purple">
			<div class="headers">
				<h2>
					Deposit and withdraw with fiat
				</h2>
				<h3>
					No more convoluted DeFi onboarding
				</h3>
			</div>
			<div class="img-wrapper">
				<img src="/images/deposit.png" alt="deposit" width=300 />
			</div>
		</div>
		<div class="box green">
			<div class="headers">
				<h2>
					DAO governed
				</h2>
				<h3>
					One token for both governance and staking
				</h3>
			</div>
			<div class="img-wrapper">
				<img src="/images/dao.png" alt="dao" width=300 />
			</div>
		</div>
	</div>
	<div class="section e" id="timeline">
		<h2>
			Our Timeline
		</h2>
		<div class="time-nodes-wrapper">
			<div class="time-nodes">
				<div class="time-node down">
					<img src="/images/timeline_node_down.svg" alt="time node" />
					<div class="time">
						Q2 2022
					</div>
					<div class="details">
						<div class="item">
							<img src="/images/diamond.svg" width=14 />
							Litepaper publication
						</div>
						<div class="item">
							<img src="/images/diamond.svg" width=14 />
							Noodle devnet with spot trading
						</div>
					</div>
				</div>
				<div class="time-node up">
					<div class="details">
						<div class="item">
							<img src="/images/diamond.svg" width=14 />
							Noodle testnet with swaps, spot trading, oAMMs, and cross-chain deposits/withdrawals 
						</div>
						<div class="item">
							<img src="/images/diamond.svg" width=14 />
							SOUP token ICO
						</div>
					</div>
					<div class="time">
						Q3 2022
					</div>
					<img src="/images/timeline_node_up.svg" alt="time node" />
				</div>
				<div class="time-node down">
					<img src="/images/timeline_node_down.svg" alt="time node" />
					<div class="time">
						Q4 2022
					</div>
					<div class="details">
						<div class="item">
							<img src="/images/diamond.svg" width=14 />
							Noodle mainnet genesis
						</div>
						<div class="item">
							<img src="/images/diamond.svg" width=14 />
							SOUP token IDO on the Soupy exchange
						</div>
						<div class="item">
							<img src="/images/diamond.svg" width=14 />
							Lending platform launch
						</div>
					</div>
				</div>
				<div class="time-node up">
					<div class="details">
						<div class="item">
							<img src="/images/diamond.svg" width=14 />
							Perpetual futures launch (crypto, commodities, and forex)
						</div>
						<div class="item">
							<img src="/images/diamond.svg" width=14 />
							Fiat on/offboarding launch
						</div>
						<div class="item">
							<img src="/images/diamond.svg" width=14 />
							Custom market and cross-chain token service launch
						</div>
					</div>
					<div class="time">
						Q1 2023
					</div>
					<img src="/images/timeline_node_up.svg" alt="time node" />
				</div>
			</div>
		</div>
		<div class="line-bg" />
	</div>
	<div class="section f">
		<div class="banner">
			<h2>
				For questions and technical details
			</h2>
			<a class="docs-btn" href="https://docs.soupy.finance">
				Check our docs <div class="chev">›</div>
			</a>
		</div>
		<div class="ribbon" />
	</div>
	<Footer />
	<div class="background">
		<img src="/images/header_bg.png" />
	</div>
</div>

<style>
	.wrapper {
		flex-grow: 1;

		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.section {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: flex-start;
	}

	.section.a h1 {
		margin-bottom: 0.5em;

		font-size: 4em;
	}

	.section.a h3 {
		margin: 0.3em;

		font-weight: normal;
	}

	.docs-btn {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		
		margin-top: 2em;
		padding: 0.6em 0.7em;
		border-radius: 0.5em;

		background: rgb(229,0,0);
		background: linear-gradient(90deg, rgba(229,0,0,1) 0%, rgba(229,110,0,1) 100%);	
	}

	.chev {
		height: 0.5em;
		margin-left: 0.6em;

		font-size: 2em;
		line-height: 0.4em;
	}

	.any-chain-fig {
		margin-top: 2em;
	}

	.section.b {
		margin-top: 10em;
	}

	.section.b .headers {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
	}

	.section.b .sub-headers {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		justify-content: flex-start;

		margin-left: 5em;
	}

	.section.b h2 {
		max-width: 15em;

		font-size: 2.5em;
	}

	.section.b h3 {
		max-width: 23em;

		font-weight: normal;
	}

	.section.b h3:last-child {
		margin-top: 0.2em;
	}

	.on-chain-fig {
		margin-top: -11em;
		z-index: -1;
	}

	.section.c {
		margin-top: 8em;
	}

	.section.c .headers-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.section.c .header {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
	}

	.section.c .sub-headers {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.section.c h2 {
		max-width: 12em;
		margin-bottom: 0.4em;

		font-size: 2.5em;
	}

	.section.c h3 {
		margin: 0.2em;
		max-width: 28em;

		font-weight: normal;
	}

	.blazing-fast-fig {
		margin-top: -3em;
	}

	.price-widgets {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: center;

		margin-top: 7em;
		width: 100%;

		overflow-x: hidden;
	}

	.price-widget {
		flex-basis: 12em;
		flex-grow: 0;
		flex-shrink: 0;

		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
		
		margin: 0em 1em;
		padding: 1.3em;
		border-radius: 1em;

		background-color: #10162d;
	}

	.price-widget .top {
		display: flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		justify-content: space-between;
	}

	.price-widget .asset-header {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
	}

	.price-widget .asset-name {
		margin-left: 0.5em;

		font-weight: bold;
		font-size: 1.2em;
	}

	.price-widget .change {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: flex-start;
	} 

	.price-widget .change .percent {
		padding: 0.2em 0.5em;
		border-radius: 1em;

		background-color: #27ae60;
		font-size: 0.8em;
	}

	.price-widget .change .time {
		font-size: 0.8em;
	}

	.price-widget .price {
		margin-top: 0.5em;
		margin-left: 0.3em;

		font-weight: 500;
	} 
	
	.section.d {
		display: flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		justify-content: center;
		
		margin-top: 10em;
	}

	.section.d .box {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		justify-content: flex-start;
		
		padding: 1em;
		border-radius: 2em;
	}

	.section.d .purple.box {
		margin-right: 1em;
		margin-bottom: 4em;

		background-color: #8d00cf;
	}

	.section.d .green.box {
		align-self: flex-end;

		margin-left: 1em;

		background-color: #2fa579;
	}

	.section.d .headers {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		justify-content: flex-start;

		max-width: 15em;
		margin-left: 1em;
	}

	.section.d h2 {
		margin-bottom: 0.5em;
	}

	.section.d h3 {
		margin-top: 0em;

		font-weight: normal;
	}

	.section.d .img-wrapper {
		align-self: stretch;

		border-radius: 1em;

		background-color: #10162d;
	}

	.section.e {
		position: relative;
	}

	.section.e h2 {
		margin: 5em 0em 2em 0em;
		font-size: 2.5em;
	}

	.time-nodes-wrapper {
		width: 100%;
	}

	.time-nodes {
		display: flex;
		flex-flow: row nowrap;
		align-items: flex-start;
		justify-content: center;
	}

	.time-node {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		justify-content: flex-start;

		margin: 0em 2em;
	}

	.time-node.down {
		align-self: flex-end;

		margin-top: 13.9em;
	}

	.time-node .details {
		flex-basis: 7em;

		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;

		max-width: 25em;
		max-height: 7em;
	}

	.time-node.down .details {
		justify-content: flex-start;
	}

	.time-node.up .details {
		justify-content: flex-end;
	}

	.time-node .item {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
	}

	.time-node .item img {
		margin-right: 0.2em;
	}

	.time-node.down .item {
		margin-top: 0.5em;
	}

	.time-node.up .item {
		margin-bottom: 0.5em;
	}

	.time-node .time {
		font-weight: 600;
		margin: 0.5em 0em;
	}

	.section.e .line-bg {
		position: absolute;
		z-index: -1;

		width: 100%;
		height: 0px;
		margin-top: 37.2em;
		border-bottom: 2px solid #131f58;

		box-shadow: 0px 0px 400px 100px #101d53;
	}

	.section.f {
		margin: 6em 0em;
		position: relative;
	}

	.section.f .banner {
		align-self: stretch;
		flex-basis: 25em;

		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;

		background-image: url("/images/banner.png");
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 60em; 
	}

	.section.f h2 {
		max-width: 12em;
		margin: 0em;

		font-size: 2.5em;
		text-align: center;
	}

	.section.f .ribbon {
		position: absolute;
		top: 10em;
		z-index: -1;

		height: 5em;
		width: 100%;

		background-color: #0b1335;
	}

	.background {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: flex-start;

		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;

		overflow-x: hidden;
		overflow-y: hidden;
	}

	@media (max-width: 1200px) {
		.section.b .headers {
			flex-flow: column nowrap;
		}

		.section.b .sub-headers {
			margin-left: 0em;
		}

		.section.b h3 {
			max-width: 32em;
		}

		.on-chain-fig {
			margin-top: -5em;
			width: 800px;
		}

		.time-node {
			margin: 0em 1em;
		}
	}

	@media (max-width: 950px) {
		.section.a h1, .section.a h3 {
			text-align: center;
		}

		.any-chain-fig {
			width: 80%;
		}

		.section.b h2 {
			margin-left: 0.8em;

			font-size: 1.8em;
		}

		.section.b h3 {
			margin-left: 1em;
		}

		.section.b h2, .section.b h3 {
			margin-right: 1em;
		}

		.on-chain-fig {
			margin-top: 0em;
			width: 80%;
		}

		.section.c h2 {
			margin-left: 0.8em;

			font-size: 1.8em;
		}

		.section.c h3 {
			margin-left: 1em;
		}

		.blazing-fast-fig {
			width: 120px;
			margin-right: 1em;
		}

		.price-widgets {
			justify-content: flex-start;

			max-width: 100%;
		}

		.price-widgets {
			overflow-x: scroll;
			overflow-y: hidden;

			-ms-overflow-style: none;
			scrollbar-width: none;
		}

		.price-widgets::-webkit-scrollbar {
			display: none;
		}

		.section.d {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			justify-content: flex-start;
		}

		.section.d .box {
			align-self: center !important;

			margin: 0em !important;
		}

		.section.d .green.box {
			margin-top: 2em !important;
		}

		.time-nodes-wrapper {
			overflow-x: scroll;
			overflow-y: hidden;

			-ms-overflow-style: none;
			scrollbar-width: none;
		}

		.time-nodes-wrapper::-webkit-scrollbar {
			display: none;
		}

		.time-nodes {
			min-width: 950px;
		}

		.time-nodes .time-node:nth-child(2) .item:last-child {
			display: none;
		} 

		.time-nodes .item {
			font-size: 0.95em;
		}
	
		.section.f .banner {
			align-self: center;

			width: 100%;
		}
	}
</style>