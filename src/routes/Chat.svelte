<script lang="ts">
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
	let prompt = '';
	let thread: { role: string; message: string | Promise<ReadableStream> }[] = [];

	function openSettingDialog() {
		settingDialog.showModal();
	}

	function submitMessage(message: string) {
		thread = [...thread, { role: 'user', message }];

		// TODO: Call API
		async function dummyMessage() {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return new ReadableStream<string>({
				async start(controller) {
					const message =
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
					for (const chunk of message.split(' ')) {
						controller.enqueue(chunk + ' ');
						await new Promise((resolve) => setTimeout(resolve, 100));
					}
					controller.close();
				}
			});
		}
		thread = [...thread, { role: 'assistant', message: dummyMessage() }];
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
					<div class="h-full overflow-y-auto">
						<div class="grid divide-y">
							{#each thread as item}
								<div class="py-2 flex gap-3">
									<div class="shrink-0">
										<div
											class="flex items-center justify-center w-8 h-8 border border-white rounded-lg text-loro-green-lighter bg-loro-green-light"
											class:bg-loro-green-dark={item.role === 'assistant'}
										>
											{#if item.role === 'assistant'}
												<!-- Lucide bird -->
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
													class="w-6 h-6"
													><path d="M16 7h.01" /><path
														d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"
													/><path d="m20 7 2 .5-2 .5" /><path d="M10 18v3" /><path
														d="M14 17.75V21"
													/><path d="M7 18a6 6 0 0 0 3.84-10.61" /></svg
												>
											{:else}
												<!-- Lucide user -->
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
													class="w-6 h-6"
													><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle
														cx="12"
														cy="7"
														r="4"
													/></svg
												>
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
												<StreamText {stream} />
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
	<div class="flex h-dvh w-screen items-center justify-center p-12">
		<div class="w-full max-w-screen-md bg-white p-12">
			<table class="table">
				<thead>
					<tr>
						<th>Pizzeria Name</th>
						<th>Flavours</th>
						<th>Igredients</th>
						<th>Sizes</th>
						<th>Prices</th>
						<th>Delivery Prices</th>
						<th>Extras</th>
					</tr>
				</thead>
				<tbody>
					{#each Array(3) as _}
						<tr>
							<td>Pizzeria Name</td>
							<td>Flavours</td>
							<td>Igredients</td>
							<td>Sizes</td>
							<td>Prices</td>
							<td>Delivery Prices</td>
							<td>Extras</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<form method="dialog" class="flex justify-center mt-6">
				<button type="submit" class="px-2 py-1 rounded-md border">Close</button>
			</form>
		</div>
	</div>
</dialog>

<style lang="postcss">
	.table {
		@apply w-full;

		th,
		td {
			@apply p-2;
		}

		th {
			@apply text-zinc-400 font-bold bg-zinc-100;
		}

		td {
			@apply border-b;
		}
	}
</style>
