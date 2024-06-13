<script lang="ts">
	import BrandLogo from '../brandLogo/BrandLogo.svelte';
	import * as Avatar from '$lib/components/ui/avatar';

	export let pageTitle: string = 'Home';
</script>

<header>
	<div class="flex items-center justify-between py-4">
		<h4>{pageTitle}</h4>
		<!-- <div>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
		</div> -->
	</div>
	<div>
		<hr />
	</div>
</header>
