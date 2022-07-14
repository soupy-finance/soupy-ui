import { writable, Writable } from "svelte/store";
import { DirectSecp256k1HdWallet, AccountData } from "@cosmjs/proto-signing";
import * as noodleClient from "@soupy-finance/noodle-ts-client";

interface Account {
	address?: string;
	pubkey?: Uint8Array; 
	wallet?: DirectSecp256k1HdWallet;
	pw?: string;
}

const { subscribe, set, update }: Writable<Account> = writable({});

async function generate(pw: string="") {
	let account: Account;
	update(_account => account = _account);

	account.wallet = await DirectSecp256k1HdWallet.generate(24, { prefix: import.meta.env.VITE_NOODLE_PREFIX });
	account.pw = pw;

	let accountDatas: readonly AccountData[] = await account.wallet.getAccounts();
	account.address = accountDatas[0].address;
	account.pubkey = accountDatas[0].pubkey;

	set(account);
	storeSerialized();
}

async function loadFromMnemonic(mnemonic: string, pw: string="") {
	let account: Account;
	update(_account => account = _account);

	account.wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: import.meta.env.VITE_NOODLE_PREFIX });
	account.pw = pw;

	let accountDatas: readonly AccountData[] = await account.wallet.getAccounts();
	account.address = accountDatas[0].address;
	account.pubkey = accountDatas[0].pubkey;

	set(account);
	storeSerialized();
}

async function loadSerialized(pw: string="") {
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

async function storeSerialized() {
	let account: Account;
	update(_account => account = _account);
	
	let walletStr = await account.wallet.serialize(account.pw);
	window.localStorage.setItem("account", walletStr);
}

export const account = {
	subscribe,
	generate,
	loadFromMnemonic,
	loadSerialized,
	storeSerialized,
};

export function shortenAddr(addr: string) {
	return addr.slice(0, 9) + "..." + addr.slice(addr.length - 4);
}
