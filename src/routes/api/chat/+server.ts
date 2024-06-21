import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const dummyStream = new ReadableStream({
		async start(controller) {
			const message =
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
			for (const chunk of message.split(' ')) {
				controller.enqueue(chunk + ' ');
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
			controller.close();
		}
	});

	return new Response(dummyStream, {
		headers: {
			'content-type': 'text/plain'
		}
	});
};
