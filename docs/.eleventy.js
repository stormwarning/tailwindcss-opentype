const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItClass = require('@toycode/markdown-it-class')

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin)

    eleventyConfig.setLibrary(
        'md',
        markdownIt({
            html: true,
            breaks: true,
        })
            .use(markdownItAnchor, {
                permalink: true,
                permalinkClass:
                    'absolute ml-[-1em] pr-[0.5em] !no-underline !text-grey-400 opacity-0 group-hover:opacity-100',
            })
            .use(markdownItClass, {
                h2: 'group flex whitespace-pre-wrap',
                h3: 'group flex whitespace-pre-wrap',
            }),
    )

    return {
        dir: {
            input: 'docs/src',
            data: 'data',
            includes: 'includes',
            layouts: 'layouts',
            output: 'docs/dist',
        },
        pathPrefix:
            process.env.NODE_ENV === 'production'
                ? '/tailwindcss-opentype/'
                : '',
    }
}
