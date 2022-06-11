import { writable, Writable } from "svelte/store";
import { DirectSecp256k1HdWallet, AccountData } from "@cosmjs/proto-signing";

interface Account {
	address?: string;
	pubkey?: Uint8Array; 
	wallet?: DirectSecp256k1HdWallet;
}

const { subscribe, set, update }: Writable<Account> = writable({});

export async function loadFromMnemonic(mnemonic: string) {
	let account: Account;
	update(_account => account = _account);

	account.wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, import.meta.env.VITE_NOODLE_PREFIX);
	let accountDatas: readonly AccountData[] = await account.wallet.getAccounts();
	account.address = accountDatas[0].address;
	account.pubkey = accountDatas[0].pubkey;
	set(account);
}

export function executeTrade(market: string, price: number, quantity: number, type: string="limit", flags: string="") {

}

export const noodleClient = {
	subscribe,
	loadFromMnemonic,
	executeTrade,
};