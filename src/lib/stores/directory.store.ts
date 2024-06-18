import { writable } from 'svelte/store';

interface IDirectoryStore {
	folders: any;
	
}

const directoryStore = writable<IDirectoryStore>({
	folders: null
});

export default directoryStore;
