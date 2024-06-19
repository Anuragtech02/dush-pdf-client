<script lang="ts">
	import type { deleteDirectoryInternal } from '$lib/api/services-internal';
	import * as Table from '$lib/components/ui/table';

	export let folders: Array<any> = [];
</script>

<div class="rounded-md border border-gray-200">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">ID</Table.Head>
				<Table.Head class="">Name</Table.Head>
				<Table.Head class="text-right">PDF URL</Table.Head>
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
					<Table.Cell>{folder.name}.pdf</Table.Cell>
					<Table.Cell class="text-right">
						<a href={folder.pdf.data.attributes.url} target="_blank" rel="noreferrer"> Open </a>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
