/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'loro-green': '#349B3C',
				'loro-green-dark': '#38703D',
				'loro-green-light': '#21C52F',
				'loro-green-lighter': '#C8EED4'
			}
		}
	},
	plugins: []
};
