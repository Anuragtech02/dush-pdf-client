// name: `Test ${i + 1}`,
// 		username: `test${i + 1}`,
// 		expiry: '2022-12-3

import { writable } from 'svelte/store';

export interface ICustomer {
	name: string;
	username: string;
	expiry: string;
	createdAt: string;
}

const customerStore = writable<ICustomer[]>([]);

export default customerStore;
