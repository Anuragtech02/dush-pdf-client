<script lang="ts">
	import { deleteProductInternal, getAllRolesInternal } from '$lib/api/services-internal';
	import Input from '$lib/components/ui/input/input.svelte';
	import SearchIcon from 'lucide-svelte/icons/search';
	import { onMount } from 'svelte';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { LoaderCircle, TrashIcon } from 'lucide-svelte';
	import { toastStore } from '$lib/components/ui/toast/toastMessage.store';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import roleStore from '$lib/stores/role.store';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { ALL_PERMISSIONS } from '$lib/utils/constants';

	type Permission = (typeof ALL_PERMISSIONS)[number];

	interface IRole {
		id: string;
		name: string;
		permissions: Array<{ id: number; permission: string }>;
		createdAt: string;
		publishedAt: string;
		updatedAt: string;
	}

	interface RolePermissions {
		[roleId: string]: {
			[K in Permission]: boolean;
		};
	}

	interface ParentSwitchState {
		checked: boolean;
		indeterminate: boolean;
	}

	interface ParentSwitchStates {
		[roleId: string]: ParentSwitchState;
	}

	let filteredList: IRole[] = [];
	let searchValue = '';
	let loading = false;
	let idToDelete: string | null = null;

	let rolePermissions: RolePermissions = {};
	let parentSwitchStates: ParentSwitchStates = {};

	async function handleDelete(id: string) {
		try {
			loading = true;
			const currFile = $roleStore.find((f: any) => f.id === id);
			if (!currFile) {
				toastStore.addToast('File not found', { type: 'error' });

				return;
			}
			// const res = await deleteRoleInernal(id);

			// if (res.status !== 200) {
			// 	console.log('Failed to delete folder');
			// 	toastStore.addToast('Failed to delete folder', { type: 'error' });

			// 	return;
			// }

			toastStore.addToast('File deleted successfully', { type: 'success' });

			$roleStore = $roleStore.filter((f: any) => f.id !== id);

			filteredList = $roleStore;
		} catch (e) {
			console.log('Failed to delete folder');
			toastStore.addToast('Failed to delete folder', { type: 'error' });
		} finally {
			idToDelete = null;
			loading = false;
		}
	}

	const getAllRoles = async (): Promise<void> => {
		if ($roleStore.length > 0) {
			filteredList = $roleStore;
			initializeRolePermissions();
			return;
		}
		loading = true;
		const res = await getAllRolesInternal();

		console.log(res.data);

		const tempRoles: IRole[] = [];
		if (res && res.data && res.data.data) {
			res.data.data.forEach((file: any) => {
				tempRoles.push({
					id: file.id,
					name: file.attributes.name,
					permissions: file.attributes.permissions,
					createdAt: file.attributes.createdAt,
					publishedAt: file.attributes.publishedAt,
					updatedAt: file.attributes.updatedAt
				});
			});
			filteredList = tempRoles;
			$roleStore = tempRoles;
			initializeRolePermissions();
		}
		loading = false;
	};

	function initializeRolePermissions(): void {
		rolePermissions = $roleStore.reduce<RolePermissions>((acc, role) => {
			acc[role.id] = ALL_PERMISSIONS.reduce(
				(permAcc, permission) => {
					// Check if the permission exists in the role's permissions array
					permAcc[permission] = role.permissions.some((p) => p.permission === permission);
					return permAcc;
				},
				{} as { [K in Permission]: boolean }
			);
			return acc;
		}, {});
		updateParentSwitchStates();
	}

	function handlePermissionChange(roleId: string, permission: Permission, checked: boolean): void {
		rolePermissions[roleId][permission] = checked;
		rolePermissions = { ...rolePermissions }; // Trigger reactivity
		updateParentSwitchStates();
	}

	function handleParentPermissionChange(roleId: string, checked: boolean): void {
		ALL_PERMISSIONS.forEach((permission) => {
			rolePermissions[roleId][permission] = checked;
		});
		rolePermissions = { ...rolePermissions }; // Trigger reactivity
		updateParentSwitchStates();
	}

	function updateParentSwitchStates(): void {
		parentSwitchStates = Object.keys(rolePermissions).reduce<ParentSwitchStates>((acc, roleId) => {
			const permissions = rolePermissions[roleId];
			const allChecked = ALL_PERMISSIONS.every((permission) => permissions[permission]);
			const someChecked = ALL_PERMISSIONS.some((permission) => permissions[permission]);
			acc[roleId] = {
				checked: allChecked,
				indeterminate: !allChecked && someChecked
			};
			return acc;
		}, {});
	}

	onMount(() => {
		getAllRoles();
	});

	function handleSearch(): void {
		filteredList = $roleStore.filter((role: IRole) =>
			role.name.toLowerCase().includes(searchValue.toLowerCase())
		);
	}

	$: searchValue, handleSearch();
</script>

<div class="flex w-full flex-col items-start justify-between">
	<div class="bg-background/95 px-1 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<form>
			<div class="relative">
				<SearchIcon class="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
				<Input placeholder="Search" class="pl-8" bind:value={searchValue} />
			</div>
		</form>
	</div>
	<div class="w-full rounded-md border border-gray-200">
		{#if loading}
			<div class="flex items-center justify-center">
				<LoaderCircle class="h-6 w-6 animate-spin text-primary-foreground" />
			</div>
		{:else}
			{#each filteredList as role, i}
				<Collapsible.Root class="my-2 w-full {i !== filteredList.length - 1 ? 'border-b' : ''}">
					<Collapsible.Trigger class="w-full p-2 px-4">
						<div class="flex w-full items-center justify-between">
							<p><strong>{role.name}</strong></p>
							<Switch
								checked={parentSwitchStates[role.id]?.checked || false}
								class={parentSwitchStates[role.id]?.indeterminate ? '!bg-yellow-500' : ''}
								onCheckedChange={(checked) => handleParentPermissionChange(role.id, checked)}
							/>
						</div>
					</Collapsible.Trigger>
					<Collapsible.Content class="grid grid-cols-1 bg-slate-50 md:grid-cols-2">
						{#each ALL_PERMISSIONS as permission}
							<div class="flex w-full items-center justify-between p-2 px-4">
								<p class="capitalize">
									{permission.replace(/_/g, ' ').toLowerCase()}
								</p>
								<Switch
									checked={rolePermissions[role.id]?.[permission] || false}
									on:click={(e) => e.stopPropagation()}
									onCheckedChange={(checked) =>
										handlePermissionChange(role.id, permission, checked)}
								/>
							</div>
						{/each}
					</Collapsible.Content>
				</Collapsible.Root>
			{/each}
		{/if}
	</div>
</div>

<AlertDialog.Root open={Boolean(idToDelete)}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure to delete this role?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete the role and remove it from our
				servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={() => (idToDelete = null)}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={() => idToDelete && handleDelete(idToDelete)}
				>Continue</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
