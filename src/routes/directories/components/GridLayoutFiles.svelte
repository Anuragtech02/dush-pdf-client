<script lang="ts">
	import File from '$lib/components/ui/file/file.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import { goto } from '$app/navigation';
	import { updateDirectoryInternal } from '$lib/api/services-internal';
	import { page } from '$app/stores';
	import productStore from '$lib/stores/product.store';
	import { toastStore } from '$lib/components/ui/toast/toastMessage.store';

	export let folders: Array<any> = [];

	const directoryId = $page.params.id;

	const hostedUrl = import.meta.env.VITE_HOSTED_URL;

	const truncateName = (name: string) => {
		return name.length > 20
			? `${name.substring(0, 8)}...${name.substring(name.length - 6, name.length)}`
			: name;
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	const openURL = (url: string) => {
		goto(url);
	};

	const handleDelete = (id: string) => {
		console.log('Delete', id);
	};

	const handleRemoveFromDirectory = async (id: string) => {
		const updatedFolders = folders.filter((folder) => folder.id !== id);

		console.log('updatedFolders', updatedFolders);

		const updateDirecRes = await updateDirectoryInternal(parseInt(directoryId), {
			data: {
				products: updatedFolders.map((folder) => folder.id)
			}
		});

		if (updateDirecRes.status === 200) {
			folders = updatedFolders;
			toastStore.addToast('Successfully removed from directory', {
				type: 'success'
			});
		} else {
			toastStore.addToast('Failed to remove from directory', {
				type: 'error'
			});
		}
	};
</script>

<div
	class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
	{#each folders as folder}
		<a href={'/view-pdf/' + folder.id} rel="noreferrer" class="hover:[&>div]:bg-slate-200">
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<File name={truncateName(folder.name) + '.pdf'} id={folder.id} />
				</ContextMenu.Trigger>
				<ContextMenu.Content class="w-64">
					<ContextMenu.Item
						inset
						on:click={() => copyToClipboard(`${hostedUrl}/view-pdf/${folder.id}`)}
						>Copy Link</ContextMenu.Item
					>

					<ContextMenu.Item inset on:click={() => openURL(`{hostedUrl}/view-pdf/${folder.id}`)}
						>Open</ContextMenu.Item
					>
					<ContextMenu.Item inset on:click={() => handleDelete(folder.id)}>Delete</ContextMenu.Item>
					<ContextMenu.Item inset on:click={() => handleRemoveFromDirectory(folder.id)}
						>Remove from directory</ContextMenu.Item
					>
				</ContextMenu.Content>
			</ContextMenu.Root>
		</a>
	{/each}
</div>
