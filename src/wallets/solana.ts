import { writable, get } from "svelte/store";
import { WalletError, WalletName, WalletNotReadyError } from "@solana/wallet-adapter-base";
import {
	LedgerWalletAdapter,
	PhantomWalletAdapter,
	SlopeWalletAdapter,
	SolflareWalletAdapter,
	SolletExtensionWalletAdapter,
	SolletWalletAdapter,
	TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import type { PublicKey, TransactionSignature } from "@solana/web3.js";
import type { Adapter, WalletReadyState } from "@solana/wallet-adapter-base";

export interface WalletStore {
	all: Adapter[];
	active: Adapter | null;
	publicKey: PublicKey | null;	
	connected: boolean;	
	connecting: boolean;
	disconnecting: boolean;
}

const { subscribe, update } = writable<WalletStore>({
	all: [], 
	active: null,
	publicKey: null,
	connected: false,
	connecting: false,
	disconnecting: false
});

const walletStore = {
	subscribe,
	select,
	connect,
	disconnect,
	sendTransaction,
	reset,
	updateWalletName,
	setConnected,
	setConnecting,
	setDisconnecting
};

function addEventListeners(): boolean {
	const walletData = get(walletStore);
	
	if (!walletData.active)
		return false;

	walletData.active.on("connect", onConnect);
	walletData.active.on("disconnect", onDisconnect);
	walletData.active.on("error", onError);
}

async function select(name: WalletName) {

}

async function connect(): Promise<boolean> {
	let walletData = get(walletStore);

	if (!walletData.active || walletData.connected || walletData.connecting || walletData.disconnecting)
		return false;

	if (!walletData.active.readyState) {
		walletStore.reset();

		throw new WalletNotReadyError();
	}

	try {
		walletStore.setConnecting(true);
		await walletData.active.connect();
	}
	catch (error) {
		walletStore.reset();
		throw error;
	}
	finally {
		walletStore.setConnecting(false);
	}
}

async function disconnect(): Promise<boolean> {
	let walletData = get(walletStore);

	if (walletData.disconnecting)
		return false;

	if (!walletData.active)
		return walletStore.reset();	

	try {
		walletStore.setDisconnecting(true);
		await walletData.active.disconnect();
	}
	finally {
		walletStore.reset();
	}
}

async function sendTransaction(): Promise<TransactionSignature> {

}

async function reset(): Promise<boolean> {
	update((_walletStore: WalletStore) => ({
		..._walletStore,
		active: null,
		publicKey: null,
		connected: false,
		connecting: false,
		disconnecting: false
	}));
	return true;
}

async function updateWalletName(name: WalletName | null) {
	update((_walletStore: WalletStore) => ({
		..._walletStore,
		name
	}));
}

async function setConnected(connected: boolean) {
	update((_walletStore: WalletStore) => ({
		..._walletStore,
		connected	
	}));
}

async function setConnecting(connecting: boolean) {
	update((_walletStore: WalletStore) => ({
		..._walletStore,
		connecting	
	}));
}

async function setDisconnecting(disconnecting: boolean) {
	update((_walletStore: WalletStore) => ({
		..._walletStore,
		disconnecting	
	}));
}

function onConnect() {
	const walletData = get(walletStore);

	if (!walletData.active)
		return;

	update((_walletStore) => ({
		..._walletStore,
		publicKey: walletData.active.publicKey,
		connected: walletData.active.connected
	}));
}

function onDisconnect() {
	walletStore.reset();
}

function onError(error: WalletError) {
	console.error(error);
}

export default walletStore; 