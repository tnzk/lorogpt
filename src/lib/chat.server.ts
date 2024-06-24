import { env } from '$env/dynamic/private';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function sendMessageToAssistant(
	assistantId: string,
	threadId: string | null,
	message: string,
	setting: object
): Promise<{ stream: ReadableStream<string>; threadId: string }> {
	if (!threadId) {
		const thread = await openai.beta.threads.create({
			messages: [
				{
					role: 'user',
					content: [
						'Use the setting below:',
						'```',
						JSON.stringify(setting, undefined, 2),
						'```'
					].join('\n')
				}
			]
		});
		threadId = thread.id;
	}

	await openai.beta.threads.messages.create(threadId, { role: 'user', content: message });

	const run = openai.beta.threads.runs.stream(threadId, { assistant_id: assistantId });
	const stream = new ReadableStream({
		start(controller) {
			run
				.on('textDelta', (textDelta, snapshot) => {
					controller.enqueue(textDelta.value);
				})
				.on('toolCallDelta', (toolCallDelta, snapshot) => {
					// TODO
				})
				.on('error', (error) => {
					console.error(error);
					controller.error(error);
				})
				.on('end', () => {
					controller.close();
				});
		},
		cancel() {
			run.abort();
		}
	});

	return { stream, threadId };
}
