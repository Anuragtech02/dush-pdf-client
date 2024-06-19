import { writable } from 'svelte/store';

interface IProductStore {
	files: any;
}

const productStore = writable<IProductStore>({
	files: null
});

export default productStore;
