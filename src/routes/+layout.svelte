<script lang="ts">
	import ToastContainer from '$lib/components/ui/toast/ToastContainer.svelte';
	import type { LayoutServerLoad } from './$types';
	import '../app.css';
	import authStore from '$lib/stores/auth.store';

	export let data: LayoutServerLoad;

	$authStore.user = data.user;
</script>

<slot />
<ToastContainer />

<style>
	:global(:root) {
		--width-sidebar: 250px;
	}
</style>
