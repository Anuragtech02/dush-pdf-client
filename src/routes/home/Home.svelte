<script lang="ts">
	import Folder from '$lib/components/ui/folder/folder.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import GridIcon from 'lucide-svelte/icons/layout-grid';
	import ListChecksIcon from 'lucide-svelte/icons/list-checks';
	import GridLayoutFolders from './components/GridLayoutFolders.svelte';
	import TableLayoutFolders from './components/TableLayoutFolders.svelte';
	import { getAllDirectoriesInternal } from '$lib/api/services-internal';
	import { onMount } from 'svelte';
	import directoryStore from '$lib/stores/directory.store';
	import { toastStore } from '$lib/components/ui/toast/toastMessage.store';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';

	let tabValue: string = 'grid';
	let isLoading = false;
	$directoryStore.folders = [];

	async function fetchAllDirectories() {
		isLoading = true;
		try {
			const res = await getAllDirectoriesInternal();

			if (res.status !== 200) {
				return;
			}
			const tempFolders: any[] = [];
			res.data.data.forEach((folder: any) => {
				tempFolders.push({
					id: folder.id,
					...folder.attributes
				});
			});
			$directoryStore.folders = tempFolders;
		} catch (error) {
			toastStore.addToast('Failed to fetch directories', { type: 'error' });
		} finally {
			isLoading = false;
		}
	}

	onMount(async () => {
		fetchAllDirectories();
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
	{#if isLoading}
		<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{#each Array(6) as i}
				<Skeleton class="h-[100px] w-full rounded-md" />
			{/each}
		</div>
	{:else}
		<Tabs.Content value="grid" class="mt-4">
			<GridLayoutFolders folders={$directoryStore.folders} />
		</Tabs.Content>
		<Tabs.Content value="list">
			<TableLayoutFolders folders={$directoryStore.folders} />
		</Tabs.Content>
	{/if}
</Tabs.Root>
