<script lang="ts">
	import Folder from '$lib/components/ui/folder/folder.svelte';
	import type { IFolder } from '$lib/types/commons';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import { goto } from '$app/navigation';
	import { deleteDirectoryInternal } from '$lib/api/services-internal';
	import { toastStore } from '$lib/components/ui/toast/toastMessage.store';
	import directoryStore from '$lib/stores/directory.store';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	export let folders: Array<IFolder> = [];

	let loading: boolean = false;

	let idToDelete: null | string = null;

	async function handleDelete(id: string) {
		try {
			loading = true;
			const res = await deleteDirectoryInternal(parseInt(id));

			if (res.status !== 200) {
				console.log('Failed to delete folder');
				toastStore.addToast('Failed to delete folder', { type: 'error' });

				return;
			}

			toastStore.addToast('Folder deleted successfully', { type: 'success' });

			// Remove the folder from the list
			$directoryStore.folders = $directoryStore.folders.filter((f: any) => f.id !== id);
		} catch (e) {
			console.log('Failed to delete folder');
			toastStore.addToast('Failed to delete folder', { type: 'error' });
		} finally {
			idToDelete = null;
			loading = false;
		}
	}

	const openURL = (url: string) => {
		goto(url);
	};
</script>

<div
	class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
	{#each folders as folder}
		<a href={`/folders/${folder.id}`} class="hover:[&>div]:bg-slate-200">
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<Folder name={folder.name} id={folder.id} />
				</ContextMenu.Trigger>
				<ContextMenu.Content class="w-64">
					<ContextMenu.Item inset on:click={() => (idToDelete = folder.id)}>Delete</ContextMenu.Item
					>
					<ContextMenu.Item inset on:click={() => openURL(`/folders/${folder.id}`)}
						>Open</ContextMenu.Item
					>
				</ContextMenu.Content>
			</ContextMenu.Root>
		</a>
	{/each}
</div>

<AlertDialog.Root open={Boolean(idToDelete)}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure to delete folder?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your folder and remove your data
				from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={() => (idToDelete = null)}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={() => idToDelete && handleDelete(idToDelete)}
				>Continue</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
