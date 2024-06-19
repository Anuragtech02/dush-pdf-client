<script lang="ts">
	import { getAllFilesInternal } from '$lib/api/services-internal';
	import Input from '$lib/components/ui/input/input.svelte';
	import SearchIcon from 'lucide-svelte/icons/search';
	import { onMount } from 'svelte';
	import * as Table from '$lib/components/ui/table';
	import productStore from '$lib/stores/product.store';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { TrashIcon } from 'lucide-svelte';

	let filteredList: any = [];
	let searchValue: string = '';

	const getAllFiles = async () => {
		const res = await getAllFilesInternal();

		const tempFiles: any = [];
		if (res) {
			res.data.data.forEach((file: any) => {
				tempFiles.push({
					id: file.id,
					name: file.attributes.name,
					fileUrl: file.attributes.pdf.data.attributes.url || '',
					createdAt: file.attributes.createdAt,
					publishedAt: file.attributes.publishedAt,
					updatedAt: file.attributes.updatedAt
				});
			});
			$productStore = tempFiles;
		}
	};

	onMount(() => {
		getAllFiles();
	});

	function handleDelete(file: any) {
		console.log('Deleting file', file.name);
		let loading = true;
		setTimeout(() => {
			$productStore = $productStore.filter((f) => f.name !== file.name);
			loading = false;
		}, 1000);
	}

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
								href={file.fileUrl}
								target="_blank"
								rel="noreferrer;noopener"
								class="... max-w-[100px] truncate text-primary underline md:max-w-[400px]"
							>
								{file.name}.pdf
							</a>
						</Table.Cell>
						<Table.Cell>{new Date(file.createdAt).toLocaleDateString()}</Table.Cell>
						<Table.Cell class="flex justify-end text-right">
							<Popover.Root>
								<Popover.Trigger asChild let:builder>
									<Button builders={[builder]} variant="secondary">
										<TrashIcon />
									</Button>
								</Popover.Trigger>
								<Popover.Content>
									<div class="flex items-center justify-center gap-4">
										<p>Sure to remove the user?</p>
										<div class="flex items-center justify-center gap-2">
											<Button variant="secondary">No</Button>
											<Button on:click={() => handleDelete(file)}>Yes</Button>
										</div>
									</div>
								</Popover.Content>
							</Popover.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
