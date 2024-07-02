<script lang="ts">
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import Spinner from './Spinner.svelte';

	const dispatch = createEventDispatcher<{ chunk: undefined }>();

	export let stream: ReadableStream<string>;

	let paragraphs: string[] = [];
	let streaming: boolean = true;

	onMount(async () => {
		const reader = stream.getReader();
		for (;;) {
			const { value, done } = await reader.read();
			if (done) {
				streaming = false;
				break;
			}
			paragraphs = [...paragraphs, value];
			tick().then(() => dispatch('chunk'));
		}
	});
</script>

<div class="grid gap-2.5">
	{#each paragraphs as paragraph}
		<p>{paragraph}</p>
	{/each}
	{#if streaming}
		<Spinner class="w-6 h-6 text-loro-green-lighter fill-white animate-spin" />
	{/if}
</div>
