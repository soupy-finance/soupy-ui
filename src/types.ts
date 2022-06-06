import type { OfflineSigner } from "@cosmjs/proto-signing";
import type { PublicKey } from "@solana/web3.js";
import type { Adapter, WalletReadyState } from "@solana/wallet-adapter-base";

export interface Asset {
	name: string;
	symbol: string;
	price: number;
	balance: number;
	cmcId: number;
	color: string;
}

export interface Book {
	bids: BookLevel[]; 
	asks: BookLevel[]; 
	max: number;
}

export interface BookLevel {
	price: number;
	quantity: number;
	total: number;
}

export type RecentTrades = RecentTrade[]; 

export interface RecentTrade {
	price: number;
	size: number;
	time: number;
	sell: boolean;
}

export interface NoodleClientStore {
	subscribe: Function,
	setNodeAddr: Function,
	setWallet: Function,
}

export interface NoodleClient {
	restAddr: string,
	rpcAddr: string,
	wallet: OfflineSigner,
	modules: {
		bridge: ModuleClient,
		dex: ModuleClient,
		oracle: ModuleClient,
	},
}

export interface ModuleClient {
	tx: any,
	query: any,
	txGen: Function,
	queryGen: Function,
}

export interface Web3 {
	evm: EvmWeb3;
	solana: SolanaWeb3;
	terra: TerraWeb3;
}

export interface EvmWeb3 {

}

export interface SolanaWeb3 {

}

export interface TerraWeb3 {

}

export interface WalletStore {
	all: Adapter[];
	active: Adapter | null;
	publicKey: PublicKey | null;	
	connected: boolean;	
	connecting: boolean;
	disconnecting: boolean;
}