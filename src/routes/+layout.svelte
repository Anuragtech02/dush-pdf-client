<script>
	import ToastContainer from '$lib/components/ui/toast/ToastContainer.svelte';
	import '../app.css';
</script>

<slot />
<ToastContainer />

<style>
	:global(:root) {
		--width-sidebar: 250px;
	}
</style>
