const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const eleventyRemark = require('@fec/eleventy-plugin-remark')
const dedent = require('dedent')

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        'docs/src/assets/fonts': './assets/fonts',
    })
    eleventyConfig.addPassthroughCopy({
        'docs/src/assets/images': './assets/images',
    })
    eleventyConfig.addPassthroughCopy({ 'docs/src/public': '.' })

    eleventyConfig.addPairedShortcode(
        'navitem',
        function (content, url, isSelected, isInactive) {
            let tag = ''

            if (isInactive) {
                tag = `<span class="px-3 py-2 relative block text-grey-400">${content}</span>`
            } else {
                let linkClass = [
                    'px-3 py-2 transition-colors duration-200 relative block',
                    isSelected && 'text-sky-700',
                    !isSelected && 'hover:text-grey-900 text-grey-500',
                ].join(' ')

                tag = dedent`<a class="${linkClass}" href="${url}">
                    <span class="rounded-md absolute inset-0 bg-sky-50 ${
                        !isSelected && 'opacity-0'
                    }"></span>
                    <span class="relative">${content}</span>
                </a>`
            }

            return `<li>${tag}</li>`
        },
    )

    eleventyConfig.addPlugin(eleventyNavigationPlugin)
    eleventyConfig.addPlugin(eleventyRemark, {
        plugins: [
            require('remark-slug'),
            {
                plugin: 'remark-autolink-headings',
                options: {
                    linkProperties: {
                        class: 'absolute ml-[-0.75em] md:ml-[-1em] pr-[0.5em] !no-underline !text-grey-400 opacity-0 group-hover:opacity-100',
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
