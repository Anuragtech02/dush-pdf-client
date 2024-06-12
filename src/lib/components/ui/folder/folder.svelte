<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { FolderClosed } from 'lucide-svelte';

	export let name: string;
	export let id: string;
</script>

<Card.Root class="w-full">
	<Card.Content class="flex items-center justify-start !p-4">
		<FolderClosed />
		<p class="ml-2">{name}</p>
	</Card.Content>
</Card.Root>
