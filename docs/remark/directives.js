const dedent = require('dedent')
const h = require('hastscript')
const parse = require('rehype-parse')
const unified = require('unified')
const visit = require('unist-util-visit')

function htmlDirectives() {
    function ondirective(node) {
        let data = node.data || (node.data = {})
        let children = []

        if (node.name === 'feat') {
            let tags = node.children[0].value.split(',')
            let features = dedent`
                <span aria-hidden="true" class="inline-flex self-center mx-4 h-6 w-px align-middle bg-grey-700 bg-opacity-20"></span>
                ${tags.map(
                    (
                        tag,
                    ) => `<span class="align-middle inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-grey-50 text-grey-600 tracking-tight">
                        <kbd>${tag}</kbd>
                    </span>`,
                )}
                `
                .replace(/\n/g, '')
                .replace(',', ' ')

            children = unified().use(parse).parse(features).children[0]
                .children[1].children
        }

        let hast = h(node.name, node.attributes, [children])

        data.hName = hast.tagName
        data.hProperties = hast.properties
        data.hChildren = hast.children
    }

    function transform(tree) {
        visit(
            tree,
            ['textDirective', 'leafDirective', 'containerDirective'],
            ondirective,
        )
    }

    return transform
}

module.exports = htmlDirectives
