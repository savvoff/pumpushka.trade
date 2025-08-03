/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  safelist: [
    'text-orange-100'
  ],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: '1rem',
      screens: {
        'sm': '40rem',
        'md': '48rem',
      },
		},
		colors: {
			'white': '#ffffff',
			'black': '#000000', 
			'red': '#ff0000',
      'blue': {
        DEFAULT: '#2b9fed',
        '100': '#07a0ec',
        '200': '#128afa',
      },
      'grass': '#36d521',
      'orange': {
        DEFAULT: '#f18007',
        '100': '#f1A907',
        '200': '#f3a842',
        '300': '#fce9c2',
      },
      'gold': '#d3a842',
      'dark': '#444040'
		},
		fontFamily: {
			sans: ['Daikon', 'sans-serif', ...defaultTheme.fontFamily.sans],
			heading: ['Ranchers', 'sans-serif', ...defaultTheme.fontFamily.sans],
		},
		extend: {
      backgroundClip: {
        'padding': 'padding-box',
      },
			transitionTimingFunction: {
				'out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
			},
      fontSize: {
				'5xl': '3.125rem',
			},
      boxShadow: {
        'xs': '0px 2px 0px 0px rgba(0, 0, 0, 0.3)',
        'button': '0px 5px 0px 0px rgba(0, 0, 0, 0.3)',
        'card': '5px 25px 30px -15px rgba(0, 0, 0, 0.3)'
      },
      aspectRatio: {
        '2/3': '2 / 3',
        '6/5': '6 / 5',
        '7/12': '7 / 12',
      },
      borderWidth: {
        '10': '10px'
      },
      width: {
        '7.5': '1.875rem'
      },
      height: {
        '7.5': '1.875rem'
      }
		},
	},
	plugins: [],
}