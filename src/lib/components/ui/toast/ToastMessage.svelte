<script lang="ts">
	import Button from '../button/button.svelte';

	import X from 'lucide-svelte/icons/x';
	import { fly } from 'svelte/transition';
	import { toastStore, type IToast } from './toastMessage.store';

	export let toast: IToast;

	function handleRemove(id: string | number) {
		toastStore.removeToast(id);
	}

	const VARIAINT_CLASSES: any = {
		success: 'border-green-500 bg-green-600 bg-opacity-20',
		error: 'border-red-500 bg-red-500 bg-opacity-20',
		warning: 'border-yellow-400 bg-yellow-400 bg-opacity-20'
	};
</script>

<div
	class="custom-toast bg-base-100 fixed left-1/2 top-4 z-[99999] -translate-x-1/2"
	in:fly={{
		y: -20,
		duration: 200
	}}
	out:fly={{
		y: -20,
		duration: 200
	}}
>
	<div
		class="flex min-w-[300px] max-w-full items-center justify-between border px-4 py-1 pr-1 sm:max-w-[400px] {VARIAINT_CLASSES[
			toast.type || 'success'
		]}"
	>
		<p class="text-secondary-content relative z-[1] flex-1 opacity-80">
			{toast.message}
		</p>

		<div class="relative z-[1]">
			<Button id="close-toast" on:click={() => handleRemove(toast.id)} variant="ghost">
				<X class="h-4 w-4" />
			</Button>
		</div>
	</div>
</div>
