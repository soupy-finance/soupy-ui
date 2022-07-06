import { writable, Writable } from "svelte/store";

export interface Asset {
	name: string;
	symbol: string;
	price: number;
	balance: number;
	cmcId: number;
	color: string;
}

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
		cmcId: 20314,
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