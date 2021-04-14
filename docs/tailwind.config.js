const typographyPlugin = require('@tailwindcss/typography')
const colors = require('tailwindcss/colors')

const opentypePlugin = require('../dist/index')

module.exports = {
    mode: 'jit',
    purge: {
        content: ['./src/**/*.@{html,md,njk}'],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                grey: colors.coolGray,
                'light-blue': colors.lightBlue,
                violet: colors.violet,
            },

            typography: (theme) => ({
                DEFAULT: {
                    css: {
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
        },
    },
    variants: {},
    plugins: [typographyPlugin, opentypePlugin],
}
