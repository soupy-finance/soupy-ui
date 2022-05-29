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
	decimals: number;
}

export interface BookLevel {
	price: number;
	quantity: number;
	total: number;
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