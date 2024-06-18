import { writable } from 'svelte/store';
type TType = 'success' | 'error' | 'warning' | 'info';
export interface IToast {
	id: string | number;
	message: string;
	type?: TType;
}

const createToastStore = () => {
	const { subscribe, update, set } = writable<IToast[]>([]);

	const addToast = (
		message: string,
		config: { type?: TType; id?: string | number; duration?: number }
	) => {
		const { id = Date.now(), type = 'success', duration = 5000 } = config;
		// TOOD: Later use update() instead of set()
		// so as to create a stack of toast messages
		set([{ id, message, type }]);

		setTimeout(() => {
			removeToast(id);
		}, duration);
		return id;
	};

	const removeToast = (id: string | number) => {
		update((toasts) => toasts.filter((toast) => toast.id !== id));
	};

	return {
		subscribe,
		addToast,
		removeToast
	};
};

export const toastStore = createToastStore();
