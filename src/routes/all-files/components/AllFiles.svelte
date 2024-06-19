<script lang="ts">
	import { getAllFilesInternal } from '$lib/api/services-internal';
	import Input from '$lib/components/ui/input/input.svelte';
	import SearchIcon from 'lucide-svelte/icons/search';
	import { onMount } from 'svelte';


	let allFiles = []

	const getAllFiles = async () => {
		const tempFiles = await getAllFilesInternal()

		if (tempFiles) {
			allFiles = tempFiles.data.data
		}

		console.log(allFiles)
	}

	onMount(() => {
		getAllFiles()
	})

	
</script>

<div class="flex items-center justify-between">
	<div class="bg-background/95 px-1 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<form>
			<div class="relative">
				<SearchIcon class="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
				<Input placeholder="Search" class="pl-8" />
			</div>
		</form>
	</div>
	<div></div>
</div>
