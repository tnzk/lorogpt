<script lang="ts">
	import { createEventDispatcher, onMount, tick } from 'svelte';

	const dispatch = createEventDispatcher<{ chunk: undefined }>();

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
			tick().then(() => dispatch('chunk'));
		}
	});
</script>

{text}
