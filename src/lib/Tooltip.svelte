<script lang="ts">
	import { fade } from 'svelte/transition';

	export let text: string;

	let hover = false;
</script>

<div class="relative">
	<div
		role="presentation"
		on:mouseenter={() => (hover = true)}
		on:mouseleave={() => (hover = false)}
	>
		<slot />
	</div>

	{#if hover}
		<div
			class="absolute bottom-full left-1/2 -translate-x-1/2 p-2"
			transition:fade={{ duration: 200 }}
		>
			<div class="relative bg-gray-600 text-white rounded-lg px-2 py-0.5 whitespace-nowrap">
				{text}

				<!-- arrow -->
				<div
					class="absolute w-2 h-2 bg-gray-600 rotate-45 top-full left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
				/>
			</div>
		</div>
	{/if}
</div>
