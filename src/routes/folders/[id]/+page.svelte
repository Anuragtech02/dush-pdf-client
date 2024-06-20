<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import GridIcon from 'lucide-svelte/icons/layout-grid';
	import ListChecksIcon from 'lucide-svelte/icons/list-checks';
	import GridLayoutFiles from '../components/GridLayoutFiles.svelte';
	import TableLayoutFiles from '../components/TableLayoutFiles.svelte';
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';
	import type { LayoutServerLoad } from '../../$types';
	import { onMount } from 'svelte';
	import { getDirectoryByIDInternal } from '$lib/api/services-internal';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import SelectFile from './components/SelectFile.svelte';
	import productStore, { type IProduct } from '$lib/stores/product.store';

	let tabValue: string = 'grid';
	export let data: LayoutServerLoad;
	let isLoading: boolean = false;

	let products: Array<any> = [];

	const directoryId = $page.params.id;

	const getDirectoryItems = async () => {
		const res = await getDirectoryByIDInternal(directoryId);

		if (res.status !== 200) {
			return;
		}

		let tempFolders: any;

		tempFolders = {
			id: res.data.id,
			...res.data.data.attributes
		};

		const tempProducts: IProduct[] = [];

		tempFolders.products.data.forEach((product: any) => {
			tempProducts.push({
				id: product.id.toString(),
				name: product.attributes.name,
				pdf: product.attributes.pdf,
				createdAt: product.createdAt,
				updatedAt: product.updatedAt,
				publishedAt: product.publishedAt
			});
		});

		products = tempProducts;
	};

	onMount(() => {
		getDirectoryItems();
	});

	function onSubmit() {}
</script>

<Sheet.Root>
	<SidebarLayout pageTitle="All Files" user={data.user}>
		<Tabs.Root bind:value={tabValue}>
			<div class="flex w-full items-center justify-between">
				<div>
					<h5>Files</h5>
				</div>
				<Tabs.List>
					<Tabs.Trigger value="grid">
						<GridIcon />
					</Tabs.Trigger>
					<Tabs.Trigger value="list">
						<ListChecksIcon />
					</Tabs.Trigger>
				</Tabs.List>
			</div>
			<Tabs.Content value="grid" class="mt-4">
				<GridLayoutFiles folders={products} />
			</Tabs.Content>
			<Tabs.Content value="list">
				<TableLayoutFiles folders={products} />
			</Tabs.Content>
		</Tabs.Root>
		<div slot="actions">
			<Sheet.Trigger>
				<Button>Add New File</Button>
			</Sheet.Trigger>
		</div>
	</SidebarLayout>

	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Add New File</Sheet.Title>
			<Sheet.Description>
				<form on:submit|preventDefault={onSubmit}>
					<div class="grid gap-4">
						<div class="grid gap-1">
							<SelectFile />
						</div>
						<div class="flex items-center justify-center gap-1">
							<hr class="flex-1" />
							OR
							<hr class="flex-1" />
						</div>
						<div class="grid gap-1">
							<Button variant="secondary">Upload new file</Button>
						</div>
					</div>
				</form>
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
