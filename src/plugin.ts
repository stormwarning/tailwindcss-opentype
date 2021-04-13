import plugin from 'tailwindcss/plugin'

export default plugin.withOptions(() => {
    return function ({ addUtilities, variants }) {
        addUtilities(
            {
                '.common-ligatures, .no-common-ligatures, .discretionary-ligatures, .no-discretionary-ligatures, .contextual, .no-contextual': {
                    '--ot-liga': 'var(--tw-empty, /*!*/)',
                    '--ot-dlig': 'var(--tw-empty, /*!*/)',
                    '--ot-calt': 'var(--tw-empty, /*!*/)',
                    'font-variant-ligatures':
                        'var(--ot-liga) var(--ot-dlig) var(--ot-calt)',
                },
                '.common-ligatures': { '--ot-liga': 'common-ligatures' },
                '.no-common-ligatures': { '--ot-liga': 'no-common-ligatures' },
                '.discretionary-ligatures': {
                    '--ot-dlig': 'discretionary-ligatures',
                },
                '.no-discretionary-ligatures': {
                    '--ot-dlig': 'no-discretionary-ligatures',
                },
                '.contextual': { '--ot-calt': 'contextual' },
                '.no-contextual': { '--ot-calt': 'no-contextual' },
            },
            variants('fontVariantLigatures', []),
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
