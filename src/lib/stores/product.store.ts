import { writable } from 'svelte/store';

export interface IProduct {
	id: string;
	name: string;
	pdf: {
		[key: string]: any;
	};
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

const productStore = writable<IProduct[]>([]);

export default productStore;
