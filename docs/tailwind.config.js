const typographyPlugin = require('@tailwindcss/typography')
const colors = require('tailwindcss/colors')

const opentypePlugin = require('../dist/index')

module.exports = {
    purge: {
        content: ['./src/**/*.@{html,md,njk}'],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                grey: colors.coolGray,
            },
        },
    },
    variants: {},
    plugins: [typographyPlugin, opentypePlugin],
}
