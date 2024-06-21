<script lang="ts">
	// import { onMount } from 'svelte';
	// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
	// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
	// import { browser } from '$app/environment';
	// import PdfViewer from '$lib/components/ui/pdf-viewer/PdfViewer.svelte';
	import { onMount } from 'svelte';
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';
	import { getPdfDataInternal } from '$lib/api/services-internal';
	import { page } from '$app/stores';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { toastStore } from '$lib/components/ui/toast/toastMessage.store.js';
	export let data;
	let PdfViewer;

	// let canvas;
	// let context;
	let pdfData = '';
	let dataLoading = true;

	async function fetchPdfData() {
		let isValid = true;
		dataLoading = true;
		toastStore.addToast('Please wait while we download the file...', {
			type: 'info',
			duration: 5000
		});
		try {
			const res = await getPdfDataInternal(parseInt($page.params.id));
			pdfData = await res.data.pdfData;
		} catch (error) {
			console.log('AUTH ERROR: ', error);
			toastStore.addToast('Failed to fetch file data', { type: 'error' });
			isValid = false;
		} finally {
			dataLoading = false;
		}
	}

	onMount(async () => {
		const module = await import('$lib/components/ui/pdf-viewer/PdfViewer.svelte');
		PdfViewer = module.default;

		fetchPdfData();
	});

	// onMount(async () => {
	// 	if (browser) {
	// 		const loadingTask = pdfjsLib.getDocument({ data: pdfData });
	// 		const pdf = await loadingTask.promise;
	// 		const page = await pdf.getPage(1);
	// 		const viewport = page.getViewport({ scale: 1.5 });

	// 		canvas.width = viewport.width;
	// 		canvas.height = viewport.height;

	// 		const renderContext = {
	// 			canvasContext: context,
	// 			viewport: viewport
	// 		};
	// 		await page.render(renderContext).promise;
	// 	}
	// });
	var BASE64_MARKER = ';base64,';

	function convertDataURIToBinary(dataURI) {
		var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
		var base64 = dataURI.substring(base64Index);
		var raw = atob(base64);
		var rawLength = raw.length;
		var array = new Uint8Array(new ArrayBuffer(rawLength));

		for (var i = 0; i < rawLength; i++) {
			array[i] = raw.charCodeAt(i);
		}
		return array;
	}
</script>

<svelte:head>
	<title>View File | Dush Products</title>
</svelte:head>

<SidebarLayout user={data.user} pageTitle="View File">
	{#if dataLoading}
		<Skeleton class="h-[300px] w-full rounded-md" />
		<Skeleton class="mt-4 h-[500px] w-full rounded-md" />
	{:else}
		<svelte:component this={PdfViewer} data={convertDataURIToBinary(pdfData)} />
	{/if}
</SidebarLayout>
