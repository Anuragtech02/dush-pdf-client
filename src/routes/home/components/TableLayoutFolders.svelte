<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { IFolder } from '$lib/types/commons';

	export let folders: Array<IFolder> = [];
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">ID</Table.Head>
			<Table.Head class="">Name</Table.Head>
			<Table.Head class="text-right">Link</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each folders as folder}
			<Table.Row>
				<!-- <Table.Cell class="font-medium">INV001</Table.Cell>
			<Table.Cell>Paid</Table.Cell>
			<Table.Cell>Credit Card</Table.Cell>
			<Table.Cell class="text-right">$250.00</Table.Cell> -->
				<Table.Cell>{folder.id}</Table.Cell>
				<Table.Cell>{folder.name}</Table.Cell>
				<Table.Cell class="text-right">Link</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
