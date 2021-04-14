const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin)

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
