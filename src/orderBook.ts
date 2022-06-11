export interface Books {
	bids: BookLevel[]; 
	asks: BookLevel[]; 
	max: number;
}

export interface BookLevel {
	price: number;
	quantity: number;
	total: number;
}

export function parseBooksFromChainData(data: any): Books {
	let bids: any = JSON.parse(data.bids || "[]");
	let asks: any = JSON.parse(data.asks || "[]");
	let bidsTotal: number = 0;
	let asksTotal: number = 0;
	let books: Books = {
		bids: [],
		asks: [],
		max: 0,
	};

	for (let level of bids) {
		let quantity: number = 0;

		for (let order of level.orders)
			quantity += parseFloat(order.quantity);

		bidsTotal += quantity;
		books.bids.push({
			price: level.price,
			quantity: quantity,
			total: bidsTotal,
		});
	}

	for (let level of asks) {
		let quantity: number = 0;

		for (let order of level.orders)
			quantity += parseFloat(order.quantity);

		asksTotal += quantity;
		books.asks.push({
			price: level.price,
			quantity: quantity,
			total: asksTotal,
		});
	}

	let maxBidsTotal, maxAsksTotal: number = 0;

	if (books.bids.length > 0)
		maxBidsTotal = books[bids.length - 1].total

	if (books.asks.length > 0)
		maxAsksTotal = books[asks.length - 1].total

	books.max = Math.max(maxBidsTotal, maxAsksTotal);
	return books;
}