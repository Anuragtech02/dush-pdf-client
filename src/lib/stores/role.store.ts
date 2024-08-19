import { writable } from 'svelte/store';

interface IRole {
	id: string;
	name: string;
	permissions: Array<{ id: number; permission: string }>;
	createdAt: string;
	publishedAt: string;
	updatedAt: string;
}

const roleStore = writable<IRole[]>([]);

export default roleStore;
