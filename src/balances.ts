import { derived, Readable } from "svelte/store";
import * as noodleClient from "@soupy-finance/noodle-ts-client";
import { account } from "./account";
import { parseAssetInt, parseCoinStr } from "./number";

var initialBalancesLoaded: boolean = false;
var receivedHandlerId: number;
var spentHandlerId: number;
var balancesObj: {[key: string]: number} = {};

export const balances: Readable<{[key: string]: number}> = derived(account, ($account, set) => {
	if (!$account.address) {
		if (receivedHandlerId)
			noodleClient.events.removeEventsListener(receivedHandlerId);

		if (spentHandlerId)
			noodleClient.events.removeEventsListener(spentHandlerId);

		balancesObj = {};
		set(balancesObj);
		return;
	}

	if (!initialBalancesLoaded) {
		(async () => {
			let res = await noodleClient.query.getAllBalances($account.address);

			for (let balance of res.data.balances)
				balancesObj[balance.denom] = parseAssetInt(balance.amount);

			set(balancesObj);
		})();
	}

	if (!receivedHandlerId) {
		receivedHandlerId = noodleClient.events.addEventsListener(
			`coin_received.receiver='${$account.address}'`,
			(events, data) => {
				for (let event of events.coin_received) {
					if (event.receiver != $account.address)
						continue;

					let [quantity, denom] = parseCoinStr(event.amount);
					balancesObj[denom] = (balancesObj[denom] || 0) + quantity;
				}

				set(balancesObj);
			}
		);
	}

	if (!spentHandlerId) {
		spentHandlerId = noodleClient.events.addEventsListener(
			`coin_spent.spender='${$account.address}'`,
			(events, data) => {
				for (let event of events.coin_spent) {
					if (event.spender != $account.address)
						continue;

					let [quantity, denom] = parseCoinStr(event.amount);
					balancesObj[denom] = (balancesObj[denom] || 0) - quantity;
				}

				set(balancesObj);
			}
		);
	}

	return () => {
		if (receivedHandlerId)
			noodleClient.events.removeEventsListener(receivedHandlerId);

		if (spentHandlerId)
			noodleClient.events.removeEventsListener(spentHandlerId);
	}
}, balancesObj);