<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table';
	import TrashIcon from 'lucide-svelte/icons/trash-2';
	import * as Popover from '$lib/components/ui/popover';
	import * as Alert from '$lib/components/ui/alert';
	import customerStore, { type ICustomer } from '$lib/stores/customers.store';
	import { onMount } from 'svelte';
	import { getAllUsersInternal } from '$lib/api/services-internal';

	let loading: boolean = false;
	let showAlert: boolean = false;
	let alertMessage = {
		title: '',
		description: ''
	};

	let users = new Array(10).fill(null).map((item, i) => ({
		name: `Test ${i + 1}`,
		username: `test${i + 1}`,
		expiry: '2022-12-31',
		role: 'Customer'
	}));

	async function fetchAllUsers() {
		try {
			const res = await getAllUsersInternal();

			let users = res.data?.data?.map((item: any, i: number) => ({
				name: item.attributes.name,
				username: item.attributes.username,
				expiry: item.attributes.expiry,
				role: item.attributes.role
			}));
			customerStore.set(users);
		} catch (error) {
			console.log('ERROR FETCHING ALL USERS', error);
		}
	}

	onMount(() => {
		fetchAllUsers();
	});

	function handleDelete(user: ICustomer) {
		console.log('Deleting user', user.username);
		let loading = true;
		setTimeout(() => {
			$customerStore = $customerStore.filter((u) => u.username !== user.username);
			loading = false;
			showAlert = true;
			alertMessage = {
				title: 'User Deleted',
				description: 'User has been deleted successfully'
			};
			setTimeout(() => {
				showAlert = false;
			}, 1000);
		}, 1000);
	}
</script>

<div class="rounded-md border border-gray-200">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[200px]">Name</Table.Head>
				<Table.Head class="">Username</Table.Head>
				<Table.Head class="">Expiry</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each $customerStore as user}
				<Table.Row>
					<Table.Cell>{user.name}</Table.Cell>
					<Table.Cell>{user.username}</Table.Cell>
					<Table.Cell>{user.expiry}</Table.Cell>
					<Table.Cell class="flex justify-end text-right">
						<Popover.Root>
							<Popover.Trigger asChild let:builder>
								<Button builders={[builder]} variant="secondary">
									<TrashIcon />
								</Button>
							</Popover.Trigger>
							<Popover.Content>
								<div class="flex items-center justify-center gap-4">
									<p>Sure to remove the user?</p>
									<div class="flex items-center justify-center gap-2">
										<Button variant="secondary">No</Button>
										<Button on:click={() => handleDelete(user)}>Yes</Button>
									</div>
								</div>
							</Popover.Content>
						</Popover.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

{#if showAlert}
	<div class="fixed left-1/2 top-4 w-[500px] -translate-x-1/2">
		<Alert.Root>
			<Alert.Title>{alertMessage.title}</Alert.Title>
			<Alert.Description>
				{alertMessage.description}
			</Alert.Description>
		</Alert.Root>
	</div>
{/if}
