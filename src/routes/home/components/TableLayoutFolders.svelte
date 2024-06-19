<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { IFolder } from '$lib/types/commons';
	import * as Popover from '$lib/components/ui/popover';
	import Button from '$lib/components/ui/button/button.svelte';
	import { LoaderCircle, TrashIcon } from 'lucide-svelte';
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
</script>

<div class="relative max-h-[600px] overflow-y-auto rounded-md border border-gray-200">
	<Table.Root>
		<Table.Header>
			<Table.Row class="sticky top-0">
				<Table.Head class="w-[100px]">ID</Table.Head>
				<Table.Head class="">Name</Table.Head>
				<Table.Head class="">Created</Table.Head>
				<Table.Head class="">Updated</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each folders as folder}
				<Table.Row class="cursor-pointer">
					<!-- <Table.Cell class="font-medium">INV001</Table.Cell>
                <Table.Cell>Paid</Table.Cell>
                <Table.Cell>Credit Card</Table.Cell>
                <Table.Cell class="text-right">$250.00</Table.Cell> -->
					<Table.Cell>{folder.id}</Table.Cell>
					<Table.Cell>{folder.name}</Table.Cell>
					<Table.Cell>{new Date(folder.createdAt).toLocaleDateString()}</Table.Cell>
					<Table.Cell>{new Date(folder.updatedAt).toLocaleDateString()}</Table.Cell>
					<Table.Cell class="flex justify-end text-right">
						<Button
							on:click={() => (idToDelete = folder.id)}
							variant="secondary"
							disabled={loading}
						>
							{#if loading}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							<TrashIcon />
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<AlertDialog.Root open={Boolean(idToDelete)}>
	<AlertDialog.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Show Dialog</Button>
	</AlertDialog.Trigger>
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
