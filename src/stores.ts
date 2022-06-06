import { writable, Writable } from "svelte/store";
import type { Asset, NoodleClient, NoodleClientStore, Web3 } from "./types";
import type { OfflineSigner } from "@cosmjs/proto-signing";

import { txClient as bridgeTxClient, queryClient as bridgeQueryClient } from "noodle-ts-client/dist/modules/soupy-finance/noodle/soupyfinance.noodle.bridge/module";
import { txClient as dexTxClient, queryClient as dexQueryClient } from "noodle-ts-client/dist/modules/soupy-finance/noodle/soupyfinance.noodle.dex/module";
import { txClient as oracleTxClient, queryClient as oracleQueryClient } from "noodle-ts-client/dist/modules/soupy-finance/noodle/soupyfinance.noodle.oracle/module";

export const assets: Writable<{[key: string]: Asset}> = writable({
	"usdc": {
		name: "USD Coin",
		symbol: "USDC",
		price: 1,
		balance: 0,
		cmcId: 3408,
		color: "#2775ca"
	},
	"usdt": {
		name: "Tether",
		symbol: "USDT",
		price: 1,
		balance: 0,
		cmcId: 825,
		color: "#26a17b"
	},
	"wbtc": {
		name: "Wrapped Bitcoin",
		symbol: "WBTC",
		price: 41000,
		balance: 0,
		cmcId: 1,
		color: "#f7931a"
	},
	"eth": {
		name: "Ether",
		symbol: "ETH",
		price: 4100,
		balance: 0,
		cmcId: 1027,
		color: "#797f9f"
	},
	"atom": {
		name: "Cosmos Hub",
		symbol: "ATOM",
		price: 25,
		balance: 0,
		cmcId: 3794,
		color: "#2e3148"
	},
	"sol": {
		name: "Solana",
		symbol: "SOL",
		price: 100,
		balance: 0,
		cmcId: 5426,
		color: "#667ee0"
	},
	"avax": {
		name: "Avalanche",
		symbol: "AVAX",
		price: 80,
		balance: 0,
		cmcId: 5805,
		color: "#e84142"
	},
	"luna": {
		name: "Terra",
		symbol: "LUNA",
		price: 90,
		balance: 0,
		cmcId: 4172,
		color: "#172852"
	},
	"bnb": {
		name: "BNB",
		symbol: "BNB",
		price: 400,
		balance: 0,
		cmcId: 1839,
		color: "#bd9108"
	},
	"ftm": {
		name: "Fantom",
		symbol: "FTM",
		price: 2,
		balance: 0,
		cmcId: 3513,
		color: "#1969ff"
	},
	"matic": {
		name: "Polygon",
		symbol: "MATIC",
		price: 2,
		balance: 0,
		cmcId: 3890,
		color: "#8247e5"
	},
});

export const noodleClient = (() => {
	const { subscribe, set, update }: Writable<NoodleClient> = writable({
		restAddr: null,
		rpcAddr: null,
		wallet: null,
		modules: {
			bridge: {
				tx: null,
				query: null,
				txGen: bridgeTxClient,
				queryGen: bridgeQueryClient,
			},
			dex: {
				tx: null,
				query: null,
				txGen: dexTxClient,
				queryGen: dexQueryClient,
			},
			oracle: {
				tx: null,
				query: null,
				txGen: oracleTxClient,
				queryGen: oracleQueryClient,
			},
		},
	});

	return {
		subscribe,
		setRestAddr: async (restAddr: string) => {
			let client: NoodleClient
			update((_client: NoodleClient) => client = _client);

			client.restAddr = restAddr;

			for (let moduleName in client.modules) {
				let module = client.modules[moduleName];
				module.query = await module.queryGen({ addr: restAddr });
			}

			set(client);
		},
		setRpcAddr: async (rpcAddr: string) => {
			let client: NoodleClient
			update((_client: NoodleClient) => client = _client);

			client.rpcAddr = rpcAddr;

			if (!client.wallet) {
				for (let moduleName in client.modules) {
					let module = client.modules[moduleName];
					module.query = await module.queryGen({ addr: rpcAddr });

					if (client.wallet)
						module.tx = await module.txGen(client.wallet, { addr: rpcAddr });
				}
			}

			set(client);
		},
		setWallet: async (wallet: OfflineSigner) => {
			let client: NoodleClient
			update((_client: NoodleClient) => client = _client);

			if (!client.rpcAddr)
				return;

			client.wallet = wallet;

			for (let moduleName in client.modules) {
				let module = client.modules[moduleName];
				module.tx = await module.txGen(wallet, { addr: client.rpcAddr });
			}

			set(client);
		},
	};
})(); 

export const web3: Writable<Web3> = writable({
	evm : {},
	solana: {},
	terra: {}
});