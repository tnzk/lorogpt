import type { PizzariaSetting } from './types';

export const defaultPizzariaSetting = (): PizzariaSetting => ({
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
