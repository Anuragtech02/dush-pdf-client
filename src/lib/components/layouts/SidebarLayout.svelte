<script lang="ts">
	import Header from '$lib/components/ui/header/header.svelte';
	import BrandLogo from '../ui/brandLogo/BrandLogo.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { logoutUserInternal } from '$lib/api/services-internal';
	import { toastStore } from '../ui/toast/toastMessage.store';
	import { EPermissions } from '$lib/utils/constants';

	export let pageTitle: string = 'Home';
	export let user: any;

	const AllLinks = [
		{ name: 'Directories', href: '/', requiredPermissions: [EPermissions.READ] },
		{
			name: 'All Files',
			href: '/all-files',
			requiredPermissions: [EPermissions.CREATE, EPermissions.MANAGE]
		},
		{ name: 'Customers', href: '/customers', requiredPermissions: [EPermissions.MANAGE] }
	];

	let links: Array<(typeof AllLinks)[0]> = [];

	user?.attributes?.dush_roles.data.forEach((role: any) => {
		let permission = role.attributes.permission;
		AllLinks.forEach((link) => {
			if (link.requiredPermissions.includes(permission)) {
				links = [...links, link];
			}
		});
	});

	async function doUserLogout() {
		try {
			const res = await logoutUserInternal();
			goto('/login');
		} catch (error) {
			console.log('LOGOUT ERROR: ', error);
			toastStore.addToast('Failed to logout', { type: 'error' });
		}
	}

	function handleClickLogout() {
		doUserLogout();
	}
</script>

<section class="h-screenn flex items-start justify-between">
	<aside
		class="flex h-screen w-[var(--width-sidebar)] flex-col items-center justify-between bg-slate-100"
	>
		<div class="mt-4 w-full">
			<div class="w-full px-4">
				<BrandLogo />
				<hr class="mt-4" />
			</div>
			<div class="px-4">
				<nav class="mt-10 w-full">
					<ul class="w-full space-y-2">
						{#each links as link}
							<li>
								<a
									href={link.href}
									class="sidebar-link"
									class:selected-link={$page.url.pathname === link.href}>{link.name}</a
								>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
		<div
			class="py- flex w-full items-center gap-3 bg-slate-300 px-4 py-3"
			on:click={() => {
				handleClickLogout();
			}}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					handleClickLogout();
				}
			}}
			role="button"
			tabindex="0"
		>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<p>Logout</p>
		</div>
	</aside>
	<main class="container h-full w-[calc(100%-var(--width-sidebar))]">
		<Header {pageTitle}>
			<div slot="actions">
				<slot name="actions" />
			</div>
		</Header>
		<section class="mt-10 h-[calc(100vh-var(--height-header)-100px)] overflow-y-auto">
			<slot />
		</section>
	</main>
</section>

<style>
	:global(:root) {
		--width-sidebar: 250px;
		--height-header: 64px;
	}
	.selected-link {
		@apply bg-primary text-primary-foreground;
	}
	.sidebar-link {
		@apply block w-full rounded-md p-4 transition-all duration-150 ease-in-out hover:bg-primary hover:text-primary-foreground;
	}
</style>
