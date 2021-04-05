import cssMatcher from 'jest-matcher-css'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

import opentypePlugin from '../../dist'

expect.extend({
    toMatchCss: cssMatcher,
})

describe('Plugin', () => {
    it('generates utility classes', async () => {
        return await postcss([
            tailwindcss({
                theme: { screens: false },
                corePlugins: false,
                plugins: [opentypePlugin],
            }),
        ])
            .process('@tailwind components; @tailwind utilities', {
                from: undefined,
            })
            .then((result) => {
                expect(result.css).toMatchCss(`
                    .common-ligatures {
                        font-variant-ligatures: common-ligatures
                    }
                `)
            })
    })
})
