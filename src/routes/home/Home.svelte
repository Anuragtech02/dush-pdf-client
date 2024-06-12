<script lang="ts">
	import Folder from '$lib/components/ui/folder/folder.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import GridIcon from 'lucide-svelte/icons/layout-grid';
	import ListChecksIcon from 'lucide-svelte/icons/list-checks';
	import GridLayoutFolders from './components/GridLayoutFolders.svelte';
	import TableLayoutFolders from './components/TableLayoutFolders.svelte';

	let tabValue: string = 'grid';

	const folders = new Array(5).fill(null).map((_, index) => ({
		id: index.toString(),
		name: `Dush Product ${index + 1}`,
		parentId: '1',
		createdAt: new Date().toISOString()
	}));
</script>

<div class="container mt-10">
	<Tabs.Root bind:value={tabValue}>
		<div class="flex w-full items-center justify-between">
			<div>
				<h4>Folders</h4>
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
</div>
