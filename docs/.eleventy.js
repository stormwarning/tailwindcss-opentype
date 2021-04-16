const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const markdownItClass = require('@toycode/markdown-it-class')
const dedent = require('dedent')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ 'docs/src/public': '.' })
    eleventyConfig.addPlugin(eleventyNavigationPlugin)

    eleventyConfig.addFilter('badge', function (content) {
        return dedent`
        <span aria-hidden="true" class="inline-flex self-center mx-4 h-6 w-px align-middle bg-grey-700 bg-opacity-20"></span>
        <span class="align-middle inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-teal-100 text-teal-900 tracking-tight">
            <kbd>${content}</kbd>
        </span>`.replace(/\n/g, '')
    })

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
        // pathPrefix:
        //     process.env.NODE_ENV === 'production'
        //         ? '/tailwindcss-opentype/'
        //         : '',
    }
}
