const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin)

    eleventyConfig.addPassthroughCopy('docs/src/assets')

    return {
        dir: {
            input: 'docs/src',
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
