import plugin from 'tailwindcss/plugin.js'

const JIT_FONT_FEATURE_DEFAULTS = {
	'@defaults font-feature-settings': {},
	'font-feature-settings': 'var(--ot-features)',
}

const opentypePlugin = plugin.withOptions(
	() =>
		function ({ addBase, addUtilities, matchUtilities, theme }) {
			addUtilities({
				'.kerning': { 'font-kerning': 'auto' },
				'.kerning-normal': { 'font-kerning': 'normal' },
				'.kerning-none': { 'font-kerning': 'none' },
			})

			addUtilities({
				'.common-ligatures, .no-common-ligatures, .discretionary-ligatures, .no-discretionary-ligatures, .contextual, .no-contextual':
					{
						'--ot-liga': 'var(--tw-empty, /*!*/)',
						'--ot-dlig': 'var(--tw-empty, /*!*/)',
						'--ot-calt': 'var(--tw-empty, /*!*/)',
						'font-variant-ligatures': 'var(--ot-liga) var(--ot-dlig) var(--ot-calt)',
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
			})

			addUtilities({
				'.small-caps': {
					'font-variant-caps': 'small-caps',
				},
				'.all-small-caps': {
					'font-variant-caps': 'all-small-caps',
				},
				'.titling-caps': {
					'font-variant-caps': 'titling-caps',
				},
			})

			addUtilities({
				'.historical-forms': {
					'font-variant-alternates': 'historical-forms',
				},
			})

			let stylisticSetsValues =
				theme('stylisticSets', {
					'01': 'ss01',
					'02': 'ss02',
					'03': 'ss03',
					'04': 'ss04',
				}) ?? {}
			let stylisticSetsProperties = Object.values(stylisticSetsValues).map(
				(tag: string) => `var(--ot-${tag})`,
			)
			let stylisticSetsDefaults: Record<string, string> = {}
			for (let tag of Object.values(stylisticSetsValues)) {
				stylisticSetsDefaults[`--ot-${tag}`] = `"${tag}" 0`
			}

			addBase({
				'@defaults font-feature-settings': {
					'--ot-sups': '"sups" 0',
					'--ot-subs': '"subs" 0',
					'--ot-sinf': '"sinf" 0',
					'--ot-hlig': '"hlig" 0',
					'--ot-salt': '"salt" 0',
					...stylisticSetsDefaults,
					'--ot-features': [
						'var(--ot-sups)',
						'var(--ot-subs)',
						'var(--ot-sinf)',
						'var(--ot-hlig)',
						'var(--ot-salt)',
						...stylisticSetsProperties,
					].join(', '),
				},
			})

			addUtilities({
				'.sups': {
					'--ot-sups': '"sups" 1',
					...JIT_FONT_FEATURE_DEFAULTS,
				},
				'.subs': {
					'--ot-subs': '"subs" 1',
					...JIT_FONT_FEATURE_DEFAULTS,
				},
				'.sinf': {
					'--ot-sinf': '"sinf" 1',
					...JIT_FONT_FEATURE_DEFAULTS,
				},
				'.hlig': {
					'--ot-hlig': '"hlig" 1',
					...JIT_FONT_FEATURE_DEFAULTS,
				},
				'.salt': {
					'--ot-salt': '"salt" 1',
					...JIT_FONT_FEATURE_DEFAULTS,
				},
			})

			matchUtilities(
				{
					ss: (value: string) => ({
						[`--ot-${value}`]: `"${value}" 1`,
						...JIT_FONT_FEATURE_DEFAULTS,
					}),
				},
				{
					values: stylisticSetsValues,
				},
			)
		},
)

export default opentypePlugin
