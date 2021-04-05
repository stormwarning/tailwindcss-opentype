import plugin from 'tailwindcss/plugin'

export default plugin.withOptions(() => {
    return function ({ addUtilities, variants }) {
        addUtilities(
            {
                '.common-ligatures': {
                    'font-variant-ligatures': 'common-ligatures',
                },
            },
            variants('fontVariantLigatures', ['responsive']),
        )
    }
})
