<script lang="ts">
	import File from '$lib/components/ui/file/file.svelte';

	export let folders: Array<any> = [];

	const truncateName = (name: string) => {
		return name.length > 20
			? `${name.substring(0, 8)}...${name.substring(name.length - 6, name.length)}`
			: name;
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
			<File name={truncateName(folder.name) + '.pdf'} id={folder.id} />
		</a>
	{/each}
</div>
