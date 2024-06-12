<script lang="ts">
	import BrandLogo from '../brandLogo/BrandLogo.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
</script>

<header>
	<div class="container flex items-center justify-between py-4">
		<BrandLogo />
		<div>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
		</div>
	</div>
	<div class="container">
		<hr />
	</div>
</header>
