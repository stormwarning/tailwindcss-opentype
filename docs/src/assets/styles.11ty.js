const postcss = require('postcss')

const css = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    @layer base {
        @font-face {
            font-family: "Sorts Mill Goudy";
            font-weight: 400;
            src: url(/assets/fonts/sorts-mill-goudy-regular.woff2) format("woff2");
            font-display: swap;
        }
    }
`

module.exports = class {
    async data() {
        return {
            permalink: 'assets/styles.css',
        }
    }

    async render() {
        return await postcss([
            require('tailwindcss')('./docs/tailwind.config.js'),
            require('autoprefixer'),
        ])
            .process(css, { from: undefined })
            .then((result) => result.css)
    }
}
