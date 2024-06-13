<script>
	import Header from '$lib/components/ui/header/header.svelte';
	import '../app.css';
</script>

<slot />

<style>
	:global(:root) {
		--width-sidebar: 250px;
	}
</style>
