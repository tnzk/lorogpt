import type { PizzaMenuSetting } from './menu';

export type Token = { type: 'paragraph'; text: string } | { type: 'menu' };

export const defaultPizzariaSetting = (): PizzaMenuSetting => ({
	sizes: [
		{
			name: 'Pequena',
			max_flavors: 1,
			slices: 2,
			serves_how_many_people: 1
		},
		{
			name: 'Média',
			max_flavors: 2,
			slices: 4,
			serves_how_many_people: 2
		},
		{
			name: 'Grande',
			max_flavors: 3,
			slices: 8,
			serves_how_many_people: 4
		}
	],
	flavors: [
		{
			name: 'Margherita',
			ingredients: ['Molho de Tomate', 'Queijo Mussarela', 'Manjericão'],
			price: {
				Pequena: 40.0,
				Média: 50.0,
				Grande: 70.0
			}
		},
		{
			name: 'Quatro Queijos',
			ingredients: [
				'Molho de Tomate',
				'Queijo Mussarela',
				'Queijo Parmesão',
				'Queijo Gorgonzola',
				'Queijo Provolone'
			],
			price: {
				Pequena: 45.0,
				Média: 55.0,
				Grande: 75.0
			}
		},
		{
			name: 'Champignon',
			ingredients: ['Molho de Tomate', 'Queijo', 'Champignon', 'Pimentão'],
			price: {
				Pequena: 50.0,
				Média: 60.0,
				Grande: 80.0
			}
		},
		{
			name: 'Calabresa',
			ingredients: ['Molho de Tomate', 'Queijo Mussarela', 'Linguiça Calabresa', 'Cebolas'],
			price: {
				Pequena: 55.0,
				Média: 65.0,
				Grande: 85.0
			}
		},
		{
			name: 'Portuguesa',
			ingredients: [
				'Molho de Tomate',
				'Queijo Mussarela',
				'Presunto',
				'Cebolas',
				'Ovos Cozidos',
				'Ervilhas',
				'Azeitonas'
			],
			price: {
				Pequena: 60.0,
				Média: 70.0,
				Grande: 90.0
			}
		},
		{
			name: 'Vegetariana',
			ingredients: ['Ervilhas', 'Brócolis', 'Rúcula'],
			price: {
				Pequena: 40.0,
				Média: 50.0,
				Grande: 60.0
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
});

export function streamPerParagraph(stream: ReadableStream<Uint8Array>): ReadableStream<string> {
	return stream
		.pipeThrough(createUint8ToStringTransformer())
		.pipeThrough(createStringToParagraphTransformer())
		.pipeThrough(createDelayTransformer(1500)); // To put in a human-like delay.
}

function createUint8ToStringTransformer() {
	const decoder = new TextDecoder();
	return new TransformStream<Uint8Array, string>({
		transform(chunk, controller) {
			controller.enqueue(decoder.decode(chunk));
		}
	});
}

function createStringToParagraphTransformer() {
	let buffer = '';
	return new TransformStream<string, string>({
		transform(chunk, controller) {
			let str = chunk;
			while (str.length > 0) {
				const index = str.indexOf('\n\n');
				if (index >= 0) {
					const paragraph = buffer + str.slice(0, index);
					controller.enqueue(paragraph);
					buffer = '';
					str = str.slice(index + 2);
				} else {
					buffer += str;
					break;
				}
			}
		},
		flush(controller) {
			if (buffer.length > 0) {
				controller.enqueue(buffer);
			}
		}
	});
}

function createDelayTransformer(delay: number) {
	let lastTime: number | null = null;
	return new TransformStream<string, string>({
		async transform(chunk, controller) {
			if (lastTime) {
				const elapsed = Date.now() - lastTime;
				await new Promise((resolve) => setTimeout(resolve, delay - elapsed));
			}
			controller.enqueue(chunk);
			lastTime = Date.now();
		}
	});
}

export function parseParagraph(paragraph: string): Token[] {
	const fullMenuMarker = '[FULL_MENU]';
	if (paragraph.includes(fullMenuMarker)) {
		const [before, after] = paragraph.split(fullMenuMarker);
		const tokens: Token[] = [];
		if (before.length > 0) {
			tokens.push({ type: 'paragraph', text: before });
		}
		tokens.push({ type: 'menu' });
		if (after.length > 0) {
			tokens.push({ type: 'paragraph', text: after });
		}
		return tokens;
	} else {
		return [{ type: 'paragraph', text: paragraph }];
	}
}
