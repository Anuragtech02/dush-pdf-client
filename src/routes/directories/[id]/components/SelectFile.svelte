<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { onDestroy, onMount, tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import productStore, { type IProduct } from '$lib/stores/product.store';
	import { getAllFilesInternal } from '$lib/api/services-internal';

	let open = false;
	let value = '';

	// Subscribe to the product store
	let products: IProduct[] = [];

	const getAllFiles = async () => {
		const res = await getAllFilesInternal();

		const tempFiles: IProduct[] = [];
		if (res) {
			res.data.data.forEach((file: any) => {
				tempFiles.push({
					id: file.id,
					name: file.attributes.name,
					pdf: file.attributes.pdf,
					createdAt: file.attributes.createdAt,
					publishedAt: file.attributes.publishedAt,
					updatedAt: file.attributes.updatedAt
				});
			});
			$productStore = tempFiles;
			products = tempFiles;
		}
	};

	// const unsubscribe = productStore.subscribe((data) => {
	// 	products = data;
	// });
	$: selectedProduct =
		products.find((p) => p.id.toString() === value)?.name ?? 'Select a product...';

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	onMount(() => {
		getAllFiles();
	});

	// Cleanup subscription when the component is destroyed
	// onDestroy(() => {
	// 	unsubscribe();
	// });
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-full justify-between"
		>
			{selectedProduct}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-full p-0">
		<Command.Root>
			<Command.Input placeholder="Search product..." />
			<Command.Empty>No product found.</Command.Empty>
			<Command.Group>
				{#each products as product}
					<Command.Item
						value={product.id.toString()}
						onSelect={(currentValue) => {
							value = currentValue;
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						<Check
							class={cn('mr-2 h-4 w-4', value !== product.id.toString() && 'text-transparent')}
						/>
						{product.name}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
