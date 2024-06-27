<script lang="ts">
	import { ChevronDown } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Chat from './Chat.svelte';
	import Image from './Image.svelte';
	import SubscribeForm from './SubscribeForm.svelte';

	const faq = [
		{
			q: 'Lorem ipsum dolor sit amet',
			a: 'Nam lorem neque, dictum eu mollis sit amet, luctus eget mi. Phasellus vel leo aliquam, convallis elit ornare, gravida erat. Etiam viverra imperdiet metus, sit amet rutrum orci aliquam at.'
		},
		{
			q: 'Lorem ipsum dolor sit amet',
			a: 'Nam lorem neque, dictum eu mollis sit amet, luctus eget mi. Phasellus vel leo aliquam, convallis elit ornare, gravida erat. Etiam viverra imperdiet metus, sit amet rutrum orci aliquam at.'
		},
		{
			q: 'Lorem ipsum dolor sit amet',
			a: 'Nam lorem neque, dictum eu mollis sit amet, luctus eget mi. Phasellus vel leo aliquam, convallis elit ornare, gravida erat. Etiam viverra imperdiet metus, sit amet rutrum orci aliquam at.'
		},
		{
			q: 'Lorem ipsum dolor sit amet',
			a: 'Nam lorem neque, dictum eu mollis sit amet, luctus eget mi. Phasellus vel leo aliquam, convallis elit ornare, gravida erat. Etiam viverra imperdiet metus, sit amet rutrum orci aliquam at.'
		},
		{
			q: 'Lorem ipsum dolor sit amet',
			a: 'Nam lorem neque, dictum eu mollis sit amet, luctus eget mi. Phasellus vel leo aliquam, convallis elit ornare, gravida erat. Etiam viverra imperdiet metus, sit amet rutrum orci aliquam at.'
		},
		{
			q: 'Lorem ipsum dolor sit amet',
			a: 'Nam lorem neque, dictum eu mollis sit amet, luctus eget mi. Phasellus vel leo aliquam, convallis elit ornare, gravida erat. Etiam viverra imperdiet metus, sit amet rutrum orci aliquam at.'
		}
	];
</script>

<section class="relative px-6 py-12 sm:pl-28 sm:pr-28 md:pr-40 lg:pr-80 sm:py-20">
	<div class="relative w-full max-w-7xl mx-auto z-10">
		<h1>
			<Image base="/logo" alt="Loro!" class="w-[108px]" />
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

	<div class="absolute top-0 right-0 pointer-events-none">
		<Image base="/background" alt="" class="w-[43vw]" />
	</div>
</section>

<section class="px-6 py-12 bg-[#FFF9DB] sm:pl-28 sm:pr-28 xl:pr-80 sm:py-14">
	<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12">
		<div>
			<Image base="/icon-bot" alt="" class="h-10" />
			<p class="text-[#F08C00] font-bold mt-3.5">Atendimento Instantâneo:</p>
			<p>
				Reponda sempre seus clientes prontamente sem a precisar nenhuma interação humana até o
				checkout.
			</p>
		</div>
		<div>
			<Image base="/icon-chart" alt="" class="h-10" />
			<p class="text-[#F08C00] font-bold mt-3.5">Atuação humanizada:</p>
			<p>
				A IA não vai ser aquele robô chato e engessado que todo mundo odeia interagir, ele será
				igual ou até melhor do que um atendimento humano
			</p>
		</div>
		<div>
			<Image base="/icon-pencil" alt="" class="h-10" />
			<p class="text-[#F08C00] font-bold mt-3.5">Cardápio Customizado:</p>
			<p>
				Altamente customizável para o seu negócio, a edição de cardápio e promoções do Loro é
				simples e você já pode simiular AQUI.
			</p>
		</div>
		<div>
			<Image base="/icon-tada" alt="" class="h-10" />
			<p class="text-[#F08C00] font-bold mt-3.5">Bônus:</p>
			<p>
				Economize com custos operacionais, melhore a acessibilidade e a comunicação e venda mais.
			</p>
		</div>
	</div>
</section>

<section class="px-6 py-12 sm:pl-28 sm:pr-28 xl:pr-80 sm:pt-4 sm:pb-28">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-20">
		<div>
			<Image base="/menu" alt="" class="w-full" />
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

<section class="relative px-6 py-12 bg-[#F3F0FF] sm:pl-28 sm:pr-40 md:pr-52 lg:pr-96 sm:py-20">
	<div class="relative z-10">
		<div class="w-full max-w-2xl">
			<h2 class="font-bold text-3xl text-[#7950F2]">Entre para nossa fila de espera!</h2>
			<p class="font-light text-xl mt-2">
				Em breve teremos uma nova versão, cadastre o seu email no campo abaixo e seja uns dos
				primeiros a receber
			</p>
		</div>
		<div class="mt-10">
			<SubscribeForm buttonClass="bg-[#9775FA]" />
		</div>
	</div>
	<div class="absolute -bottom-[15vw] right-0 pointer-events-none">
		<Image base="/pizza-lg" alt="" class="w-[20vw]" />
	</div>
</section>

<section class="px-6 py-12 sm:px-28 sm:py-44">
	<h2 class="text-center text-[#37B24D] text-3xl font-bold">Conheça a nossa ferramenta</h2>
	<p class="text-center text-xl mt-2.5">
		Assista o video abaixo e conheça mais sobre como funciona<br />
		a criação de cardápios com a <span class="font-bold text-[#37B24D]">IA</span> da
		<span class="font-bold text-[#37B24D]">Loro</span>!
	</p>

	<div class="relative mt-10">
		<iframe
			src="https://www.youtube.com/embed/N-EAL5kkYSY?si=hMYkpwxG7BvazJYj"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
			class="aspect-video w-full rounded-xl"
		></iframe>

		<div class="absolute top-full left-2.5 pointer-events-none">
			<Image base="/pizza-slice" alt="" class="w-[25vw]" />
		</div>
	</div>
</section>

<section class="px-6 py-12 bg-[#FAFAFA] sm:px-28 sm:py-28">
	<h2 class="text-3xl font-bold">Perguntas frequentes</h2>
	<div class="grid gap-3.5 mt-10">
		{#each faq as item}
			<details class="group rounded-lg bg-[#F1F3F5] border border-[#E9ECEF]">
				<summary class="px-7 py-4 flex items-center justify-between cursor-pointer">
					<span class="text-xl flex-1">{item.q}</span>
					<div class="group-open:rotate-180 shrink-0">
						<Icon src={ChevronDown} class="text-[#ADB5BD] w-6" />
					</div>
				</summary>
				<div class="px-7 pt-6 pb-4">
					<p class="text-lg">{item.a}</p>
				</div>
			</details>
		{/each}
	</div>
</section>

<footer class="bg-[#FFD8A8]">
	<section class="px-6 pt-12 sm:px-28 sm:pt-32">
		<div class="flex flex-col gap-2.5 md:flex-row md:items-center justify-between">
			<Image base="/logo" alt="Loro!" class="w-[140px] shrink-0" />
			<div class="flex-1 max-w-lg">
				<p class="text-lg">Entre para a lista de espera para versão a premmium</p>
				<div class="mt-3.5">
					<SubscribeForm buttonClass="bg-[#FF922B]" />
				</div>
			</div>
		</div>
		<p class="font-bold text-xl mt-16">
			Utilize nossos prompts prontos abaixo para gerar o seu cardápio
		</p>
		<div
			class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2.5 gap-y-3.5 mt-6"
		>
			{#each Array(6 * 11) as _}
				<div>Texto prompt 1</div>
			{/each}
		</div>
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-20">
			<div class="font-semibold text-lg">Todo o conteúdo e logotipos Copyright © 2024</div>
			<div class="flex items-center gap-1">
				<a href="#" class="flex items-center justify-center w-10 h-10">
					<img src="/icon-facebook.svg" alt="Facebook" />
				</a>
				<a href="#" class="flex items-center justify-center w-10 h-10">
					<img src="/icon-instagram.svg" alt="Instagram" />
				</a>
				<a href="#" class="flex items-center justify-center w-10 h-10">
					<img src="/icon-linkedin.svg" alt="LinkedIn" />
				</a>
				<a href="#" class="flex items-center justify-center w-10 h-10">
					<img src="/icon-twitter.svg" alt="Twitter" />
				</a>
			</div>
		</div>
	</section>
	<div class="mt-14">
		<Image base="/pizzas" alt="" class="w-full" />
	</div>
</footer>

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
