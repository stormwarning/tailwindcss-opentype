const dedent = require('dedent')
const h = require('hastscript')
const toHast = require('mdast-util-to-hast')
const parse = require('rehype-parse')
const unified = require('unified')
const visit = require('unist-util-visit')

function htmlDirectives() {
    function ondirective(node) {
        let data = node.data || (node.data = {})
        let hast = h(node.name, node.attributes)
        let children = []

        switch (node.name) {
            case 'feat': {
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
                hast = h(node.name, node.attributes, [children])
                data.hChildren = hast.children
                break
            }

            case 'reminder': {
                let icon = dedent`
                <svg class="flex-none h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>`
                let existing = toHast(node).children[0]
                let child = unified().use(parse).parse(icon).children[0]
                    .children[1].children

                existing.properties.class = '!m-0'
                console.log(existing)
                hast = h(
                    'div',
                    { class: 'flex gap-4 p-4 bg-grey-100 rounded-lg' },
                    [child, existing],
                )
                data.hName = hast.tagName
                data.hProperties = hast.properties
                data.hChildren = hast.children
                break
            }

            default:
                data.hName = hast.tagName
                data.hProperties = hast.properties
        }
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
