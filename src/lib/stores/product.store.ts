import { writable } from 'svelte/store';

interface IProductStore {
	id: string;
	name: string;
	fileUrl: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

const productStore = writable<IProductStore[]>([]);

export default productStore;
