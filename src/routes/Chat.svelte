<script lang="ts">
	import type { PizzariaSetting } from '$lib/types';
	import { Bird, User, X } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { tick } from 'svelte';
	import PizzariaEditor from './PizzariaEditor.svelte';
	import Spinner from './Spinner.svelte';
	import StreamText from './StreamText.svelte';

	const exampleMessages = [
		{
			heading: 'Uma pizza calabresa',
			subheading: 'Calabresa',
			message: 'Uma pizza calabresa por favor'
		},
		{
			heading: 'Quantas fatias vem na pizza média?',
			subheading: 'Quantidade de Fatias',
			message: 'Quantas fatias vem na pizza média?'
		},
		{
			heading: 'Uma pizza gigante no balcão',
			subheading: 'Gigante',
			message: 'Uma pizza gigante no balcão'
		},
		{
			heading: 'Uma portuguesa sem cebola',
			subheading: 'Ingredientes',
			message: 'Uma portuguesa sem cebola por favor'
		}
	];

	let settingDialog: HTMLDialogElement;
	let scroller: HTMLElement;
	let prompt = '';
	let threadId: string | null = null;
	let thread: { role: string; message: string | Promise<ReadableStream> }[] = [];
	let pizzariaSetting: PizzariaSetting = {
		pizzaria_name: "Luigi's",
		sizes: [
			{
				name: 'Small',
				max_flavors: 1
			},
			{
				name: 'Medium',
				max_flavors: 2
			},
			{
				name: 'Large',
				max_flavors: 3
			}
		],
		flavors: [
			{
				name: 'Margherita',
				ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Basil'],
				price: {
					Small: 40.0,
					Medium: 50.0,
					Large: 70.0
				}
			},
			{
				name: 'Pepperoni',
				ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Pepperoni'],
				price: {
					Small: 40.0,
					Medium: 50.0,
					Large: 70.0
				}
			},
			{
				name: 'Four Cheese',
				ingredients: [
					'Tomato Sauce',
					'Mozzarella Cheese',
					'Parmesan Cheese',
					'Gorgonzola Cheese',
					'Provolone Cheese'
				],
				price: {
					Small: 45.0,
					Medium: 55.0,
					Large: 75.0
				}
			},
			{
				name: 'Chicken with Catupiry',
				ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Shredded Chicken', 'Catupiry Cheese'],
				price: {
					Small: 50.0,
					Medium: 60.0,
					Large: 80.0
				}
			},
			{
				name: 'Calabrese',
				ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Calabrese Sausage', 'Onions'],
				price: {
					Small: 55.0,
					Medium: 65.0,
					Large: 85.0
				}
			},
			{
				name: 'Portuguese',
				ingredients: [
					'Tomato Sauce',
					'Mozzarella Cheese',
					'Ham',
					'Onions',
					'Boiled Eggs',
					'Green Peas',
					'Olives'
				],
				price: {
					Small: 60.0,
					Medium: 70.0,
					Large: 90.0
				}
			}
		],
		stuffed_crust: 5.0,
		soft_drinks: [
			{
				name: 'Coca-Cola',
				price: 15.0
			},
			{
				name: 'Guaraná Antarctica',
				price: 15.0
			},
			{
				name: 'Fanta Orange',
				price: 15.0
			},
			{
				name: 'Sprite',
				price: 15.0
			}
		]
	};

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
			const decoder = new TextDecoder();
			return res.body.pipeThrough(
				new TransformStream<Uint8Array, string>({
					transform(chunk, controller) {
						controller.enqueue(decoder.decode(chunk));
					}
				})
			);
		} else {
			throw new Error('Missing stream');
		}
	}
</script>

<div class="w-full flex gap-2">
	<div class="shrink-0">
		<button on:click={() => openSettingDialog()}>
			<!-- Lucide settings -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="w-8 h-8"
				><path
					d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
				/><circle cx="12" cy="12" r="3" /></svg
			>
		</button>
	</div>
	<div class="flex-1">
		<div class="bg-loro-green text-loro-green-lighter rounded-3xl w-full max-w-96 h-[450px]">
			<div class="h-full grid auto-rows-[auto_max-content] gap-3 p-4">
				{#if thread.length > 0}
					<div bind:this={scroller} class="h-full overflow-y-auto">
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
													<StreamText
														{stream}
														on:chunk={() => (scroller.scrollTop = scroller.scrollHeight)}
													/>
												</div>
											{:catch}
												<span class="text-red-500">
													Sorry, the service is temporarily unavailable.
												</span>
											{/await}
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{:else}
					<div class="h-full grid auto-rows-[max-content_auto] gap-3">
						<div
							class="text-center py-1 border border-white rounded-lg font-bold bg-loro-green-light"
						>
							Make your Pizza Order here!
						</div>

						<div>
							<div class="h-full flex flex-col justify-end">
								<div class="grid grid-cols-2 gap-3">
									{#each exampleMessages as item}
										<button
											class="flex flex-col items-start text-start cursor-pointer rounded-lg border border-white p-4 bg-loro-green-light"
											on:click={() => submitMessage(item.message)}
										>
											<div class="text-sm font-bold">{item.heading}</div>
											<div class="text-sm text-loro-green-lighter text-opacity-75">
												{item.subheading}
											</div>
										</button>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/if}
				<form
					on:submit|preventDefault={() => {
						submitMessage(prompt);
						prompt = '';
					}}
				>
					<div class="relative">
						<input
							type="text"
							bind:value={prompt}
							placeholder="Try now!"
							class="border border-white w-full h-11 p-2 pr-11 rounded-md bg-loro-green-light placeholder-loro-green-lighter"
						/>
						<button
							type="submit"
							class="absolute right-2 top-2 w-7 h-7 flex items-center justify-center rounded-md text-loro-green-lighter bg-loro-green"
						>
							<!-- Lucide corner-down-left-->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="w-5 h-5"
								><polyline points="9 10 4 15 9 20" /><path d="M20 4v7a4 4 0 0 1-4 4H4" /></svg
							>
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
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
