export const PRICE_STR_PRECISION = 5;
export const QTY_STR_PRECISION_INT = 5;
export const QTY_STR_PRECISION_DEC = 5;
export const PERCENTAGE_STR_PRECISION = 3;
export const ASSET_INT_DECIMALS = 18;

export function toFixed(num: number, decimals: number, method: string = "round"): string {
	switch (method) {
		case "round":
			return num.toFixed(decimals);
		case "floor":
			num = Math.floor(num * decimals) / decimals;
			return num.toFixed(decimals );
		case "ceil":
			num = Math.ceil(num * decimals) / decimals;
			return num.toFixed(decimals);
	}
}

export function toPriceStr(num: number=0): string {
	return num.toPrecision(PRICE_STR_PRECISION);	
}

export function toQtyStr(num: number=0): string {
	if (num > 10**(QTY_STR_PRECISION_INT))
		return num.toPrecision(QTY_STR_PRECISION_INT);	
	else 
		return parseFloat(num.toPrecision(QTY_STR_PRECISION_DEC)).toString();
}

export function toPercentageStr(num: number=0): string {
	return num.toPrecision(PERCENTAGE_STR_PRECISION);
}

export function parseAssetInt(num: number=0): number {
	return num / 10**ASSET_INT_DECIMALS;
}

export function parseCoinStr(coin: string): [number, string] {
	let quantity = parseAssetInt(parseInt(coin.replace(/[^0-9.]/g, "")));
	let denom = coin.replace(/[0-9.]/g, "");
	return [quantity, denom];
}