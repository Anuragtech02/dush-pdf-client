<script lang="ts">
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';
	import AllFiles from './components/AllFiles.svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { LoaderCircle } from 'lucide-svelte';
	import { uploadFileInternal } from '$lib/api/services-internal';

	let isLoading: boolean = false;
	let createOpen: boolean = false;
	let file: File;

	async function handleFileUpload() {
		let isValid = false;
		try {
			const formData = new FormData();
			formData.append('file', file);
			const res = await uploadFileInternal(formData);
			isValid = true;
		} catch (error) {
			console.log('AUTH ERROR: ', error);
			isValid = false;
		}
		isLoading = false;
		return isValid;
	}

	async function onSubmit() {
		try {
			if (isLoading) return;
			isLoading = true;
			const isValidCall = await handleFileUpload();
			if (isValidCall) {
				console.log('File Uploaded');
			} else {
				console.log('File Upload Failed');
			}
		} catch (error) {
			console.log('Failed to create directory');
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>All Files | Dush Products</title>
</svelte:head>

<Sheet.Root bind:open={createOpen}>
	<SidebarLayout pageTitle="All Files">
		<AllFiles />
		<div slot="actions">
			<Sheet.Trigger>
				<Button>Upload new file</Button>
			</Sheet.Trigger>
		</div>
	</SidebarLayout>

	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Upload new file</Sheet.Title>
			<Sheet.Description>
				<form on:submit|preventDefault={onSubmit}>
					<div class="grid gap-4">
						<div class="grid gap-1">
							<Input
								id="file"
								placeholder="Choose file"
								type="file"
								required
								bind:value={file}
								autocorrect="off"
								disabled={isLoading}
								accept=".pdf"
							/>
						</div>

						<Button type="submit" disabled={isLoading}>
							{#if isLoading}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Submit Details
						</Button>
					</div>
				</form>
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
