const fs = require('fs/promises')
const postcss = require('postcss')

module.exports = class {
    async data() {
        return {
            permalink: 'assets/styles.css',
        }
    }

    async render() {
        return await postcss([
            require('postcss-import'),
            require('tailwindcss')('./docs/tailwind.config.js'),
            require('autoprefixer'),
        ])
            .process(await fs.readFile('./docs/src/assets/main.css'), {
                from: undefined,
            })
            .then((result) => result.css)
    }
}
