import cssMatcher from 'jest-matcher-css'

import opentypePlugin from '../../dist'
import { generateCss } from './helpers'

expect.extend({
    toMatchCss: cssMatcher,
})

describe('Plugin', () => {
    it('generates utility classes', async () => {
        let css = await generateCss(opentypePlugin)
        expect(css).toMatchCss(`
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

            .super-position {
                font-variant-position: super
            }

            .sub-position {
                font-variant-position: sub
            }
        `)
    })
})
