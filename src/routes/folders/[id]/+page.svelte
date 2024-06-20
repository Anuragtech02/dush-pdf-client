<script lang="ts">
	import Folder from '$lib/components/ui/folder/folder.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import GridIcon from 'lucide-svelte/icons/layout-grid';
	import ListChecksIcon from 'lucide-svelte/icons/list-checks';
	import GridLayoutFolders from '../components/GridLayoutFolders.svelte';
	import TableLayoutFolders from '../components/TableLayoutFolders.svelte';
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';
	import type { LayoutServerLoad } from '../../$types';

	let tabValue: string = 'grid';
	export let data: LayoutServerLoad;

	const folders = new Array(5).fill(null).map((_, index) => ({
		id: index.toString(),
		name: `Dush Product ${index + 1}`,
		parentId: '1',
		createdAt: new Date().toISOString()
	}));
</script>

<SidebarLayout pageTitle="All Files" user={data.user}>
	<Tabs.Root bind:value={tabValue}>
		<div class="flex w-full items-center justify-between">
			<div>
				<h5>Folders</h5>
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
			<GridLayoutFolders {folders} />
		</Tabs.Content>
		<Tabs.Content value="list">
			<TableLayoutFolders {folders} />
		</Tabs.Content>
	</Tabs.Root>
</SidebarLayout>
