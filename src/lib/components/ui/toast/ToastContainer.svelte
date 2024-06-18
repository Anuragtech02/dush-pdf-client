<script lang="ts">
	import ToastMessage from './ToastMessage.svelte';
	import { toastStore, type IToast } from './toastMessage.store';

	let toastMessages: IToast[] = [];

	$: toastStore.subscribe((value) => {
		toastMessages = value;
	});
</script>

{#each toastMessages as toast (toast.id)}
	<ToastMessage {toast} />
{/each}
