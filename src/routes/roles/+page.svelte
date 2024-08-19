<script lang="ts">
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';
	import AllRoles from './components/AllRoles.svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { LoaderCircle, SearchIcon } from 'lucide-svelte';
	import { createRoleInternal } from '$lib/api/services-internal';
	import { toastStore } from '$lib/components/ui/toast/toastMessage.store';
	import productStore from '$lib/stores/product.store';
	import type { LayoutServerLoad } from '../$types';
	import { ALL_PERMISSIONS } from '$lib/utils/constants';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import roleStore from '$lib/stores/role.store';

	export let data: LayoutServerLoad;

	type Permission = (typeof ALL_PERMISSIONS)[number];

	interface RolePermissions {
		[roleId: string]: {
			[K in Permission]: boolean;
		};
	}

	let isLoading: boolean = false;
	let createOpen: boolean = false;
	let roleName: string = '';
	let file: File;
	let newRolePermissions: RolePermissions = {};
	let newRoleSearchValue: string = '';
	let newRolePermisionFilteredList: Permission[] = [];

	function getFinalPermissionsList() {
		return newRolePermisionFilteredList.filter(
			(permission) => newRolePermissions['new'][permission]
		);
	}

	async function handleCreateProduct() {
		let isValid = false;
		try {
			const res = await createRoleInternal(roleName, getFinalPermissionsList());
			if (res) {
				// $roleStore = [...$roleStore, res];
				console.log({ res });
			}
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
			const isValidCall = await handleCreateProduct();
			if (isValidCall) {
				toastStore.addToast('Role Created Successfully', { type: 'success' });
				createOpen = false;
			} else {
				console.log('Role Creation Failed');
				toastStore.addToast('Role Creation Failed', { type: 'error' });
			}
		} catch (error) {
			console.log('Failed to create role');
			toastStore.addToast('Failed to create role', { type: 'error' });
		} finally {
			isLoading = false;
		}
	}

	function intializeRolePermisions() {
		if (createOpen) {
			const role: any = {
				id: 'new',
				permissions: []
			};
			ALL_PERMISSIONS.forEach((permission) => {
				newRolePermissions[role.id] = {
					...newRolePermissions[role.id],
					[permission]: false
				};
			});
			// @ts-ignore
			newRolePermisionFilteredList = ALL_PERMISSIONS;
		}
	}

	function handleSearch(): void {
		newRolePermisionFilteredList = ALL_PERMISSIONS.filter((permision: any) =>
			permision.toLowerCase().includes(newRoleSearchValue?.toLowerCase())
		);
	}

	$: newRoleSearchValue, handleSearch();
	$: createOpen, intializeRolePermisions();
</script>

<svelte:head>
	<title>Roles | Dush Products</title>
</svelte:head>

<Sheet.Root bind:open={createOpen}>
	<SidebarLayout pageTitle="All Roles" user={data.user}>
		<AllRoles />
		<div slot="actions">
			<Sheet.Trigger>
				<Button>Create new role</Button>
			</Sheet.Trigger>
		</div>
	</SidebarLayout>

	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Create new role</Sheet.Title>
			<Sheet.Description>
				<form on:submit|preventDefault={onSubmit}>
					<div class="grid gap-4">
						<div class="grid gap-1">
							<Label class="sr-only" for="role-name">Role Name</Label>
							<Input
								id="role-name"
								placeholder="Role Name"
								type="text"
								required
								autocapitalize="none"
								autocomplete="role-name"
								bind:value={roleName}
								autocorrect="off"
								disabled={isLoading}
							/>
						</div>
						<div class="grid place-items-center gap-1 py-2">
							<span class="block h-1 w-full border-t"></span>
						</div>
						<div class="grid gap-1 bg-slate-50 p-1">
							<div>
								<form>
									<div class="relative">
										<SearchIcon class="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
										<Input placeholder="Search" class="pl-8" bind:value={newRoleSearchValue} />
									</div>
								</form>
							</div>
							<div class="h-[calc(100vh-300px)] overflow-y-auto">
								{#each newRolePermisionFilteredList as permission}
									<div class="flex w-full items-center justify-between p-2 px-4">
										<p class="capitalize">
											{permission.replace(/_/g, ' ')?.toLowerCase()}
										</p>
										<Switch
											checked={newRolePermissions['new']?.[permission]}
											on:click={(e) => e.stopPropagation()}
											onCheckedChange={(checked) =>
												(newRolePermissions['new'] = {
													...newRolePermissions['new'],
													[permission]: checked
												})}
										/>
									</div>
								{/each}
							</div>
						</div>
						<Button type="submit" disabled={isLoading} class="sticky bottom-2">
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
