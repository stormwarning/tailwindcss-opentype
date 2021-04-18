const postcss = require('postcss')

const css = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    @layer base {
        @font-face {
            font-family: "Inter var";
            font-weight: 100 900;
            font-style: normal;
            font-named-instance: 'Regular';
            src: url(/assets/fonts/Inter-roman.var.woff2) format("woff2");
            font-display: swap;
        }
        @font-face {
            font-family: "Inter var";
            font-weight: 100 900;
            font-style: italic;
            font-named-instance: 'Italic';
            src: url(/assets/fonts/Inter-italic.var.woff2) format("woff2");
            font-display: swap;
        }
        @font-face {
            font-family: "Sorts Mill Goudy";
            font-weight: 400;
            src: url(/assets/fonts/sorts-mill-goudy-regular.woff2) format("woff2");
            font-display: swap;
        }
        @font-face {
            font-family: "Warnock Pro";
            font-weight: 400;
            src: url(/assets/fonts/warnock-pro-bold.woff2) format("woff2");
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
