<script lang="ts">
	import { parseParagraph } from '$lib/chat';
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
		{#each parseParagraph(paragraph) as token}
			{#if token.type === 'paragraph'}
				<div class="prose prose-sm">{@html token.html}</div>
			{:else if token.type === 'menu'}
				<a href="/menu.pdf" target="_blank" class="text-[#37B24D] underline">menu de download</a>
			{/if}
		{/each}
	{/each}
	{#if streaming}
		<Spinner class="w-5 h-5 text-loro-green-lighter fill-[#37B24D] animate-spin" />
	{/if}
</div>
