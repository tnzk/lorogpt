/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: [
				'"Noto Sans", sans-serif',
				{
					fontVariationSettings: '"wdth" 100'
				}
			]
		},
		extend: {
			colors: {
				'loro-green': '#349B3C',
				'loro-green-dark': '#38703D',
				'loro-green-light': '#21C52F',
				'loro-green-lighter': '#C8EED4',
				'loro-black': '#252525',
				'loro-white': '#FFFFFF',
				'loro-gray-100': '#CED4DA',
				'loro-gray-200': '#868E96'
			},
			fontSize: {
				'1.5xl': '1.375rem',
				'3.5xl': '2rem',
				'4.5xl': '2.375rem'
			},
			margin: {
				17.5: '4.375rem'
			},
			padding: {
				17.5: '4.375rem'
			}
		}
	},
	plugins: []
};
