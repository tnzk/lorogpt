<script lang="ts">
	import { defaultPizzariaSetting, streamPerParagraph } from '$lib/chat';
	import type { PizzariaSetting } from '$lib/types';
	import { Bird, Settings, User, X } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { tick } from 'svelte';
	import Image from './Image.svelte';
	import PizzariaEditor from './PizzariaEditor.svelte';
	import Spinner from './Spinner.svelte';
	import StreamParagraph from './StreamParagraph.svelte';

	const presetMessages = [
		'Uma pizza de champignon',
		'Uma calabresa sem cebola',
		'Estou em dúvida, me faça uma sugestão',
		'Uma calabresa grande',
		'Duas mussarelas pequenas e uma coca 2 litros',
		'Uma pizza no balcão',
		'O Cardápio por favor',
		'Qual é a pizza do dia?',
		'Quantos pedaços tem a grande?'
	];

	let settingDialog: HTMLDialogElement;
	let scroller: HTMLElement;
	let messageInput: HTMLInputElement;
	let message = '';
	let threadId: string | null = null;
	let thread: { role: string; message: string | Promise<ReadableStream> }[] = [];
	let pizzariaSetting: PizzariaSetting = defaultPizzariaSetting();

	function openSettingDialog() {
		settingDialog.showModal();
	}

	function submitMessage(message: string) {
		thread = [...thread, { role: 'user', message }];
		thread = [...thread, { role: 'assistant', message: sendMessage(message) }];
		tick().then(() => (scroller.scrollTop = scroller.scrollHeight));
	}

	async function sendMessage(message: string) {
		const res = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({ message, threadId, setting: pizzariaSetting })
		});
		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`);
		}
		threadId = res.headers.get('x-loro-thread-id');
		if (res.body) {
			return streamPerParagraph(res.body);
		} else {
			throw new Error('Missing stream');
		}
	}
</script>

{#if thread.length > 0}
	<div class="overflow-hidden mr-16">
		<div bind:this={scroller} class="p-4 h-[400px] overflow-y-auto">
			<div class="grid divide-y">
				{#each thread as item}
					<div class="py-2 flex gap-3">
						<div class="shrink-0">
							<div
								class="flex items-center justify-center w-8 h-8 border border-white rounded-lg text-loro-green-lighter bg-loro-green-light"
								class:bg-loro-green-dark={item.role === 'assistant'}
							>
								{#if item.role === 'assistant'}
									<Icon src={Bird} class="w-6 h-6" />
								{:else}
									<Icon src={User} class="w-6 h-6" />
								{/if}
							</div>
						</div>
						<div class="flex-1 mt-1">
							{#if typeof item.message === 'string'}
								{item.message}
							{:else}
								{#await item.message}
									<Spinner class="w-6 h-6 text-loro-green-lighter fill-white animate-spin" />
								{:then stream}
									<div class="whitespace-pre-wrap">
										<StreamParagraph
											{stream}
											on:chunk={() => (scroller.scrollTop = scroller.scrollHeight)}
										/>
									</div>
								{:catch}
									<span class="text-red-500"> Sorry, the service is temporarily unavailable. </span>
								{/await}
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<div class="flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
	<form
		class="flex-1 relative w-full"
		on:submit|preventDefault={() => {
			submitMessage(message);
			message = '';
		}}
	>
		<input
			bind:this={messageInput}
			type="text"
			bind:value={message}
			placeholder="Faça seu  Pedido de Pizza aqui"
			class="border border-loro-gray-100 rounded-lg w-full h-20 px-3.5 py-4.5 pr-24"
		/>
		<button
			type="submit"
			class="absolute right-3.5 top-3 w-20 h-14 flex items-center justify-center rounded-lg font-semibold text-loro-white bg-[#E03131]"
		>
			Pedir!
		</button>
	</form>

	<button class="w-12 h-12 flex justify-center items-center" on:click={() => openSettingDialog()}>
		<Icon src={Settings} class="w-8 h-8" />
	</button>
</div>

<p class="text-2xl mt-8">Ou clique em um dos prompts abaixo para simula uma interação</p>

<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-7 mt-8">
	{#each presetMessages as preset, i}
		<button
			class="preset-item flex items-center gap-2.5 p-2.5 border rounded-lg text-start"
			on:click={() => {
				submitMessage(preset);
				messageInput.focus();
			}}
		>
			<Image base="/pizza{(i % 5) + 1}" alt="" class="w-[50px]" />
			<span>{preset}</span>
		</button>
	{/each}
</div>

<dialog
	bind:this={settingDialog}
	class="m-0 max-h-none max-w-none bg-transparent backdrop:bg-black backdrop:bg-opacity-50"
>
	<div class=" flex h-dvh w-screen items-center justify-center px-4 sm:px-12 py-12">
		<div class="relative w-full max-w-screen-md h-full bg-white">
			<div class="w-full h-full overflow-y-auto px-4 py-8 sm:px-12 sm:py-12">
				<PizzariaEditor bind:setting={pizzariaSetting} />
			</div>
			<form method="dialog" class="absolute top-0 right-0 m-3">
				<button
					type="submit"
					autofocus
					class="w-12 h-12 inline-flex items-center justify-center rounded-full text-white bg-zinc-700 bg-opacity-40"
					on:click={() => {
						// debug
						console.log(JSON.stringify(pizzariaSetting, undefined, 2));
					}}
				>
					<Icon src={X} class="w-8 h-8" />
				</button>
			</form>
		</div>
	</div>
</dialog>

<style lang="postcss">
	.preset-item {
		&:nth-child(5n + 1) {
			@apply border-[#96F2D7] bg-[#E6FCF5];
		}

		&:nth-child(5n + 2) {
			@apply border-[#D0BFFF] bg-[#F8F0FC];
		}

		&:nth-child(5n + 3) {
			@apply border-[#BAC8FF] bg-[#EDF2FF];
		}

		&:nth-child(5n + 4) {
			@apply border-[#A5D8FF] bg-[#E7F5FF];
		}

		&:nth-child(5n) {
			@apply border-[#FFEC99] bg-[#FFF9DB];
		}
	}
</style>
