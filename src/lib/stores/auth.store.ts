import { writable } from 'svelte/store';

interface IAuthStore {
	user: any;
	token: any;
}

const authStore = writable<IAuthStore>({
	user: null,
	token: null
});

export default authStore;
