<script lang="ts">
	import { defaultPizzariaSetting, streamPerParagraph } from '$lib/chat';
	import type { PizzaMenuSetting } from '$lib/menu';
	import Tooltip from '$lib/Tooltip.svelte';
	import { X } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createEventDispatcher, tick } from 'svelte';
	import Image from './Image.svelte';
	import MenuBuilder from './MenuBuilder.svelte';
	import Spinner from './Spinner.svelte';
	import StreamParagraph from './StreamParagraph.svelte';

	const dispatch = createEventDispatcher<{ updateMenuSetting: PizzaMenuSetting }>();

	const presetMessages = [
		'Uma pizza de champignon',
		'Uma calabresa sem cebola',
		'Estou em dúvida, me faça uma sugestão',
		'Uma calabresa grande',
		'Duas margueritas pequenas e uma coca ',
		'Uma pizza no balcão',
		'O Cardápio por favor',
		'Qual valor da Portuguesa?',
		'Quantos pedaços tem a grande?'
	];

	let container: HTMLElement;
	let settingDialog: HTMLDialogElement;
	let scroller: HTMLElement;
	let messageInput: HTMLInputElement;
	let message = '';
	let threadId: string | null = null;
	let thread: { role: string; message: string | Promise<ReadableStream> }[] = [];
	let pizzariaSetting: PizzaMenuSetting = defaultPizzariaSetting();

	function openSettingDialog() {
		settingDialog.showModal();
	}

	function submitMessage(message: string) {
		thread = [...thread, { role: 'user', message }];
		thread = [...thread, { role: 'assistant', message: sendMessage(message) }];
		tick().then(() => (scroller.scrollTop = scroller.scrollHeight));
	}

	function selectPreset(message: string) {
		submitMessage(message);
		const { top: bodyTop } = document.body.getBoundingClientRect();
		const { top } = container.getBoundingClientRect();
		window.scrollTo({ top: top - bodyTop, behavior: 'smooth' });
		messageInput.focus();
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

<div bind:this={container} class="p-5 bg-[#F8F9FA]">
	{#if thread.length > 0}
		<div class="overflow-hidden w-full">
			<div bind:this={scroller} class="p-4 h-[580px] overflow-y-auto">
				<div class="grid gap-8">
					{#each thread as item}
						<div class="flex gap-3.5">
							<div class="shrink-0">
								{#if item.role === 'assistant'}
									<img src="/chat-assistant.svg" alt="" class="w-9" />
								{:else}
									<img src="/chat-user.svg" alt="" class="w-9" />
								{/if}
							</div>
							<div class="flex-1">
								<div class="font-bold mb-1.5">
									{#if item.role === 'assistant'}
										Loro
									{:else}
										Você
									{/if}
								</div>
								<div class="font-light text-sm mt-1.5">
									{#if typeof item.message === 'string'}
										{item.message}
									{:else}
										{#await item.message}
											<Spinner
												class="w-5 h-5 text-loro-green-lighter fill-[#37B24D] animate-spin"
											/>
										{:then stream}
											<div class="whitespace-pre-wrap">
												<StreamParagraph
													{stream}
													on:chunk={() => (scroller.scrollTop = scroller.scrollHeight)}
												/>
											</div>
										{:catch e}
											<span class="text-red-500">
												{#if e.message.startsWith('429')}
													<!-- Sorry, you have reached the usage limit. -->
													Desculpe, você atingiu o limite de uso.
												{:else}
													<!-- Sorry, the service is temporarily unavailable. -->
													Desculpe, o serviço está temporariamente indisponível.
												{/if}
											</span>
										{/await}
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div class="mb-10 w-full max-w-2xl">
			<h2 class="font-bold text-xl">Experimente o LoroGPT</h2>
			<p class="mt-2">
				Simule um pedido com a nossa ferramenta, utilize ela com as configurações pré estabelecidas
				ou configure você mesmo clicando no ícone de engrenagem.
			</p>
		</div>
	{/if}

	<div class="flex flex-col sm:flex-row items-end sm:items-start gap-3 p-5 bg-loro-white">
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
				placeholder="Faça seu pedido aqui!"
				class="border border-loro-gray-100 rounded-lg w-full h-20 px-3.5 py-4.5 pr-24"
			/>
			<button
				type="submit"
				class="absolute right-3.5 top-3 w-20 h-14 flex items-center justify-center rounded-lg font-semibold text-loro-white bg-[#E03131]"
			>
				Pedir!
			</button>
		</form>

		<Tooltip text="Altere sua configuração aqui">
			<button class="w-8 h-8 flex justify-center items-center" on:click={() => openSettingDialog()}>
				<img src="/icon-setting.svg" alt="" class="w-[26px]" />
			</button>
		</Tooltip>
	</div>
</div>

<p class="font-semibold text-lg mt-8">
	Ou clique em um dos prompts abaixo para simular uma interação
</p>

<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-7 mt-8">
	{#each presetMessages as preset, i}
		<button
			class="preset-item flex items-center gap-2.5 p-2.5 border rounded-lg text-start"
			on:click={() => selectPreset(preset)}
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
				<MenuBuilder bind:setting={pizzariaSetting} />
			</div>
			<form method="dialog" class="absolute top-0 right-0 m-3">
				<button
					type="submit"
					autofocus
					class="w-12 h-12 inline-flex items-center justify-center rounded-full text-white bg-zinc-700 bg-opacity-40"
					on:click={() => {
						// debug
						console.log(JSON.stringify(pizzariaSetting, undefined, 2));
						dispatch('updateMenuSetting', pizzariaSetting);
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
