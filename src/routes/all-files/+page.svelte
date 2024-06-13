<script lang="ts">
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';
	import AllFiles from './components/AllFiles.svelte';
</script>

<svelte:head>
	<title>All Files | Dush Products</title>
</svelte:head>
<SidebarLayout pageTitle="All Files">
	<AllFiles />
</SidebarLayout>
