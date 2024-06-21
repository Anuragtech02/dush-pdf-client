<script lang="ts">
	// import { onMount } from 'svelte';
	// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
	// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
	// import { browser } from '$app/environment';
	// import PdfViewer from '$lib/components/ui/pdf-viewer/PdfViewer.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';

	export let data: PageData;
	let pdfData = data.pdfData;
	console.log({ pdfData });
	let PdfViewer;

	// let canvas;
	// let context;

	onMount(async () => {
		const module = await import('$lib/components/ui/pdf-viewer/PdfViewer.svelte');
		PdfViewer = module.default;
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

<SidebarLayout user={data.user} pageTitle="View File">
	<svelte:component this={PdfViewer} data={convertDataURIToBinary(pdfData)} />
</SidebarLayout>
