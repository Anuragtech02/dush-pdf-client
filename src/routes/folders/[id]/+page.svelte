<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import GridIcon from 'lucide-svelte/icons/layout-grid';
	import ListChecksIcon from 'lucide-svelte/icons/list-checks';
	import GridLayoutFiles from '../components/GridLayoutFiles.svelte';
	import TableLayoutFiles from '../components/TableLayoutFiles.svelte';
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';
	import type { LayoutServerLoad } from '../../$types';
	import { onMount } from 'svelte';
	import {
		createProductInternal,
		getDirectoryByIDInternal,
		updateDirectoryInternal,
		uploadFileInternal
	} from '$lib/api/services-internal';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import SelectFile from './components/SelectFile.svelte';
	import productStore, { type IProduct } from '$lib/stores/product.store';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import directoryStore from '$lib/stores/directory.store';

	let tabValue: string = 'grid';
	export let data: LayoutServerLoad;
	let isLoading: boolean = false;
	let file: File;
	let name: string = '';

	let products: Array<any> = [];

	const directoryId = $page.params.id;

	const getDirectoryItems = async () => {
		const res = await getDirectoryByIDInternal(directoryId);

		if (res.status !== 200) {
			return;
		}

		let tempFolders: any;

		tempFolders = {
			id: res.data.id,
			...res.data.data.attributes
		};

		const tempProducts: IProduct[] = [];

		tempFolders.products.data.forEach((product: any) => {
			tempProducts.push({
				id: product.id.toString(),
				name: product.attributes.name,
				pdf: product.attributes.pdf,
				createdAt: product.createdAt,
				updatedAt: product.updatedAt,
				publishedAt: product.publishedAt
			});
		});

		products = tempProducts;
	};

	async function handleFileUpload() {
		let isValid = false;
		try {
			const formData = new FormData();
			formData.append('file', file);
			const res = await uploadFileInternal(formData);
			const data = res.data;
			const uploadedFile = data[0];

			const createProdRes = await createProductInternal(uploadedFile.id, name);

			const updateDirecRes = await updateDirectoryInternal(parseInt(directoryId), {
				data: {
					products: [...products, createProdRes.data.data.id]
				}
			});

			$directoryStore.folders = [
				...$directoryStore.folders,
				{
					id: updateDirecRes.data.id,
					...updateDirecRes.data.data.attributes
				}
			];

			$productStore = [
				...$productStore,
				{
					pdf: {
						data: {
							attributes: uploadedFile
						}
					},
					id: createProdRes.data.data.id,
					createdAt: createProdRes.data.data.attributes.createdAt,
					name: createProdRes.data.data.attributes.name,
					updatedAt: createProdRes.data.data.attributes.updatedAt,
					publishedAt: createProdRes.data.data.attributes.publishedAt
				}
			];

			isValid = true;
		} catch (error) {
			console.log('AUTH ERROR: ', error);
			isValid = false;
		}
		isLoading = false;
		return isValid;
	}

	onMount(() => {
		getDirectoryItems();
	});

	function onSubmit() {
		handleFileUpload();
	}
</script>

<Sheet.Root>
	<SidebarLayout pageTitle="All Files" user={data.user}>
		<Tabs.Root bind:value={tabValue}>
			<div class="flex w-full items-center justify-between">
				<div>
					<h5>Files</h5>
				</div>
				<Tabs.List>
					<Tabs.Trigger value="grid">
						<GridIcon />
					</Tabs.Trigger>
					<Tabs.Trigger value="list">
						<ListChecksIcon />
					</Tabs.Trigger>
				</Tabs.List>
			</div>
			<Tabs.Content value="grid" class="mt-4">
				<GridLayoutFiles folders={products} />
			</Tabs.Content>
			<Tabs.Content value="list">
				<TableLayoutFiles folders={products} />
			</Tabs.Content>
		</Tabs.Root>
		<div slot="actions">
			<Sheet.Trigger>
				<Button>Add New File</Button>
			</Sheet.Trigger>
		</div>
	</SidebarLayout>

	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Add New File</Sheet.Title>
			<Sheet.Description>
				<div class="grid gap-4">
					<div class="grid gap-1">
						<SelectFile />
					</div>
					<div class="flex items-center justify-center gap-1">
						<hr class="flex-1" />
						OR
						<hr class="flex-1" />
					</div>
					<form on:submit|preventDefault={onSubmit}>
						<div class="grid gap-4">
							<div class="grid gap-1">
								<Label class="sr-only" for="username">Username</Label>
								<Input
									id="name"
									placeholder="File Name"
									type="text"
									required
									autocapitalize="none"
									autocomplete="name"
									bind:value={name}
									autocorrect="off"
									disabled={isLoading}
								/>
							</div>
							<div class="grid gap-1">
								<Input
									id="file"
									placeholder="Choose file"
									type="file"
									required
									on:change={(e) => {
										// @ts-ignore
										if (e.target?.files) file = e.target.files[0];
									}}
									autocorrect="off"
									disabled={isLoading}
									accept=".pdf"
								/>
							</div>
							<div class="mt-2 grid gap-2">
								<Button type="submit" variant="secondary">Upload new file</Button>
							</div>
						</div>
					</form>
				</div>
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
