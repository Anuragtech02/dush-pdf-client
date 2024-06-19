<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { FileText } from 'lucide-svelte';

	export let name: string;
	export let id: string;
</script>

<Card.Root class="w-full">
	<Card.Content class="flex items-center justify-start !p-4">
		<FileText />
		<p class="ml-2">{name}</p>
	</Card.Content>
</Card.Root>
