import { writable, Writable } from "svelte/store";

export interface ChainInfo {
	chainId: string;
	blockHeight: number;
}

export const chainInfo: Writable<ChainInfo> = writable({
	chainId: "",
	blockHeight: 0,
});