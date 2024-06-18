<script lang="ts">
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';
	import Home from './home/Home.svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import {  CopyIcon, LoaderCircle } from 'lucide-svelte';
	
	
	import * as Card from '$lib/components/ui/card';
	import { createDirectoryInternal } from '$lib/api/services-internal';

	let isLoading: boolean = false;
	let showSuccess = false;
	let name: string = '';
	let resDirectory: any = {};


	async function onSubmit() {
		try {
			
			if (isLoading) return;
			isLoading = true;
			const isValidCall = await createDirectoryInternal(name);
			if (isValidCall) {
				console.log('Directory Created');
				showSuccess = true;
			} else {
				console.log('Directory Creation Failed');
			}
		} catch (error) {
			console.log("Failed to create directory");
		}finally{
			isLoading = false;
		}
	}
	
</script>

<svelte:head>
	<title>Directories | Dush Products</title>
</svelte:head>



<Sheet.Root>
	<SidebarLayout pageTitle="Users">
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
							Submit Details
						</Button>
					</div>
				</form>
				{#if showSuccess && resDirectory?.username}
					<div><hr /></div>
					<Card.Root class="mt-6 w-full border border-green-600">
						<Card.Title class="p-4">
							<h3 class="text-green-600">
								{resDirectory?.name}
							</h3>
						</Card.Title>
						<Card.Content class="flex items-center justify-start !p-4">
							<div class="flex w-full flex-col items-center justify-center gap-4">
								<p>Success!</p>
							</div>
						</Card.Content>
					</Card.Root>
				{/if}
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
