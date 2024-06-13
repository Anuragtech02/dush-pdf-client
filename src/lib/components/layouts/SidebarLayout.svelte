<script lang="ts">
	import Header from '$lib/components/ui/header/header.svelte';
	import BrandLogo from '../ui/brandLogo/BrandLogo.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { page } from '$app/stores';

	export let pageTitle: string = 'Home';

	const links = [
		{ name: 'Directories', href: '/' },
		{ name: 'All Files', href: '/all-files' }
	];
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
		<div class="flex w-full items-center justify-center gap-3 bg-slate-300 py-3">
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<p>Logout</p>
		</div>
	</aside>
	<main class="container h-full w-[calc(100%-var(--width-sidebar))]">
		<Header {pageTitle} />
		<section class="mt-10 h-[calc(100vh-var(--height-header))] overflow-y-auto">
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
