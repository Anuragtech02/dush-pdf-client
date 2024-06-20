<script lang="ts">
	import Folder from '$lib/components/ui/folder/folder.svelte';
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

	let tabValue: string = 'grid';
	export let data: LayoutServerLoad;

	let products: any = [];

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

		const tempProducts: any = [];

		tempFolders.products.data.forEach((product: any) => {
			tempProducts.push({
				id: product.id,
				...product.attributes
			});
		});

		products = tempProducts;
	};

	onMount(() => {
		getDirectoryItems();
	});
</script>

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
</SidebarLayout>
