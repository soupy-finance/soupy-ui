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

const DEFAULT_DURATION: number = 3e3;
const { subscribe, set, update }: Writable<Notification> = writable({}, () => () => clearTimeout(timeout));
var timeout: NodeJS.Timeout;

function setNotification(title: string, content: string, type: NotifType=NotifType.Neutral, duration: number=DEFAULT_DURATION) {
	clearTimeout(timeout);
	timeout = setTimeout(() => clearNotification(), duration);
	set({ title, content, type });
}

function clearNotification() {
	clearTimeout(timeout);
	set({});
}

export const notification = {
	subscribe,
	setNotification,
};