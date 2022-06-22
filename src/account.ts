import { writable, Writable } from "svelte/store";
import { DirectSecp256k1HdWallet, AccountData } from "@cosmjs/proto-signing";
import * as noodleClient from "noodle-ts-client/dist";

interface Account {
	address?: string;
	pubkey?: Uint8Array; 
	wallet?: DirectSecp256k1HdWallet;
	pw?: string;
}

const { subscribe, set, update }: Writable<Account> = writable({});

export async function loadFromMnemonic(mnemonic: string, pw: string) {
	let account: Account;
	update(_account => account = _account);

	account.wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, import.meta.env.VITE_NOODLE_PREFIX);
	account.pw = pw;

	let accountDatas: readonly AccountData[] = await account.wallet.getAccounts();
	account.address = accountDatas[0].address;
	account.pubkey = accountDatas[0].pubkey;

	set(account);
	storeSerialized();
}

export async function loadSerialized(pw: string) {
	let account: Account;
	update(_account => account = _account);
	
	let walletStr = window.localStorage.getItem("account");

	if (!walletStr)
		return;

	account.wallet = await DirectSecp256k1HdWallet.deserialize(walletStr, pw);
	account.pw = pw;

	let accountDatas: readonly AccountData[] = await account.wallet.getAccounts();
	account.address = accountDatas[0].address;
	account.pubkey = accountDatas[0].pubkey;
	await noodleClient.tx.setWallet(account.wallet);

	set(account);
}

export async function storeSerialized() {
	let account: Account;
	update(_account => account = _account);
	
	let walletStr = await account.wallet.serialize(account.pw);
	window.localStorage.setItem("account", walletStr);
}


export const account = {
	subscribe,
	loadFromMnemonic,
	loadSerialized,
	storeSerialized,
};