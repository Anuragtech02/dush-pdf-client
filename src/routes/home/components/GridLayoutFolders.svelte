<script lang="ts">
	import Folder from '$lib/components/ui/folder/folder.svelte';
	import type { IFolder } from '$lib/types/commons';
	export let folders: Array<IFolder> = [];
</script>

<div
	class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
	{#each folders as folder}
		<Folder name={folder.name} id={folder.id} />
	{/each}
</div>
