<script lang="ts">
	import Folder from '$lib/components/ui/folder/folder.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import GridIcon from 'lucide-svelte/icons/layout-grid';
	import ListChecksIcon from 'lucide-svelte/icons/list-checks';
	import GridLayoutFolders from './components/GridLayoutFolders.svelte';
	import TableLayoutFolders from './components/TableLayoutFolders.svelte';
	import { getAllDirectoriesInternal } from '$lib/api/services-internal';
	import { onMount } from 'svelte';
	
	let tabValue: string = 'grid';
	let folders:any[] = [] ;

	onMount(async () => {
		const res  = await getAllDirectoriesInternal();

		if(res.status !== 200){
			return
		}
		const tempFolders:any[] = [] 
		res.data.data.forEach((folder:any) => {
			tempFolders.push({
				id: folder.id,
				...folder.attributes
			})
		})
		folders = tempFolders
	});


	
</script>

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
