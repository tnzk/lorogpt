<script lang="ts">
	import { ChevronDown } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Chat from './Chat.svelte';
	import Image from './Image.svelte';
	import SubscribeForm from './SubscribeForm.svelte';

	const faq = [
		{
			q: 'Como funciona o Loro?',
			a: 'O Loro é uma inteligência artificial treinada com a tecnologia mais avançado do mercado suficiente para atingir a qualidade de uma interação semelhante a um ser humano não mais limitado por robôs pré fabricados e com opções pré fabricadas. A partir desta inteligência artificial o Loro é alimentado com um cardápio desenvolvido para que a inteligência tenha a melhor compreensão possível dos preços, sabores e ingredientes.'
		},
		{
			q: 'Como está o desenvolvimento da ferramenta?',
			a: 'Hoje o Loro está em estágio avançado de desenvolvimento, estamos realizando os testes reais e passando para a comunicação de aplicativos (API) e o painel de controle da pizzaria'
		},
		{
			q: 'Como o usuário irá interagir com o Loro?',
			a: 'Sabemos que o WhatsApp hoje é uma das principais ferramentas de comunicação mas que ao mesmo tempo pelas interações dos usuários. Pensando nisso o Loro será compatível com a plataforma permitindo que todo o fluxo de diálogo seja realizado pelo aplicativo.'
		},
		{
			q: 'Quanto custará o Loro?',
			a: 'O Loro será uma SaaS - Software como um serviço, desta forma haverá um plano com valor fixo para disponibiliza-lo para as pizzarias usuárias do sistema.'
		},
		{
			q: 'Até que ponto o robô é automatizado?',
			a: 'O robô irá cuidar de todo o processo de interação com o usuário no pedido da Pizzaria, incluindo a parte financeira e no futuro até mesmo acompanhamento do pedido, entrega e satisfação do usuário.'
		},
		{
			q: 'E se houver algum problema na interação com o usuário?',
			a: 'O nosso robô será preparado para detectar sentimentos negativos e reclamações. Caso isso aconteça na sua pizzaria um alerta será emitido para o gestor do estabelecimento tomar as medidas necessárias e o atendimento passará a ser humanizado neste chat específico.'
		}
	];

	let toastMessage: string = '';
	let toastTimer: ReturnType<typeof setTimeout>;

	function showToast(message: string) {
		toastMessage = message;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => {
			toastMessage = '';
		}, 5000);
	}
</script>

<section class="relative px-6 py-12 sm:pl-28 sm:pr-28 md:pr-40 lg:pr-80 sm:pt-17.5 sm:pb-20">
	<div class="relative w-full max-w-7xl mx-auto z-10">
		<h1>
			<Image base="/logo" alt="Loro!" class="w-[108px]" />
		</h1>

		<h2 class="font-bold text-4.5xl mt-10">Automatize o Processo de Vendas de sua pizzaria!</h2>
		<p class="font-light text-1.5xl mt-2.5">
			Use o <span class="font-medium">LoroGPT</span> e automatize suas vendas pelo WhatsApp com uma linguagem
			natural e fluída e ainda aumente seu fluxo de vendas. Experimente agora mesmo e comece a vender
			mais.
		</p>

		<div class="mt-12">
			<Chat on:updateMenuSetting={() => showToast('O cardápio foi alterado')} />
		</div>
	</div>

	<div class="absolute top-0 right-0 pointer-events-none">
		<Image base="/background" alt="" class="w-[62vw] max-w-[900px] min-w-[320px]" />
	</div>
</section>

<section class="px-6 py-12 bg-[#FFF9DB] sm:px-28 sm:py-17.5">
	<h2 class="font-bold text-1.5xl">Benefícios do LoroGPT</h2>

	<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-20 gap-y-10 mt-6">
		<div>
			<div class="w-10 h-10 flex items-center justify-center">
				<img src="/icon-bot.svg" alt="" />
			</div>
			<p class="text-[#F08C00] font-bold mt-3.5">Atendimento Instantâneo:</p>
			<p>
				Responda sempre seus clientes prontamente sem a precisar nenhuma interação humana até o
				checkout.
			</p>
		</div>
		<div>
			<div class="w-10 h-10 flex items-center justify-center">
				<img src="/icon-bird.svg" alt="" />
			</div>
			<p class="text-[#F08C00] font-bold mt-3.5">Atuação humanizada:</p>
			<p>
				A IA não será como aqueles robôs chatos e repetitivos que encontramos em alguns sites. Ela
				será capaz de ter conversas naturais e fluidas, como se estivesse falando com um atendente
				real.
			</p>
		</div>
		<div>
			<div class="w-10 h-10 flex items-center justify-center">
				<img src="/icon-pencil.svg" alt="" />
			</div>
			<p class="text-[#F08C00] font-bold mt-3.5">Cardápio Customizado:</p>
			<p>
				Altamente customizável para o seu negócio, a edição de cardápio e promoções do Loro é
				simples e você já pode simular <span class="font-bold">AQUI</span>.
			</p>
		</div>
		<div>
			<div class="w-10 h-10 flex items-center justify-center">
				<img src="/icon-chart.svg" alt="" />
			</div>
			<p class="text-[#F08C00] font-bold mt-3.5">Pedidos sob controle:</p>
			<p>
				Confirme e acompanhe tudo em um só lugar, utilizando nosso sistema de pedidos, otimizando a
				gestão do seu delivery.
			</p>
		</div>
	</div>
</section>

<section class="px-6 py-12 sm:px-28 sm:pt-17.5 sm:pb-44">
	<h2 class="text-center text-[#37B24D] text-3.5xl font-bold">Conheça mais sobre LoroGPT</h2>
	<p class="text-center text-xl mt-2.5">
		Assista o video abaixo e conheça mais sobre como funciona a criação de cardápios com a <span
			class="font-bold text-[#37B24D]">IA</span
		>
		da
		<span class="font-bold text-[#37B24D]">Loro</span>!
	</p>

	<div class="relative mt-10">
		<iframe
			src="https://www.youtube.com/embed/EK_WWVomeoY?si=Xfk8UC3o1r5fa-KS"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
			class="aspect-video w-full rounded-xl"
		></iframe>

		<div class="absolute top-full left-2.5 pointer-events-none z-10">
			<Image base="/pizza-slice" alt="" class="w-[25vw]" />
		</div>
	</div>
</section>

<section class="relative px-6 py-12 bg-[#F3F0FF] sm:pl-28 sm:pr-40 md:pr-52 lg:pr-96 sm:py-20">
	<div class="relative z-10">
		<div class="w-full max-w-2xl">
			<h2 class="font-bold text-3.5xl text-[#7950F2]">Entre para nossa fila de espera!</h2>
			<p class="font-light text-1.5xl mt-2">
				Em breve teremos uma nova versão, cadastre o seu email no campo abaixo e seja uns dos
				primeiros a receber.
			</p>
		</div>
		<div class="mt-10">
			<SubscribeForm buttonClass="bg-[#9775FA]" />
		</div>
	</div>
	<div class="absolute -bottom-[9vw] right-0 pointer-events-none">
		<Image base="/pizza-lg" alt="" class="w-[18vw]" />
	</div>
</section>

<section class="px-6 py-12 bg-[#FAFAFA] sm:px-28 sm:py-17.5">
	<h2 class="text-3xl font-bold">Perguntas frequentes</h2>
	<div class="relative z-10 grid gap-3.5 mt-10">
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
				<p class="text-lg">Entre para a lista de espera</p>
				<div class="mt-3.5">
					<SubscribeForm buttonClass="bg-[#FF922B]" />
				</div>
			</div>
		</div>
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-17.5">
			<div class="font-semibold sm:text-lg">
				Todo o conteúdo e logotipos Copyright © 2024<br />
				Lztec Sistemas CNPJ 29.345.688/0001-23
			</div>
			<div class="flex items-center gap-1">
				<a href="#" class="flex items-center justify-center w-10 h-10">
					<img src="/icon-mail.svg" alt="Email" />
				</a>
				<a href="#" class="flex items-center justify-center w-10 h-10">
					<img src="/icon-whatsapp.svg" alt="WhatsApp" />
				</a>
			</div>
		</div>
	</section>
	<div class="mt-14">
		<Image base="/pizzas" alt="" class="w-full" />
	</div>
</footer>

{#if toastMessage}
	<div class="fixed top-0 w-full p-10 flex justify-center pointer-events-none z-20">
		<div class="pointer-events-auto px-5 py-3 bg-[#37B24D] text-white text-lg shadow-lg">
			{toastMessage}
		</div>
	</div>
{/if}

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
