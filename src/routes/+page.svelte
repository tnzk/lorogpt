<script lang="ts">
	import { X } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Chat from './Chat.svelte';
	import SubscribeForm from './SubscribeForm.svelte';

	let subscribeDialog: HTMLDialogElement;
</script>

<section class="px-6 py-12 sm:pl-28 sm:pr-80 sm:py-20">
	<div class="w-full max-w-7xl mx-auto">
		<h1>
			<img src="/logo.png" alt="Loro!" class="w-[108px]" />
		</h1>

		<h2 class="font-bold text-4xl mt-10">Automatize o Processo de Vendas de sua pizzaria!</h2>
		<p class="font-light text-2xl mt-2.5">
			Use o Robô Loro e automatize suas vendas pelo WhatsApp com uma linguagem natural e fluída e
			ainda aumente seu fluxo de vendas
		</p>

		<div class="mt-12">
			<Chat />
		</div>
	</div>
</section>

<section class="px-6 py-12 bg-[#FFF9DB] sm:pl-28 sm:pr-80 sm:py-14">
	<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12">
		<div>
			<img src="/icon-bot.png" alt="" class="h-10" />
			<p class="text-[#F08C00] font-bold mt-3.5">Atendimento Instantâneo:</p>
			<p>
				Reponda sempre seus clientes prontamente sem a precisar nenhuma interação humana até o
				checkout.
			</p>
		</div>
		<div>
			<img src="/icon-chart.png" alt="" class="h-10" />
			<p class="text-[#F08C00] font-bold mt-3.5">Atuação humanizada:</p>
			<p>
				A IA não vai ser aquele robô chato e engessado que todo mundo odeia interagir, ele será
				igual ou até melhor do que um atendimento humano
			</p>
		</div>
		<div>
			<img src="/icon-pencil.png" alt="" class="h-10" />
			<p class="text-[#F08C00] font-bold mt-3.5">Cardápio Customizado:</p>
			<p>
				Altamente customizável para o seu negócio, a edição de cardápio e promoções do Loro é
				simples e você já pode simiular AQUI.
			</p>
		</div>
		<div>
			<img src="/icon-tada.png" alt="" class="h-10" />
			<p class="text-[#F08C00] font-bold mt-3.5">Bônus:</p>
			<p>
				Economize com custos operacionais, melhore a acessibilidade e a comunicação e venda mais.
			</p>
		</div>
	</div>
</section>

<section class="px-6 py-12 sm:pl-28 sm:pr-80 sm:pt-4 sm:pb-28">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
		<div>
			<img src="/menu.png" alt="" class="w-full" />
		</div>

		<div class="flex items-center">
			<div>
				<h2 class="text-3xl">
					Benefícios de usar a IA da <span class="font-bold text-[#37B24D]">Loro</span>!
				</h2>

				<ol class="ordered-list grid gap-6 mt-10">
					<li>
						Crie cardápios deliciosos e atraentes em minutos, sem precisar de conhecimentos de
						design.
					</li>
					<li>
						Aumente as vendas e impressione seus clientes com cardápios profissionais criados em
						minutos.
					</li>
					<li>Crie cardápios que dão água na boca e fazem seus clientes voltarem.</li>
					<li>
						Com um valor fixo mensal você pode ter sempre um cardápio novo sem precisar de um
						designer.
					</li>
				</ol>
			</div>
		</div>
	</div>
</section>

<section class="px-6 py-12 bg-[#F3F0FF] sm:pl-28 sm:pr-96 sm:py-20">
	<div class="w-full max-w-2xl">
		<h2 class="font-bold text-3xl text-[#7950F2]">Entre para nossa fila de espera!</h2>
		<p class="font-light text-xl mt-2">
			Em breve teremos uma nova versão, cadastre o seu email no campo abaixo e seja uns dos
			primeiros a receber
		</p>
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

<style lang="postcss">
	.ordered-list {
		counter-reset: ordered-list;

		li {
			counter-increment: ordered-list;
			@apply flex gap-2.5 items-baseline;

			&::before {
				content: counter(ordered-list);
				@apply inline-flex items-center justify-center w-6 h-6 rounded-full text-loro-white bg-[#37B24D] shrink-0;
			}
		}
	}
</style>
