const postcss = require('postcss')

module.exports = class {
    async data() {
        return {
            permalink: 'assets/styles.css',
        }
    }

    async render() {
        let process =
            '@tailwind base; @tailwind components; @tailwind utilities;'

        return await postcss([
            require('tailwindcss')('./docs/tailwind.config.js'),
            require('autoprefixer'),
        ])
            .process(process, { from: undefined })
            .then((result) => result.css)
    }
}
