<script lang="ts">
	export let buttonClass: string = '';
</script>

<svelte:head>
	<script defer src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
	<script defer src="/mailchimp.js"></script>
</svelte:head>

<form
	action="https://gmail.us22.list-manage.com/subscribe/post?u=18126c54eb55cc0925c296377&amp;id=e02f68c436&amp;f_id=00edcfe1f0"
	method="post"
	id="mc-embedded-subscribe-form"
	name="mc-embedded-subscribe-form"
	class="validate"
	target="_blank"
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
			class="button shrink-0 inline-flex items-center justify-center h-14 w-32 rounded-lg text-loro-white font-bold {buttonClass}"
			value="Enviar"
		/>
	</div>
	<div id="mce-responses" class="clear">
		<div class="response text-red-500" id="mce-error-response" style="display: none;"></div>
		<div class="response text-green-500" id="mce-success-response" style="display: none;"></div>
	</div>
	<div aria-hidden="true" style="position: absolute; left: -5000px;">
		<input type="text" name="b_18126c54eb55cc0925c296377_e02f68c436" tabindex="-1" value="" />
	</div>
</form>
