import { env } from '$env/dynamic/private';
import OpenAI from 'openai';
import type { PizzaMenuSetting } from './menu';
import { translateMenuSetting, type PizzaMenuSettingPtbr } from './menu';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function sendMessageToAssistant(
	assistantId: string,
	threadId: string | null,
	message: string,
	setting: PizzaMenuSetting
): Promise<{ stream: ReadableStream<string>; threadId: string }> {
	if (!threadId) {
		const thread = await openai.beta.threads.create({
			messages: [
				{
					role: 'user',
					content: [
						'Use a configuração abaixo:',
						'```',
						JSON.stringify(translateMenuSetting(setting), undefined, 2),
						'```'
					].join('\n')
				}
			]
		});
		threadId = thread.id;
	}

	await openai.beta.threads.messages.create(threadId, { role: 'user', content: message });

	const run = openai.beta.threads.runs.stream(threadId, { assistant_id: assistantId });
	let runningAction = false;
	let streamEnd = false;
	const stream = new ReadableStream({
		start(controller) {
			run
				.on('textDelta', (textDelta, snapshot) => {
					controller.enqueue(textDelta.value);
				})
				.on('event', async (event) => {
					if (event.event === 'thread.run.requires_action') {
						runningAction = true;
						const toolCalls = event.data.required_action?.submit_tool_outputs.tool_calls ?? [];
						for (const toolCall of toolCalls) {
							let output: string | undefined;
							switch (toolCall.function.name) {
								case 'calculatePrice':
									const price = calculatePrice(
										JSON.parse(toolCall.function.arguments),
										translateMenuSetting(setting)
									);
									output = price.toString();
									break;
							}

							if (output !== undefined) {
								const stream = openai.beta.threads.runs.submitToolOutputsStream(
									threadId,
									event.data.id,
									{
										tool_outputs: [
											{
												tool_call_id: toolCall.id,
												output: output
											}
										]
									}
								);
								for await (const event of stream) {
									if (event.event === 'thread.message.delta') {
										const data = event.data.delta.content?.[0];
										if (data?.type === 'text' && data.text?.value) {
											controller.enqueue(data.text.value);
										}
									}
								}
							}
						}
						if (streamEnd) {
							controller.close();
						}
						runningAction = false;
					}
				})
				.on('error', (error) => {
					console.error(error);
					controller.error(error);
				})
				.on('end', () => {
					if (runningAction) {
						streamEnd = true;
					} else {
						controller.close();
					}
				});
		},
		cancel() {
			run.abort();
		}
	});

	return { stream, threadId };
}

function calculatePrice(
	input: { sabores: string[]; tamanho: string; borda_recheada: boolean; refrigerantes: string[] },
	setting: PizzaMenuSettingPtbr
) {
	console.log(input);
	const sum = (nums: number[]) => nums.reduce((a, n) => a + n, 0);
	const pizzaPrice = sum(
		input.sabores.map((name) => {
			const flavor = setting.sabores.find((flavor) => flavor.nome === name)!;
			return flavor.preço[input.tamanho] / input.sabores.length;
		})
	);
	const stuffedCrustPrice = input.borda_recheada ? setting.borda_recheada : 0;
	const softDrinkPrice = sum(
		input.refrigerantes.map((name) => {
			const drink = setting.refrigerantes.find((drink) => drink.nome === name)!;
			return drink.preço;
		})
	);
	const total = sum([pizzaPrice, stuffedCrustPrice, softDrinkPrice]);
	console.log(`Total: ${total}`);
	return total;
}
