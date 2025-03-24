import type { Config } from 'tailwindcss'
import { describe, expect, it } from 'vitest'

import opentypePlugin from '../src/plugin.js'
import { css, run } from './run.js'

const CSS_INPUT = css`
	@tailwind utilities;
`

describe('Plugin', () => {
	it('generates utility classes', async () => {
		let config: Config = {
			content: ['./**/*.test.ts'],
			theme: {
				stylisticSets: {
					'01': 'ss01',
					named: 'ss02',
					'03': 'ss03',
				},
			},
			plugins: [opentypePlugin],
			corePlugins: [],
		}
		let { css } = await run(CSS_INPUT, config)

		expect(css).toMatchFormattedCss(`
			.kerning {
				font-kerning: auto
			}

			.kerning-normal {
				font-kerning: normal
			}

			.kerning-none {
				font-kerning: none
			}

			.common-ligatures, .no-common-ligatures, .discretionary-ligatures, .no-discretionary-ligatures, .contextual, .no-contextual {
				--ot-liga: var(--tw-empty, /*!*/);
				--ot-dlig: var(--tw-empty, /*!*/);
				--ot-calt: var(--tw-empty, /*!*/);
				font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt)
			}

			.common-ligatures {
				--ot-liga: common-ligatures
			}

			.no-common-ligatures {
				--ot-liga: no-common-ligatures
			}

			.discretionary-ligatures {
				--ot-dlig: discretionary-ligatures
			}

			.no-discretionary-ligatures {
				--ot-dlig: no-discretionary-ligatures
			}

			.contextual {
				--ot-calt: contextual
			}

			.no-contextual {
				--ot-calt: no-contextual
			}

			.small-caps {
				font-variant-caps: small-caps
			}

			.all-small-caps {
				font-variant-caps: all-small-caps
			}

			.titling-caps {
				font-variant-caps: titling-caps
			}

			.historical-forms {
				font-variant-alternates: historical-forms
			}

			.sups {
				--ot-sups: "sups" 1;
				font-feature-settings: var(--ot-features);
			}

			.subs {
				--ot-subs: "subs" 1;
				font-feature-settings: var(--ot-features);
			}

			.sinf {
				--ot-sinf: "sinf" 1;
				font-feature-settings: var(--ot-features);
			}

			.hlig {
				--ot-hlig: "hlig" 1;
				font-feature-settings: var(--ot-features);
			}

			.ss-01 {
				--ot-ss01: "ss01" 1;
				font-feature-settings: var(--ot-features);
			}

			.ss-03 {
				--ot-ss03: "ss03" 1;
				font-feature-settings: var(--ot-features);
			}

			.ss-named {
				--ot-ss02: "ss02" 1;
				font-feature-settings: var(--ot-features);
			}
		`)
	})
})
