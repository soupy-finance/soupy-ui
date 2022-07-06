import { writable, Writable } from "svelte/store";

export enum NotifType {
	Neutral = "neutral",
	Success = "success",
	Error = "error",
}

export interface Notification {
	title?: string;
	content?: string;
	type?: NotifType; 
	duration?: number;
}

export type Notifications = Notification[];

const DEFAULT_DURATION: number = 5e3;
const { subscribe, set, update }: Writable<Notification> = writable({}, () => () => clearTimeout(timeout));
var timeout: NodeJS.Timeout;

function setNotification(title: string, content: string, type: NotifType=NotifType.Error, duration: number=DEFAULT_DURATION) {
	set({ title, content, type });
	timeout = setTimeout(() => clearNotification(), duration);
}

function clearNotification() {
	set({});
	clearTimeout(timeout);
}

export const notification = {
	subscribe,
	setNotification,
};