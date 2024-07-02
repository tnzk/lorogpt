// Usage: node -r dotenv/config prepare-assistant.js

import { readFile } from 'fs/promises';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nameTag = process.env.NODE_ENV === 'production' ? '' : '[development] ';

async function main() {
	let assistantId = process.env.OPENAI_ASSISTANT_ID;

	const params = {
		name: `${nameTag}LoroGPT Assistant (pt-br)`,
		instructions: await readFile(path.resolve(__dirname, 'instructions.txt'), 'utf-8'),
		model: 'gpt-4o',
		tools: [
			{
				type: 'function',
				function: {
					name: 'calculatePrice',
					description: 'Calculate total shipping price.',
					parameters: {
						type: 'object',
						properties: {
							flavors: {
								type: 'array',
								items: {
									type: 'string'
								},
								description:
									'List of the names of the pizza flavor ordered by the customer. Pass the value of the `name` field under `flavors` in the setting JSON.'
							},
							size: {
								type: 'string',
								description:
									'The size of the pizza ordered by the customer. Pass the value of the `name` field under `sizes` in the setting JSON.'
							},
							stuffed_crust: {
								type: 'boolean',
								description: 'Whether the customer has added stuffed crust.'
							},
							soft_drinks: {
								type: 'array',
								items: {
									type: 'string'
								},
								description:
									'List of the names of soft drinks ordered by the customer. Pass the value of the `name` field under `soft_drinks` in the setting JSON.'
							}
						},
						required: ['flavor', 'size', 'stuffed_crust', 'soft_drinks']
					}
				}
			}
		]
	};

	if (!assistantId) {
		const assistant = await openai.beta.assistants.create(params);
		assistantId = assistant.id;
	} else {
		await openai.beta.assistants.update(assistantId, params);
	}

	console.log(`OPENAI_ASSISTANT_ID="${assistantId}"`);
}

main();
