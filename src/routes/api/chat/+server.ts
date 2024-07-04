import { env } from '$env/dynamic/private';
import { sendMessageToAssistant } from '$lib/chat.server';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, request }) => {
	// const dummyStream = new ReadableStream({
	// 	async start(controller) {
	// 		const message =
	// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
	// 		for (let i = 0; i < 3; i++) {
	// 			for (const chunk of message.split(' ')) {
	// 				controller.enqueue(chunk + ' ');
	// 				await new Promise((resolve) => setTimeout(resolve, 100));
	// 			}
	// 			controller.enqueue('\n\n');
	// 		}
	// 		controller.close();
	// 	}
	// });
	// return new Response(dummyStream, {
	// 	headers: {
	// 		'content-type': 'text/plain'
	// 	}
	// });

	if (!env.OPENAI_ASSISTANT_ID) {
		console.error('Must set OPENAI_ASSISTANT_ID');
		error(500);
	}

	let userId = cookies.get('loro_session');
	if (!userId) {
		userId = crypto.randomUUID();
		cookies.set('loro_session', userId, { path: '/', maxAge: 7 * 24 * 60 * 60 });
	}

	const { threadId = null, message, setting } = await request.json();
	if (!(threadId === null || (typeof threadId === 'string' && threadId.length <= 256))) {
		error(400, 'Bad Request');
	}
	if (!(typeof message === 'string' && message.length <= 4096)) {
		error(400, 'Bad Request');
	}
	if (!(typeof setting === 'object')) {
		error(400, 'Bad Request');
	}

	try {
		const res = await sendMessageToAssistant(
			userId,
			env.OPENAI_ASSISTANT_ID,
			threadId,
			message,
			setting
		);

		return new Response(res.stream, {
			headers: {
				'content-type': 'text/plain',
				'x-loro-thread-id': res.threadId
			}
		});
	} catch (e) {
		if (e instanceof Error && e.message === 'Usage limit reached') {
			error(429);
		} else {
			throw e;
		}
	}
};
