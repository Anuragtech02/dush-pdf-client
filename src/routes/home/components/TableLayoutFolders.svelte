<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { IFolder } from '$lib/types/commons';
	import * as Popover from '$lib/components/ui/popover';
	import Button from '$lib/components/ui/button/button.svelte';
	import { TrashIcon } from 'lucide-svelte';

	export let folders: Array<IFolder> = [];

	function handleDelete(folder: IFolder) {
		console.log('Deleting folder', folder.name);
	}
</script>

<div class="rounded-md border border-gray-200">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">ID</Table.Head>
				<Table.Head class="">Name</Table.Head>
				<Table.Head class="">Created</Table.Head>
				<Table.Head class="">Updated</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each folders as folder}
				<Table.Row class="cursor-pointer">
					<!-- <Table.Cell class="font-medium">INV001</Table.Cell>
                <Table.Cell>Paid</Table.Cell>
                <Table.Cell>Credit Card</Table.Cell>
                <Table.Cell class="text-right">$250.00</Table.Cell> -->
					<Table.Cell>{folder.id}</Table.Cell>
					<Table.Cell>{folder.name}</Table.Cell>
					<Table.Cell>{new Date(folder.createdAt).toLocaleDateString()}</Table.Cell>
					<Table.Cell>{new Date(folder.updatedAt).toLocaleDateString()}</Table.Cell>
					<Table.Cell class="flex justify-end text-right">
						<Popover.Root>
							<Popover.Trigger asChild let:builder>
								<Button builders={[builder]} variant="secondary">
									<TrashIcon />
								</Button>
							</Popover.Trigger>
							<Popover.Content>
								<div class="flex items-center justify-center gap-4">
									<p>Sure to remove the user?</p>
									<div class="flex items-center justify-center gap-2">
										<Button variant="secondary">No</Button>
										<Button on:click={() => handleDelete(folder)}>Yes</Button>
									</div>
								</div>
							</Popover.Content>
						</Popover.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
