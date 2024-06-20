<script lang="ts">
	import File from '$lib/components/ui/file/file.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';

	export let folders: Array<any> = [];

	const truncateName = (name: string) => {
		return name.length > 20
			? `${name.substring(0, 8)}...${name.substring(name.length - 6, name.length)}`
			: name;
	};

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

<div
	class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
	{#each folders as folder}
		<a
			href={folder.pdf.data.attributes.url}
			target="_blank"
			rel="noreferrer"
			class="hover:[&>div]:bg-slate-200"
		>
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<File name={truncateName(folder.name) + '.pdf'} id={folder.id} />
				</ContextMenu.Trigger>
				<ContextMenu.Content class="w-64">
					<ContextMenu.Item inset on:click={() => copyToClipboard(folder.pdf.data.attributes.url)}
						>Copy Link</ContextMenu.Item
					>

					<ContextMenu.Item inset on:click={() => openURL(folder.pdf.data.attributes.url)}
						>Open</ContextMenu.Item
					>
				</ContextMenu.Content>
			</ContextMenu.Root>
		</a>
	{/each}
</div>
