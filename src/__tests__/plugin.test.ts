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
            .common-ligatures {
                font-variant-ligatures: common-ligatures
            }

            .discretionary-ligatures {
                font-variant-ligatures: discretionary-ligatures
            }

            .contextual {
                font-variant-ligatures: contextual
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
