import plugin from 'tailwindcss/plugin'

export default plugin.withOptions(() => {
    return function ({ addUtilities, variants }) {
        addUtilities(
            {
                '.common-ligatures': {
                    'font-variant-ligatures': 'common-ligatures',
                },
                '.discretionary-ligatures': {
                    'font-variant-ligatures': 'discretionary-ligatures',
                },
                '.contextual': {
                    'font-variant-ligatures': 'contextual',
                },
            },
            variants('fontVariantLigatures', ['responsive']),
        )

        addUtilities(
            {
                '.small-caps': {
                    'font-variant-caps': 'small-caps',
                },
                '.all-small-caps': {
                    'font-variant-caps': 'all-small-caps',
                },
                '.titling-caps': {
                    'font-variant-caps': 'titling-caps',
                },
            },
            variants('fontVariantCaps', ['responsive']),
        )

        addUtilities(
            {
                '.historical-forms': {
                    'font-variant-alternates': 'historical-forms',
                },
            },
            variants('fontVariantAlternates', ['responsive']),
        )

        addUtilities(
            {
                '.super-position': {
                    'font-variant-position': 'super',
                },
                '.sub-position': {
                    'font-variant-position': 'sub',
                },
            },
            variants('fontVariantPosition', ['responsive']),
        )
    }
})
