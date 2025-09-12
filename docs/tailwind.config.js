/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import typographyPlugin from '@tailwindcss/typography'
import capsizePlugin from 'tailwindcss-capsize'
import opentypePlugin from 'tailwindcss-opentype'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./src/**/*.{html,md,njk}',
		'./eleventy.config.js',
		'./remark/*.js',
	],
	theme: {
		fontMetrics: {
			sans: {
				capHeight: 2048,
				ascent: 2728,
				descent: -680,
				lineGap: 0,
				unitsPerEm: 2816,
			},
		},

		extend: {
			colors: {
				grey: colors.gray,
				amber: colors.amber,
				orange: colors.orange,
				rose: colors.rose,
				fuchsia: colors.fuchsia,
				indigo: colors.indigo,
				lime: colors.lime,
				emerald: colors.emerald,
				teal: colors.teal,
				cyan: colors.cyan,
				sky: colors.sky,
				violet: colors.violet,
			},

			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': 'var(--color-gray-700)',
						'--tw-prose-headings': 'var(--color-gray-950)',
						'--tw-prose-lead': 'var(--color-gray-600)',
						'--tw-prose-links': 'var(--color-gray-950)',
						'--tw-prose-bold': 'var(--color-gray-950)',
						'--tw-prose-counters':
							'color-mix(in oklab, var(--color-gray-900) 25%, transparent)',
						'--tw-prose-bullets':
							'color-mix(in oklab, var(--color-gray-700) 25%, transparent)',
						'--tw-prose-hr':
							'color-mix(in oklab, var(--color-gray-950) 5%, transparent)',
						//   '--tw-prose-quotes': colors.slate[900],
						'--tw-prose-quote-borders': 'var(--color-gray-300)',
						//   '--tw-prose-captions': colors.slate[500],
						//   '--tw-prose-kbd': colors.slate[900],
						//   '--tw-prose-kbd-shadows': hexToRgb(colors.slate[900]),
						'--tw-prose-code': 'var(--color-gray-950)',
						'--tw-prose-pre-code': 'var(--color-gray-200)',
						'--tw-prose-pre-bg': 'var(--color-gray-800)',
						'--tw-prose-th-borders': 'var(--color-gray-300)',
						'--tw-prose-td-borders': 'var(--color-gray-200)',
						'--tw-prose-invert-body': colors.slate[300],
						'--tw-prose-invert-headings': colors.white,
						'--tw-prose-invert-lead': colors.slate[400],
						'--tw-prose-invert-links': colors.white,
						'--tw-prose-invert-bold': colors.white,
						'--tw-prose-invert-counters': colors.slate[400],
						'--tw-prose-invert-bullets': colors.slate[600],
						'--tw-prose-invert-hr': colors.slate[700],
						'--tw-prose-invert-quotes': colors.slate[100],
						'--tw-prose-invert-quote-borders': colors.slate[700],
						'--tw-prose-invert-captions': colors.slate[400],
						// '--tw-prose-invert-kbd': colors.white,
						// '--tw-prose-invert-kbd-shadows': hexToRgb(colors.white),
						'--tw-prose-invert-code': colors.white,
						'--tw-prose-invert-pre-code': colors.slate[300],
						'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
						'--tw-prose-invert-th-borders': colors.slate[600],
						'--tw-prose-invert-td-borders': colors.slate[700],

						h2: {
							'margin-top': '4em',
							'font-size': 'var(--text-xs)',
							'line-height': '2',
							'font-weight': 'var(--font-weight-medium)',
							'font-family': 'var(--font-mono)',
							'font-variant-ligatures': 'none',
							'letter-spacing': '0.1em',
							color: 'var(--tw-prose-body)',
							'text-transform': 'uppercase',
						},
						h3: {
							'font-size': 'var(--text-base)',
							'line-height': 'calc(28 / 18)',
							color: 'var(--tw-prose-headings)',
							'font-weight': 'var(--font-weight-semibold)',
							'margin-top': 'calc(var(--spacing) * 16)',
						},
						'h2 + h3': {
							'margin-top': 'calc(var(--spacing) * 6)',
						},
						':is(h2, h3, h4)': {
							'scroll-margin-top': 'calc(var(--spacing) * 32)',
						},
						':where(h2, h3, h4) code': {
							'font-weight': 'var(--font-weight-semibold)',
						},
						// MaxWidth: 'none',
						// color: theme('colors.grey.500'),

						'> :first-child': { marginTop: '0' },
						'> :last-child': { marginBottom: '0' },
						'&:first-child > :first-child': { marginTop: '0' },
						'&:last-child > :last-child': { marginBottom: '0' },
						// 'h1, h2': {
						// 	letterSpacing: '-0.025em',
						// },
						// 'h2, h3': {
						// 	'scroll-margin-top': `${(70 + 40) / 16}rem`,
						// },
						// Code: {
						// 	fontWeight: '400',
						// 	color: theme('colors.violet.600'),
						// },
						'h3 code': {
							fontWeight: 'inherit',
							color: 'inherit',
						},
						'code::before': { content: 'none' },
						'code::after': { content: 'none' },
						a: {
							textUnderlineOffset: '2px',
						},
						'a:not(:is(:hover, :focus))': {
							textDecorationColor:
								'color-mix(in srgb, currentColor, transparent 50%)',
						},
						'figure:has(blockquote)': {
							margin: '4rem 0',
							figcaption: {
								textAlign: 'end',
							},
						},
						blockquote: {
							fontSize: 'var(--text-xl)',
							fontStyle: 'normal',
							fontWeight: '500',
							lineHeight: 'calc(var(--spacing) * 9)',
							letterSpacing: 'var(--tracking-tight)',
							border: '0',
							'@media (min-width: 40rem)': {
								fontSize: 'var(--text-2xl)',
								lineHeight: 'calc(var(--spacing) * 10)',
							},
						},
						'blockquote p': { position: 'relative' },
						'blockquote p::before': {
							position: 'absolute',
							top: '1rem',
							left: '-1.5rem',
							fontSize: '6rem',
							color:
								'light-dark(color-mix(in oklab, var(--color-gray-950) 10%, transparent), color-mix(in oklab, #fff 10%, transparent))',
							content: '“',
							pointerEvents: 'none',
							'@media (min-width: 64rem)': {
								fontSize: '8rem',
							},
						},
						table: {
							fontSize: theme('fontSize.sm')[0],
							lineHeight: theme('fontSize.sm')[1].lineHeight,
						},
						thead: {
							color: theme('colors.grey.600'),
							borderBottomColor: theme('colors.grey.200'),
						},
						'thead th': {
							paddingTop: 0,
							fontWeight: theme('fontWeight.semibold'),
						},
						'tbody tr': {
							borderBottomColor: theme('colors.grey.200'),
						},
						'tbody tr:last-child': {
							borderBottomWidth: '1px',
						},
						'tbody code': {
							fontSize: theme('fontSize.xs')[0],
						},
					},
				},
			}),

			spacing: {
				18: '4.5rem',
				88: '22rem',
				'15px': '0.9375rem',
				'23px': '1.4375rem',
				full: '100%',
			},

			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
				allan: 'Allan',
				caflisch: 'Caflisch Script',
				exo: 'Exo',
				garamond: 'EB Garamond, serif',
				hypatia: 'Hypatia Sans Pro, sans-serif',
				goudy: 'Sorts Mill Goudy, serif',
				warnock: 'Warnock Pro, serif',
			},

			width: {
				xl: '36rem',
			},

			maxWidth: {
				'4.5xl': '60rem',
				'8xl': '90rem',
			},

			maxHeight: ({ theme }) => ({
				sm: '30rem',
				'(screen-18)': `calc(100vh - ${theme('spacing.18')})`,
			}),

			scale: {
				80: '0.8',
			},
		},
	},
	plugins: [typographyPlugin, capsizePlugin, opentypePlugin],
}

export default config
