<script lang="ts">
	import { getAllFilesInternal } from '$lib/api/services-internal';
	import Input from '$lib/components/ui/input/input.svelte';
	import SearchIcon from 'lucide-svelte/icons/search';
	import { onMount } from 'svelte';
	import * as Table from '$lib/components/ui/table';
	import productStore from '$lib/stores/product.store';

	$productStore.files = [];

	const getAllFiles = async () => {
		const res = await getAllFilesInternal();

		const tempFiles: any = [];
		if (res) {
			res.data.data.forEach((file: any) => {
				tempFiles.push({
					id: file.id,
					...file.attributes
				});
			});
			$productStore.files = tempFiles;
		}
	};

	onMount(() => {
		getAllFiles();
	});
</script>

<div class="flex w-full flex-col items-start justify-between">
	<div class="bg-background/95 px-1 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<form>
			<div class="relative">
				<SearchIcon class="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
				<Input placeholder="Search" class="pl-8" />
			</div>
		</form>
	</div>
	<div class="w-full rounded-md border border-gray-200">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[200px]">Name</Table.Head>

					<Table.Head class="">Created At</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each $productStore.files as file}
					<Table.Row>
						<Table.Cell>{file.name}</Table.Cell>
						<Table.Cell>{file.createdAt}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
