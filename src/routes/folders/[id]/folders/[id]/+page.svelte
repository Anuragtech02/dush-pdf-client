<script lang="ts">
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';
	import type { LayoutServerLoad } from '../../../../$types';
	export let data: LayoutServerLoad;
</script>

<SidebarLayout pageTitle="Level 2" user={data.user}>
	<main>
		<h1>Helllo from level 2</h1>
	</main>
</SidebarLayout>

<style>
	main {
		text-align: center;
		padding: 1rem;
	}
</style>
