<script context="module" lang="ts">
	const mimeTypes = {
		png: 'image/png',
		jpeg: 'image/jpeg',
		jpg: 'image/jpeg',
		webp: 'image/webp'
	} as const;

	type Type = keyof typeof mimeTypes;
</script>

<script lang="ts">
	export let base: string;
	export let ext: Type | Type[] = ['webp', 'png'];
	export let alt: string = '';
	let className: string = '';
	export { className as class };

	$: extensions = Array.isArray(ext) ? ext : [ext];
	$: defaultExtension = extensions[extensions.length - 1];
</script>

<picture class={className}>
	{#each extensions as extension}
		<source type={mimeTypes[extension]} srcset="{base}.{extension}" />
	{/each}
	<img src="{base}.{defaultExtension}" {alt} class={className} />
</picture>
