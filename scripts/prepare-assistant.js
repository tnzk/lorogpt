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
					description: 'Calcular o preço total do frete.',
					parameters: {
						type: 'object',
						properties: {
							// flavors
							sabores: {
								type: 'array',
								items: {
									type: 'string'
								},
								description:
									// 'List of the names of the pizza flavor ordered by the customer. Pass the value of the `name` field under `flavors` in the setting JSON.'
									'Lista dos nomes dos sabores de pizza pedidos pelo cliente. Passe o valor do campo `nome` em `sabores` na configuração JSON.'
							},
							// size
							tamanho: {
								type: 'string',
								description:
									// 'The size of the pizza ordered by the customer. Pass the value of the `name` field under `sizes` in the setting JSON.'
									'O tamanho da pizza pedida pelo cliente. Passe o valor do campo `nome` em `tamanhos` na configuração JSON.'
							},
							// stuffed_crust
							borda_recheada: {
								type: 'boolean',
								description:
									// 'Whether the customer has added stuffed crust.'
									'Se o cliente adicionou borda recheada.'
							},
							// soft_drinks
							refrigerantes: {
								type: 'array',
								items: {
									type: 'string'
								},
								description:
									// 'List of the names of soft drinks ordered by the customer. Pass the value of the `name` field under `soft_drinks` in the setting JSON.'
									'Lista dos nomes dos refrigerantes pedidos pelo cliente. Passe o valor do campo `nome` em `refrigerantes` na configuração JSON.'
							}
						},
						required: ['sabores', 'tamanho', 'borda_recheada', 'refrigerantes']
					}
				}
			},
			{ type: 'file_search' }
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
