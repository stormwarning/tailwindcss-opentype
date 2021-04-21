const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const eleventyRemark = require('@fec/eleventy-plugin-remark')

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        'docs/src/assets/fonts': './assets/fonts',
    })
    eleventyConfig.addPassthroughCopy({
        'docs/src/assets/images': './assets/images',
    })
    eleventyConfig.addPassthroughCopy({ 'docs/src/public': '.' })
    eleventyConfig.addPlugin(eleventyNavigationPlugin)
    eleventyConfig.addPlugin(eleventyRemark, {
        plugins: [
            require('remark-slug'),
            {
                plugin: 'remark-autolink-headings',
                options: {
                    linkProperties: {
                        class:
                            'absolute ml-[-0.75em] md:ml-[-1em] pr-[0.5em] !no-underline !text-grey-400 opacity-0 group-hover:opacity-100',
                    },
                    content: {
                        type: 'text',
                        value: '¶',
                    },
                },
            },
            require('./remark/headings'),
            require('remark-directive'),
            require('./remark/directives'),
            require('./remark/sample'),
            // require('./remark/prose'),
        ],
    })

    return {
        dir: {
            input: 'docs/src',
            data: 'data',
            includes: 'includes',
            layouts: 'layouts',
            output: 'docs/dist',
        },
        // pathPrefix:
        //     process.env.NODE_ENV === 'production'
        //         ? '/tailwindcss-opentype/'
        //         : '',
    }
}
