const typographyPlugin = require('@tailwindcss/typography')
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

const opentypePlugin = require('../dist/index')

module.exports = {
    mode: 'jit',
    purge: [
        './docs/src/**/*.{html,md,njk}',
        './docs/.eleventy.js',
        './docs/remark/*.js',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                grey: colors.coolGray,
                teal: colors.teal,
                cyan: colors.cyan,
                'light-blue': colors.lightBlue,
                violet: colors.violet,
            },

            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        // maxWidth: 'none',
                        color: theme('colors.grey.500'),
                        '> :first-child': { marginTop: '-' },
                        '> :last-child': { marginBottom: '-' },
                        '&:first-child > :first-child': { marginTop: '0' },
                        '&:last-child > :last-child': { marginBottom: '0' },
                        'h1, h2': {
                            letterSpacing: '-0.025em',
                        },
                        'h2, h3': {
                            'scroll-margin-top': `${(70 + 40) / 16}rem`,
                        },
                        code: {
                            fontWeight: '400',
                            color: theme('colors.violet.600'),
                        },
                        'h3 code': {
                            fontWeight: 'inherit',
                            color: 'inherit',
                        },
                        'h3 code::before': { content: 'none' },
                        'h3 code::after': { content: 'none' },
                        '.code-sample p': { margin: 0 },
                        '.code-sample mark': { background: 'none' },
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

            maxHeight: (theme) => ({
                sm: '30rem',
                '(screen-18)': `calc(100vh - ${theme('spacing.18')})`,
            }),

            scale: {
                80: '0.8',
            },
        },
    },
    variants: {},
    plugins: [typographyPlugin, opentypePlugin],
}
