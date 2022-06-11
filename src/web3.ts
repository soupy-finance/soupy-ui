import { writable, Writable } from "svelte/store";

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

export const web3: Writable<Web3> = writable({
	evm : {},
	solana: {},
	terra: {}
});