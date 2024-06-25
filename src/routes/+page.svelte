<script lang="ts">
	import { X } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Chat from './Chat.svelte';
	import SubscribeForm from './SubscribeForm.svelte';

	let subscribeDialog: HTMLDialogElement;
</script>

<header class="px-4 py-4 bg-loro-green-lighter">
	<h1 class="text-xl">Loro</h1>
</header>

<section class="px-4 py-8">
	<div class="mx-auto w-full max-w-screen-md">
		<h2 class="text-lg">Welcome to Loro GPT, your Pizza Order Assistant</h2>
		<p>
			I will be your assistant for placing an order at Luigi’s Pizzeria. You can talk to me and also
			customize your pizzeria's menu, prices, and order rules according to your needs.
		</p>
		<p>Use the interactive menu table to edit according to your pizzeria's requirements.</p>
	</div>

	<div class="flex flex-col sm:flex-row-reverse gap-6 mx-auto w-full max-w-screen-lg mt-8">
		<div class="flex-1 flex justify-center">
			<Chat />
		</div>

		<div class="flex-1 flex justify-center items-center">
			<div class="w-full text-center bg-gray-100 py-1">
				<button class="underline" on:click={() => subscribeDialog.showModal()}
					>Join Waiting List</button
				>
			</div>
		</div>
	</div>
</section>

<section class="px-4 py-8">
	<div class="mx-auto w-full max-w-screen-md">
		<p>We are a startup company focus on automated sales in Pizza Business ....</p>
		<p>Check how it works ...</p>

		<div class="flex justify-center">
			<iframe
				src="https://www.youtube.com/embed/N-EAL5kkYSY?si=hMYkpwxG7BvazJYj"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
				class="aspect-video w-full max-w-screen-sm"
			></iframe>
		</div>
	</div>
</section>

<dialog
	bind:this={subscribeDialog}
	class="m-0 max-h-none max-w-none bg-transparent backdrop:bg-black backdrop:bg-opacity-50"
>
	<div class="flex h-dvh w-screen items-center justify-center px-4 sm:px-12 py-12">
		<div class="relative w-full max-w-xl bg-white">
			<SubscribeForm />

			<form method="dialog" class="absolute right-0 top-0">
				<button autofocus type="submit">
					<Icon src={X} class="w-12 h-12" />
				</button>
			</form>
		</div>
	</div>
</dialog>
