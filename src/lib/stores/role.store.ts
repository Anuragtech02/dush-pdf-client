import { writable } from 'svelte/store';

export interface IRole {
	id: string;
	name: string;
	permissions: string[];
	createdAt: string;
	publishedAt: string;
	updatedAt: string;
}
const roleStore = writable<IRole[]>([]);

export default roleStore;
