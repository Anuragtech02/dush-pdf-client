<script lang="ts">
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';
	import Home from './home/Home.svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { LoaderCircle } from 'lucide-svelte';

	import { createDirectoryInternal } from '$lib/api/services-internal';
	import { toastStore } from '$lib/components/ui/toast/toastMessage.store';
	import directoryStore from '$lib/stores/directory.store';
	import type { LayoutServerLoad } from './$types';

	export let data: LayoutServerLoad;

	let isLoading: boolean = false;
	let createOpen: boolean = false;
	let name: string = '';
	let resDirectory: any = {};

	async function onSubmit() {
		try {
			if (isLoading) return;
			isLoading = true;
			const isValidCall = await createDirectoryInternal(name);
			if (isValidCall) {
				console.log('Directory Created');
				name = '';
				resDirectory = { id: isValidCall.data.data.id, ...isValidCall.data.data.attributes };
				$directoryStore.folders = [...$directoryStore.folders, resDirectory];
				createOpen = false;
				toastStore.addToast(`Directory ${resDirectory.name} Created Successfully`, {
					type: 'success'
				});
			} else {
				console.log('Directory Creation Failed');
			}
		} catch (error) {
			console.log('Failed to create directory');
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Directories | Dush Products</title>
</svelte:head>

<Sheet.Root bind:open={createOpen}>
	<SidebarLayout pageTitle="Directories" user={data.user}>
		<Home />
		<div slot="actions">
			<Sheet.Trigger>
				<Button>Create New Directory</Button>
			</Sheet.Trigger>
		</div>
	</SidebarLayout>

	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Create New Directory</Sheet.Title>
			<Sheet.Description>
				<form on:submit|preventDefault={onSubmit}>
					<div class="grid gap-4">
						<div class="grid gap-1">
							<Label class="sr-only" for="username">Directory Name</Label>
							<Input
								id="name"
								placeholder="Directory Name"
								type="text"
								autocapitalize="none"
								autocomplete="name"
								bind:value={name}
								autocorrect="off"
								disabled={isLoading}
							/>
						</div>

						<Button type="submit" disabled={isLoading}>
							{#if isLoading}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Create Directory
						</Button>
					</div>
				</form>
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
