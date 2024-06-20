<script lang="ts">
	import { onMount } from 'svelte';

	export let stream: ReadableStream<string>;

	let text = '';

	onMount(async () => {
		const reader = stream.getReader();
		for (;;) {
			const { value, done } = await reader.read();
			if (done) {
				break;
			}
			text += value;
		}
	});
</script>

{text}
