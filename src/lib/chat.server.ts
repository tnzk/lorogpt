import { env } from '$env/dynamic/private';
import { Client as LangSmith, RunTree } from 'langsmith';
import OpenAI from 'openai';
import type { PizzaMenuSetting } from './menu';
import { translateMenuSetting, type PizzaMenuSettingPtbr } from './menu';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
const langsmith = new LangSmith({ apiKey: env.LANGSMITH_API_KEY });
const tokenUsageLimitUsd = parseFloat(env.TOKEN_USAGE_LIMIT_USD);

export async function sendMessageToAssistant(
	userId: string,
	assistantId: string,
	threadId: string | null,
	message: string,
	setting: PizzaMenuSetting
): Promise<{ stream: ReadableStream<string>; threadId: string }> {
	const tokenUsagePromise = getTotalTokenUsage(userId);

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

	const trace = new RunTree({
		client: langsmith,
		tracingEnabled: env.LANGSMITH_TRACING_V2 === 'true',
		name: 'Chat message',
		run_type: 'chain',
		inputs: { message, setting },
		start_time: Date.now(),
		metadata: {
			thread_id: threadId,
			user_id: userId
		}
	});
	const streamingTrace = trace.createChild({
		name: 'OpenAI streaming',
		run_type: 'llm',
		metadata: {
			user_id: userId
		}
	});

	await openai.beta.threads.messages.create(threadId, { role: 'user', content: message });

	const run = openai.beta.threads.runs.stream(threadId, { assistant_id: assistantId });
	const stream = new ReadableStream({
		start(controller) {
			let buffer = '';

			run
				.on('textDelta', (textDelta, snapshot) => {
					if (textDelta.value) {
						controller.enqueue(textDelta.value);
						buffer += textDelta.value;
					}
				})
				.on('event', async (event) => {
					if (event.event === 'thread.run.requires_action') {
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
											buffer += data.text.value;
										}
									} else if (event.event === 'thread.run.completed') {
										try {
											streamingTrace.end({
												usage_metadata: {
													input_tokens: event.data.usage?.prompt_tokens,
													output_tokens: event.data.usage?.completion_tokens,
													total_tokens: event.data.usage?.total_tokens
												}
											});
											trace.end({ response: buffer }, undefined, Date.now());
											await trace.postRun(false);
										} finally {
											controller.close();
										}
									}
								}
							}
						}
					} else if (event.event === 'thread.run.completed') {
						try {
							streamingTrace.end({
								usage_metadata: {
									input_tokens: event.data.usage?.prompt_tokens,
									output_tokens: event.data.usage?.completion_tokens,
									total_tokens: event.data.usage?.total_tokens
								}
							});
							trace.end({ response: buffer }, undefined, Date.now());
							await trace.postRun(false);
						} catch (traceError) {
							console.error(traceError);
						} finally {
							controller.close();
						}
					}
				})
				.on('error', async (error) => {
					console.error(error);

					try {
						streamingTrace.end();
						trace.end({ response: buffer }, error.toString(), Date.now());
						await trace.postRun();
					} catch (traceError) {
						console.error(traceError);
					} finally {
						controller.error(error);
					}
				});
			// NOTE: Without this, the entire Node process would terminate when the stream aborts.
			// ref. https://github.com/openai/openai-node/issues/682#issuecomment-1956973599
			run.finalMessages().catch((error) => {
				console.error(error);
			});
		},
		cancel() {
			run.abort();
		}
	});

	const { inputTokens, outputTokens } = await tokenUsagePromise;
	const tokenUsageUsd = calculateTokenUsageUsd(inputTokens, outputTokens);
	if (tokenUsageUsd > tokenUsageLimitUsd) {
		await stream.cancel();
		throw new Error('Usage limit reached');
	}

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

async function getTotalTokenUsage(
	userId: string
): Promise<{ inputTokens: number; outputTokens: number }> {
	const runs = langsmith.listRuns({
		projectName: 'default',
		runType: 'llm',
		filter: `and(eq(metadata_key, 'user_id'), eq(metadata_value, '${userId}'))`
	});
	let inputTokens = 0;
	let outputTokens = 0;
	for await (const run of runs) {
		inputTokens += run.prompt_tokens ?? 0;
		outputTokens += run.completion_tokens ?? 0;
	}
	return { inputTokens, outputTokens };
}

// ref. https://openai.com/api/pricing/
function calculateTokenUsageUsd(inputTokens: number, outputTokens: number): number {
	// gpt-4o pricing
	const inputRatePer1M = 5.0;
	const outputRatePer1M = 15.0;

	const inputUsage = (inputTokens * inputRatePer1M) / 1_000_000;
	const outputUsage = (outputTokens * outputRatePer1M) / 1_000_000;
	return inputUsage + outputUsage;
}
