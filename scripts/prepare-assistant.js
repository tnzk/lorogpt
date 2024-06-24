// Usage: node -r dotenv/config prepare-assistant.js

import { readFile } from 'fs/promises';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
	let assistantId = process.env.OPENAI_ASSISTANT_ID;
	const params = {
		name: 'LoroGPT Assistant',
		instructions: await readFile(path.resolve(__dirname, 'instructions.txt'), 'utf-8'),
		model: 'gpt-4o'
		// tools: [{ type: 'code_interpreter' }],
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
