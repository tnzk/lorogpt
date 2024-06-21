<script context="module" lang="ts">
	export type PizzariaSetting = {
		pizzaria_name: string;
		sizes: {
			name: string;
			max_flavors: number;
		}[];
		flavors: {
			name: string;
			ingredients: string[];
			price: Record<string, number>;
		}[];
		stuffed_crust: number;
		soft_drinks: {
			name: string;
			price: number;
		}[];
	};
</script>

<script lang="ts">
	import { X } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let setting: PizzariaSetting;
</script>

<label class="form-control">
	<div class="label">Pizzaria name</div>
	<input type="text" bind:value={setting.pizzaria_name} class="input" />
</label>

<div class="form-control">
	<div class="label">Sizes</div>
	{#if setting.sizes.length > 0}
		<div class="table-container">
			<table class="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Max flavors</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each setting.sizes as _, i}
						<tr>
							<td>
								<input type="text" bind:value={setting.sizes[i].name} class="input w-full" />
							</td>
							<td>
								<input
									type="number"
									bind:value={setting.sizes[i].max_flavors}
									class="input w-full"
								/>
							</td>
							<td>
								<button
									class="btn btn-square text-red-500"
									on:click={() => {
										setting.sizes.splice(i, 1);
										setting.sizes = setting.sizes;
									}}
								>
									<Icon src={X} class="w-4 h-4" />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	<button
		class="btn btn-default text-blue-600 mt-1"
		on:click={() => (setting.sizes = [...setting.sizes, { name: '', max_flavors: 0 }])}
	>
		Add size
	</button>
</div>

<div class="form-control">
	<div class="label">Flavors</div>
	{#if setting.flavors.length > 0}
		<div class="table-container">
			<table class="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Ingredients</th>
						<th>Prices</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each setting.flavors as _, i}
						<tr>
							<td>
								<input
									type="text"
									bind:value={setting.flavors[i].name}
									class="input w-full min-w-40"
								/>
							</td>
							<td>
								<div class="grid gap-1">
									{#each setting.flavors[i].ingredients as _, j}
										<div class="flex items-center">
											<input
												type="text"
												bind:value={setting.flavors[i].ingredients[j]}
												class="input flex-1"
											/>
											<button
												class="btn btn-square text-red-500"
												on:click={() => {
													setting.flavors[i].ingredients.splice(j, 1);
													setting.flavors[i].ingredients = setting.flavors[i].ingredients;
												}}
											>
												<Icon src={X} class="w-4 h-4" />
											</button>
										</div>
									{/each}
									<div>
										<button
											class="btn btn-default text-blue-600"
											on:click={() =>
												(setting.flavors[i].ingredients = [...setting.flavors[i].ingredients, ''])}
										>
											Add ingredient
										</button>
									</div>
								</div>
							</td>
							<td>
								<div class="grid gap-1">
									{#each setting.sizes as size}
										<label class="flex items-center">
											<span>{size.name}:</span>
											<input
												type="number"
												bind:value={setting.flavors[i].price[size.name]}
												class="input w-20"
											/>
										</label>
									{/each}
								</div>
							</td>
							<td>
								<button
									class="btn btn-square text-red-500"
									on:click={() => {
										setting.flavors.splice(i, 1);
										setting.flavors = setting.flavors;
									}}
								>
									<Icon src={X} class="w-4 h-4" />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	<button
		class="btn btn-default text-blue-600 mt-1"
		on:click={() =>
			(setting.flavors = [...setting.flavors, { name: '', ingredients: [], price: {} }])}
	>
		Add flavor
	</button>
</div>

<label class="form-control">
	<div class="label">Stuffed crust</div>
	<input type="number" bind:value={setting.stuffed_crust} class="input" />
</label>

<div class="form-control">
	<div class="label">Soft drinks</div>
	{#if setting.soft_drinks.length > 0}
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each setting.soft_drinks as _, i}
					<tr>
						<td>
							<input type="text" bind:value={setting.soft_drinks[i].name} class="input w-full" />
						</td>
						<td>
							<input type="number" bind:value={setting.soft_drinks[i].price} class="input w-full" />
						</td>
						<td>
							<button
								class="btn btn-square text-red-500"
								on:click={() => {
									setting.soft_drinks.splice(i, 1);
									setting.soft_drinks = setting.soft_drinks;
								}}
							>
								<Icon src={X} class="w-4 h-4" />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
	<button
		class="btn btn-default text-blue-600 mt-1"
		on:click={() => (setting.soft_drinks = [...setting.soft_drinks, { name: '', price: 0 }])}
	>
		Add soft drink
	</button>
</div>

<style lang="postcss">
	.form-control {
		@apply my-8;
	}

	.label {
		@apply font-bold text-lg mb-2;
	}

	.input {
		@apply px-2 py-1.5 border rounded-md;
	}

	.btn {
		@apply inline-flex justify-center items-center h-9 rounded-lg hover:bg-zinc-100;

		&-default {
			@apply px-4 border;
		}

		&-square {
			@apply w-10;
		}
	}

	.table {
		@apply w-full;

		th,
		td {
			@apply py-1 border-b align-top;
		}

		th {
			@apply text-sm text-zinc-500 bg-zinc-50;
		}
	}

	.table-container {
		@apply w-full overflow-x-auto;
	}
</style>
