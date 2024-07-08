<script lang="ts">
	export let buttonClass: string = '';
	let successMessage = '';
	let errorMessage = '';

	// Custom submission logic based on Mailchimp's JS.
	// ref. https://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js
	// NOTE: Mailchimp's JS does not support multiple forms on a single page.
	async function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
		successMessage = '';
		errorMessage = '';

		const form = event.currentTarget;
		const callbackName = `__mc_callback_${crypto.randomUUID().replace(/-/g, '')}__`;
		// @ts-ignore Valid, but TS yields an error: https://github.com/microsoft/TypeScript/issues/30584
		const query = new URLSearchParams(new FormData(form));
		query.set('c', callbackName);
		query.set('_', Date.now().toString());
		const url = form.action.replace('/post?', '/post-json?') + '&' + query.toString();

		// Create <script> to evaluate the callback function.
		const script = document.createElement('script');
		script.src = url;
		script.addEventListener('error', () => {
			errorMessage = 'Algo deu errado'; // Something went wrong

			script.remove();
			// @ts-ignore
			delete window[callbackName];
		});

		// Make the callback visible in the global namespace.
		// @ts-ignore
		window[callbackName] = (res: { result: 'success' | 'error'; msg: string }) => {
			// console.log(res);
			if (res.result === 'error') {
				errorMessage = res.msg;
			} else {
				successMessage = 'Obrigado por se inscrever!'; // Thank you for subscribing!
				form.reset();
			}

			script.remove();
			// @ts-ignore
			delete window[callbackName];
		};

		// Perform submission and evaluate the response.
		document.body.appendChild(script);
	}
</script>

<form
	action="https://gmail.us22.list-manage.com/subscribe/post?u=18126c54eb55cc0925c296377&amp;id=e02f68c436&amp;f_id=00edcfe1f0"
	method="post"
	id="mc-embedded-subscribe-form"
	name="mc-embedded-subscribe-form"
	class="validate"
	target="_blank"
	on:submit|preventDefault={handleSubmit}
>
	<div class="flex items-center gap-2.5">
		<input
			type="email"
			name="EMAIL"
			class="required email flex-1 h-14 p-3.5 border border-loro-gray-100 rounded-lg"
			id="mce-EMAIL"
			required
			value=""
			placeholder="Insira seu email"
		/>
		<input
			type="submit"
			name="subscribe"
			id="mc-embedded-subscribe"
			class="button shrink-0 inline-flex items-center justify-center h-14 w-32 rounded-lg text-loro-white font-bold {buttonClass} cursor-pointer"
			value="Enviar"
		/>
	</div>
	<div id="mce-responses" class="clear">
		{#if errorMessage}
			<div class="response text-red-500" id="mce-error-response">
				{errorMessage}
			</div>
		{/if}
		{#if successMessage}
			<div class="response text-green-500" id="mce-success-response">
				{successMessage}
			</div>
		{/if}
	</div>
	<div aria-hidden="true" style="position: absolute; left: -5000px;">
		<input type="text" name="b_18126c54eb55cc0925c296377_e02f68c436" tabindex="-1" value="" />
	</div>
</form>
