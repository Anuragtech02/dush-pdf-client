<script lang="ts">
	import SidebarLayout from '$lib/components/layouts/SidebarLayout.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Customers from './components/Customers.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { CalendarIcon, CopyIcon, LoaderCircle } from 'lucide-svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		CalendarDate,
		today
	} from '@internationalized/date';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import * as Select from '$lib/components/ui/select';
	import type { Selected } from 'bits-ui';
	import { createCustomerInternal } from '$lib/api/services-internal';
	import * as Card from '$lib/components/ui/card';
	import customerStore from '$lib/stores/customers.store';

	let name: string = '';
	let username: string = '';
	let expiry: string = '';
	let calendarValue: DateValue | undefined = undefined;
	let selectedRole: Selected<any> = { value: '', label: '' };
	let placeholder: any;
	let isLoading: boolean = false;
	let showSuccess = false;
	let resUser: any;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	async function handleCreateUser() {
		let isValid = false;
		try {
			const res = await createCustomerInternal(expiry, name, username);
			isValid = true;
			resUser = res.data;
			$customerStore = [...$customerStore, resUser];
		} catch (error) {
			console.log('AUTH ERROR: ', error);
			isValid = false;
		}
		isLoading = false;
		return isValid;
	}

	async function onSubmit() {
		if (isLoading) return;
		isLoading = true;
		const isValidCall = await handleCreateUser();
		if (isValidCall) {
			console.log('User Created');
			showSuccess = true;
		} else {
			console.log('User Creation Failed');
		}
	}
</script>

<svelte:head>
	<title>Users | Dush Products</title>
</svelte:head>
<Sheet.Root>
	<SidebarLayout pageTitle="Users">
		<Customers />
		<div slot="actions">
			<Sheet.Trigger>
				<Button>Create New User</Button>
			</Sheet.Trigger>
		</div>
	</SidebarLayout>

	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Create New User</Sheet.Title>
			<Sheet.Description>
				<form on:submit|preventDefault={onSubmit}>
					<div class="grid gap-4">
						<div class="grid gap-1">
							<Label class="sr-only" for="username">Username</Label>
							<Input
								id="name"
								placeholder="Customer Name"
								type="text"
								autocapitalize="none"
								autocomplete="name"
								bind:value={name}
								autocorrect="off"
								disabled={isLoading}
							/>
						</div>
						<div class="grid gap-1">
							<Label class="sr-only" for="password">Password</Label>
							<Input
								id="username"
								placeholder="Username (Optional)"
								type="username"
								autocapitalize="none"
								autocomplete="username"
								autocorrect="off"
								bind:value={username}
								disabled={isLoading}
							/>
						</div>
						<div class="grid gap-1">
							<Popover.Root>
								<Popover.Trigger
									class={cn(
										buttonVariants({ variant: 'outline' }),
										'w-full justify-start pl-4 text-left font-normal',
										!calendarValue && 'text-muted-foreground'
									)}
								>
									{calendarValue
										? df.format(calendarValue.toDate(getLocalTimeZone()))
										: 'Pick expiry date'}
									<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
								</Popover.Trigger>
								<Popover.Content class="w-auto p-0" side="top">
									<Calendar
										bind:value={calendarValue}
										bind:placeholder
										minValue={today(getLocalTimeZone())}
										calendarLabel="Date of birth"
										initialFocus
										onValueChange={(v) => {
											if (v) {
												expiry = v.toDate(getLocalTimeZone()).toISOString();
											} else {
												expiry = '';
											}
										}}
										class="w-full"
									/>
								</Popover.Content>
							</Popover.Root>
						</div>
						<div>
							<Select.Root bind:selected={selectedRole}>
								<Select.Trigger class="w-full">
									<Select.Value placeholder="Select a Role" />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="light">Admin</Select.Item>
									<Select.Item value="dark">Customer</Select.Item>
									<Select.Item value="system">Editor</Select.Item>
								</Select.Content>
							</Select.Root>
						</div>
						<Button type="submit" disabled={isLoading}>
							{#if isLoading}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Submit Details
						</Button>
					</div>
				</form>
				{#if showSuccess && resUser?.username}
					<div><hr /></div>
					<Card.Root class="mt-6 w-full border border-green-600">
						<Card.Title class="p-4">
							<h3 class="text-green-600">
								{resUser?.name}
							</h3>
						</Card.Title>
						<Card.Content class="flex items-center justify-start !p-4">
							<div class="flex w-full flex-col items-center justify-center gap-4">
								<div class="flex w-full items-center justify-between">
									<div class="flex items-center justify-start gap-2">
										<p><strong>Username: </strong></p>
										<p>{resUser?.username}</p>
									</div>
									<Button variant="secondary">
										<CopyIcon class="h-5 w-3" />
									</Button>
								</div>
								<div class="flex w-full items-center justify-between">
									<div class="flex items-center justify-start gap-2">
										<p><strong>Password: </strong></p>
										<p>{resUser?.password}</p>
									</div>
									<Button variant="secondary">
										<CopyIcon class="h-5 w-3" />
									</Button>
								</div>
							</div>
						</Card.Content>
					</Card.Root>
				{/if}
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
