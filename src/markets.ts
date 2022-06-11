export type Markets = {[key: string]: Market};

export interface Market {
	type?: string;
	price? : number;
	fees?: {
		maker: number;
		taker: number;
	};
	change?: number;
	high?: number;
	low?: number;
	volume?: number;
	trades?: RecentTrades; 
	chart?: ChartData;
}

export type RecentTrades = RecentTrade[]; 

export interface RecentTrade {
	price: number;
	size: number;
	time: number;
	sell: boolean;
}

export interface ChartData {

}

export type OpenOrders = OpenOrder[];

export interface OpenOrder {
	market: string;
	mainAsset: string;
	quoteAsset: string;
	price: number;
	quantity: number;
	filled: number;
	date: number;
}

export type OrderHistory = PastOrder[];

export interface PastOrder {
	market: string;
	mainAsset: string;
	quoteAsset: string;
	price: number;
	quantity: number;
	filled: number;
	result: string;
	date: number;
}

export type Account = string;