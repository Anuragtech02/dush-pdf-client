<script lang="ts">
	import type { deleteDirectoryInternal } from '$lib/api/services-internal';
	import * as Table from '$lib/components/ui/table';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';

	export let folders: Array<any> = [];

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	const openURL = (url: string) => {
		const el = document.createElement('a');
		el.href = url;
		el.target = '_blank';

		el.click();

		el.remove();
	};
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
				<!-- <ContextMenu.Root>
					<ContextMenu.Trigger class="flex w-full"> -->
				<Table.Row class="cursor-pointer">
					<!-- <Table.Cell class="font-medium">INV001</Table.Cell>
                <Table.Cell>Paid</Table.Cell>
                <Table.Cell>Credit Card</Table.Cell>
                <Table.Cell class="text-right">$250.00</Table.Cell> -->
					<Table.Cell>{folder.id}</Table.Cell>
					<Table.Cell>{folder.name}.pdf</Table.Cell>
					<Table.Cell class="text-right">
						<a href={'/view-pdf/' + folder.id} rel="noreferrer"> Open </a>
					</Table.Cell>
				</Table.Row>
				<!-- </ContextMenu.Trigger>
					<ContextMenu.Content class="w-64">
						<ContextMenu.Item inset on:click={() => copyToClipboard(folder.pdf.data.attributes.url)}
							>Copy Link</ContextMenu.Item
						>
						<ContextMenu.Item inset on:click={() => openURL(folder.pdf.data.attributes.url)}
							>Open</ContextMenu.Item
						>
					</ContextMenu.Content>
				</ContextMenu.Root> -->
			{/each}
		</Table.Body>
	</Table.Root>
</div>
