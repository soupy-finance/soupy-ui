export interface Books {
	bids: BookLevel[]; 
	asks: BookLevel[]; 
	max: number;
	orders: {[orderId: string]: BookOrder};
}

export interface BookLevel {
	price: number;
	quantity: number;
	total: number;
}

export interface BookOrder {
	price: number;
	quantity: number;
	side: boolean;
	level: BookLevel;
}

export interface BookUpdate {
	type: string;
	blockHeight: number;
	id: string;
	quantity?: number;
	price?: number;
	side?: boolean;
}

export function parseBooksFromChainData(data: { bids: string, asks: string }): Books {
	let bids: any = JSON.parse(data.bids || "[]");
	let asks: any = JSON.parse(data.asks || "[]");
	let bidsTotal: number = 0;
	let asksTotal: number = 0;
	let books: Books = {
		bids: [],
		asks: [],
		max: 0,
		orders: {},
	};

	for (let level of bids) {
		let price: number = parseFloat(level.Price);
		let quantity: number = 0;
		let uiLevel: BookLevel = {
			price,
			quantity: 0,
			total: 0,
		};

		for (let order of level.Orders) {
			let orderQuantity = parseFloat(order.Quantity);
			quantity += orderQuantity;
			books.orders[order.id] = {
				price,
				quantity: orderQuantity,
				level: uiLevel,
				side: false,
			};
		}

		bidsTotal += quantity;
		uiLevel.quantity = quantity;
		uiLevel.total = bidsTotal;
		books.bids.push(uiLevel);
	}

	for (let level of asks) {
		let price: number = parseFloat(level.Price);
		let quantity: number = 0;
		let uiLevel: BookLevel = {
			price,
			quantity: 0,
			total: 0,
		};

		for (let order of level.Orders) {
			let orderQuantity = parseFloat(order.Quantity);
			quantity += orderQuantity;
			books.orders[order.id] = {
				price,
				quantity: orderQuantity,
				level: uiLevel,
				side: true,
			};
		}

		asksTotal += quantity;
		uiLevel.quantity = quantity;
		uiLevel.total = asksTotal;
		books.asks.push(uiLevel);
	}

	let maxBidsTotal, maxAsksTotal: number = 0;

	if (books.bids.length > 0)
		maxBidsTotal = books.bids[bids.length - 1].total

	if (books.asks.length > 0)
		maxAsksTotal = books.asks[asks.length - 1].total

	books.max = Math.max(maxBidsTotal, maxAsksTotal);
	return books;
}

export function processBookUpdateQueue(books: Books, queue: BookUpdate[], blockHeight: number): Books {
	for (let update of queue) {
		if (update.blockHeight <= blockHeight)
			continue;	

		switch (update.type) {
			case "add":
				books = addBookOrder(books, update.id, update.price, update.quantity, update.side);
			case "update":
				books = updateBookOrder(books, update.id, update.quantity);
			case "remove":
				books = removeBookOrder(books, update.id);
		}
	}	

	return books;
}

export function addBookOrder(books: Books, id: string, price: number, quantity: number, side: boolean): Books {
	let levels = side == false ? books.bids : books.asks; 
	let [i, found] = findPriceLevel(books, price, side);
	let level: BookLevel;

	if (found) {
		level = levels[i];
		level.quantity += quantity;
	}
	else {
		level = {
			price,
			quantity,
			total: quantity
		};

		if (levels.length == 0 || price < levels[i].price == side)
			levels.splice(i, 0, level);
		else
			levels.splice(i + 1, 0, level);
	}

	books.orders[id] = {
		price,
		quantity,
		level,
		side,
	}; 

	books = updateLevelTotals(books, side);
	return books;
}

export function updateBookOrder(books: Books, id: string, quantity: number): Books {
	let order: BookOrder = books.orders[id];
	order.level.quantity += quantity - order.quantity;
	order.quantity = quantity;
	books = updateLevelTotals(books, order.side);
	return books;
}

export function removeBookOrder(books: Books, id: string): Books {
	let order: BookOrder = books.orders[id];
	let levels = order.side == false ? books.bids : books.asks; 
	order.level.quantity -= order.quantity; 

	if (order.level.quantity <= 0)
		levels.splice(levels.indexOf(order.level), 1);	

	books = updateLevelTotals(books, order.side);
	delete books.orders[id];
	return books;
}

export function updateLevelTotals(books: Books, side: boolean): Books {
	let levels = side == false ? books.bids : books.asks; 
	let total = 0;

	for (let level of levels) {
		total += level.quantity;
		level.total = total; 
	}

	return books;
}

export function findPriceLevel(books: Books, price: number, side: boolean): [number, boolean] {
	let levels = side == false ? books.bids : books.asks; 

	if (levels.length == 0)
		return [0, false];

	let i = Math.floor(levels.length / 2);
	let searchSize = levels.length;
	let found = false;

	do {
		let level = levels[i];
		searchSize = Math.floor(searchSize / 2);
		
		if (level.price == price)
			found = true;
		else if (level.price > price)
			i += searchSize; 
		else if (level.price < price)
			i -= searchSize;
	} while(searchSize > 0 && !found);

	return [i, found];
}