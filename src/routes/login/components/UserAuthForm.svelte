<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { cn } from '$lib/utils.js';
	import { loginUserInternal } from '$lib/api/services-internal';
	import { goto } from '$app/navigation';
	import { toastStore } from '$lib/components/ui/toast/toastMessage.store';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	let username: string = '';
	let password: string = '';

	async function handleLoginCall() {
		let isValid = true;
		try {
			const res = await loginUserInternal(username, password);
		} catch (error) {
			console.log('AUTH ERROR: ', error);
			isValid = false;
		}
		return isValid;
	}

	async function onSubmit() {
		if (isLoading) return;
		if (!username || !password) {
			toastStore.addToast('Please fill in all fields', { type: 'error' });
			return console.log('Please fill in all fields');
		}
		isLoading = true;
		const isValidCall = await handleLoginCall();
		if (isValidCall) {
			const params = new URLSearchParams(window.location.search);
			const redirect = params.get('redirect');

			goto(redirect ? redirect : '/');
		} else {
			console.log('Login Failed');
		}
		isLoading = false;
	}
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
	<form on:submit|preventDefault={onSubmit}>
		<div class="grid gap-2">
			<div class="grid gap-1">
				<Label class="sr-only" for="username">Username</Label>
				<Input
					id="username"
					placeholder="Username"
					type="text"
					required
					autocapitalize="none"
					autocomplete="username"
					bind:value={username}
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<div class="grid gap-1">
				<Label class="sr-only" for="password">Password</Label>
				<Input
					id="password"
					placeholder="********"
					required
					type="password"
					autocapitalize="none"
					autocomplete="password"
					autocorrect="off"
					bind:value={password}
					disabled={isLoading}
				/>
			</div>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Sign In
			</Button>
		</div>
	</form>
	<!-- <div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
		</div>
	</div> -->
	<!-- <Button variant="outline" type="button" disabled={isLoading}>
		{#if isLoading}
			<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
		{:else}
			Nothing
		{/if}
		GitHub
	</Button> -->
</div>
