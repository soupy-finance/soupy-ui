import { writable, Writable } from "svelte/store";
import type { OfflineSigner } from "@cosmjs/proto-signing";

import { txClient as bridgeTxClient, queryClient as bridgeQueryClient } from "noodle-ts-client/dist/modules/soupy-finance/noodle/soupyfinance.noodle.bridge/module";
import { txClient as dexTxClient, queryClient as dexQueryClient } from "noodle-ts-client/dist/modules/soupy-finance/noodle/soupyfinance.noodle.dex/module";
import { txClient as oracleTxClient, queryClient as oracleQueryClient } from "noodle-ts-client/dist/modules/soupy-finance/noodle/soupyfinance.noodle.oracle/module";

interface NoodleClient {
	restAddr: string,
	rpcAddr: string,
	wallet: OfflineSigner,
	modules: {
		bridge: ModuleClient,
		dex: ModuleClient,
		oracle: ModuleClient,
	},
}

interface ModuleClient {
	tx: any,
	query: any,
	txGen: Function,
	queryGen: Function,
}

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

async function setRestAddr(restAddr: string) {
	if (restAddr.length == 0)
		throw new Error("Invalid rest address");

	let client: NoodleClient
	update((_client: NoodleClient) => client = _client);

	for (let moduleName in client.modules) {
		let module = client.modules[moduleName];
		module.query = await module.queryGen({ addr: restAddr });
	}

	client.restAddr = restAddr;
	set(client);
}

async function setRpcAddr(rpcAddr: string) {
	if (rpcAddr.length == 0)
		throw new Error("Invalid RPC address");

	let client: NoodleClient
	update((_client: NoodleClient) => client = _client);

	if (client.wallet) {
		for (let moduleName in client.modules) {
			let module = client.modules[moduleName];
			module.tx = await module.txGen(client.wallet, { addr: rpcAddr });
		}
	}

	client.rpcAddr = rpcAddr;
	set(client);
}

async function setWallet(wallet: OfflineSigner) {
	let client: NoodleClient
	update((_client: NoodleClient) => client = _client);

	client.wallet = wallet;

	if (client.rpcAddr) {
		for (let moduleName in client.modules) {
			let module = client.modules[moduleName];
			module.tx = await module.txGen(wallet, { addr: client.rpcAddr });
		}
	}

	set(client);
}

export const noodleClient = {
	subscribe,
	setRestAddr,
	setRpcAddr,
	setWallet,
};