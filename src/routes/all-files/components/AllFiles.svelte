<script lang="ts">
	import { deleteProductInternal, getAllFilesInternal } from '$lib/api/services-internal';
	import Input from '$lib/components/ui/input/input.svelte';
	import SearchIcon from 'lucide-svelte/icons/search';
	import { onMount } from 'svelte';
	import * as Table from '$lib/components/ui/table';
	import productStore, { type IProduct } from '$lib/stores/product.store';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { LoaderCircle, TrashIcon } from 'lucide-svelte';
	import { toastStore } from '$lib/components/ui/toast/toastMessage.store';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	let filteredList: any = [];
	let searchValue: string = '';

	let loading: boolean = false;

	let idToDelete: null | string = null;

	async function handleDelete(id: string) {
		try {
			loading = true;
			const currFile = $productStore.find((f: any) => f.id === id);
			if (!currFile) {
				toastStore.addToast('File not found', { type: 'error' });

				return;
			}
			const res = await deleteProductInternal(parseInt(id), currFile.pdf.data.id);

			if (res.status !== 200) {
				console.log('Failed to delete folder');
				toastStore.addToast('Failed to delete folder', { type: 'error' });

				return;
			}

			toastStore.addToast('File deleted successfully', { type: 'success' });

			$productStore = $productStore.filter((f: any) => f.id !== id);

			filteredList = $productStore;
		} catch (e) {
			console.log('Failed to delete folder');
			toastStore.addToast('Failed to delete folder', { type: 'error' });
		} finally {
			idToDelete = null;
			loading = false;
		}
	}

	const getAllFiles = async () => {
		const res = await getAllFilesInternal();

		console.log(res.data);

		const tempFiles: IProduct[] = [];
		if (res) {
			res.data.data.forEach((file: any) => {
				tempFiles.push({
					id: file.id,
					name: file.attributes.name,
					pdf: file.attributes.pdf,
					createdAt: file.attributes.createdAt,
					publishedAt: file.attributes.publishedAt,
					updatedAt: file.attributes.updatedAt
				});
			});
			$productStore = tempFiles;
			filteredList = tempFiles;
		}
	};

	onMount(() => {
		getAllFiles();
	});

	function handleSearch() {
		filteredList = $productStore.filter((file: any) =>
			file.name.toLowerCase().includes(searchValue.toLowerCase())
		);
	}

	$: searchValue, handleSearch();
</script>

<div class="flex w-full flex-col items-start justify-between">
	<div class="bg-background/95 px-1 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<form>
			<div class="relative">
				<SearchIcon class="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
				<Input placeholder="Search" class="pl-8" bind:value={searchValue} />
			</div>
		</form>
	</div>
	<div class="w-full rounded-md border border-gray-200">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px] md:w-[400px]">Name</Table.Head>

					<Table.Head class="">Created At</Table.Head>
					<Table.Head class="text-right">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each filteredList as file}
					<Table.Row>
						<Table.Cell>
							<a
								href={file.pdf.data.attributes.url}
								target="_blank"
								rel="noreferrer;noopener"
								class="... max-w-[100px] truncate text-primary underline md:max-w-[400px]"
							>
								{file.name}.pdf
							</a>
						</Table.Cell>
						<Table.Cell>{new Date(file.createdAt).toLocaleDateString()}</Table.Cell>
						<Table.Cell class="flex justify-end text-right">
							<Button
								on:click={() => (idToDelete = file.id)}
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
</div>

<AlertDialog.Root open={Boolean(idToDelete)}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure to delete folder?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your file and remove it from our
				servers.
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
