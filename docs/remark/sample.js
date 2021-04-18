const visit = require('unist-util-visit')
const unified = require('unified')
const parse = require('rehype-parse')

const previewBackground = {
    amber: 'bg-gradient-to-r from-amber-50 to-amber-100 accent-amber',
    orange: 'bg-gradient-to-r from-orange-50 to-orange-100 accent-orange',
    rose: 'bg-gradient-to-r from-rose-50 to-rose-100 accent-rose',
    fuchsia: 'bg-gradient-to-r from-fuchsia-50 to-fuchsia-100 accent-fuchsia',
    indigo: 'bg-gradient-to-r from-indigo-50 to-indigo-100 accent-indigo',
    emerald: 'bg-gradient-to-r from-emerald-50 to-teal-100 accent-emerald',
}

function codeSample() {
    return (tree) => {
        visit(tree, 'code', (node) => {
            if (node.lang !== 'html') return

            let hasPreview = false
            // let previewClassName
            let previewCode
            let snippetCode = node.value
                .replace(
                    /<template\s+(?:class="([^"]*)"\s+)?preview(?:\s+class="([^"]*)")?>(.*?)<\/template>/is,
                    (m, class1, class2, content) => {
                        hasPreview = true
                        // previewClassName = class1 || class2
                        previewCode = content
                        return ''
                    },
                )
                .trim()

            if (!hasPreview) return
            if (!snippetCode) snippetCode = previewCode

            let meta = node.meta ? node.meta.trim().split(/\s+/) : []
            let color = meta.find((x) => !/^resizable(:|$)/.test(x))

            let previewHast = unified().use(parse).parse(previewCode)
            let preview = {
                type: 'element',
                tagName: 'div',
                properties: {
                    class: [
                        'rounded-t-xl overflow-hidden p-10 code-sample',
                        previewBackground[color],
                    ],
                },
                children: [previewHast.children[0].children[1].children[0]],
            }

            let snippet = {
                type: 'element',
                tagName: 'div',
                properties: { class: 'overflow-hidden rounded-b-xl' },
                children: [
                    {
                        type: 'element',
                        tagName: 'pre',
                        properties: {
                            class: `scrollbar-none overflow-x-auto !m-0 !p-6 text-sm leading-snug !rounded-none language-${node.lang} text-white`,
                        },
                        children: [
                            {
                                type: 'element',
                                tagName: 'code',
                                properties: { class: 'language-html' },
                                children: (node.data &&
                                    node.data.hChildren) || [
                                    {
                                        type: 'text',
                                        value: snippetCode,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }

            let n = node

            n.type = 'code-sample'
            if (!n.data) n.data = {}

            n.data.hName = 'div'
            n.data.hProperties = {
                className: ['relative overflow-hidden mb-8'],
            }
            n.data.hChildren = [preview, snippet]
        })
    }
}

module.exports = codeSample
