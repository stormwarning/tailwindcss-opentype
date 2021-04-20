const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/')
loadLanguages()
require('./prism-diff-highlight')(Prism)
const visit = require('unist-util-visit')
const unified = require('unified')
const parse = require('rehype-parse')
const dedent = require('dedent')

const previewBackground = {
    amber: 'bg-gradient-to-r from-amber-50 to-amber-100 accent-amber',
    orange: 'bg-gradient-to-r from-orange-50 to-orange-100 accent-orange',
    rose: 'bg-gradient-to-r from-rose-50 to-rose-100 accent-rose',
    fuchsia: 'bg-gradient-to-r from-fuchsia-50 to-fuchsia-100 accent-fuchsia',
    indigo: 'bg-gradient-to-r from-indigo-50 to-indigo-100 accent-indigo',
    emerald: 'bg-gradient-to-r from-emerald-50 to-teal-100 accent-emerald',
}

function highlightCode(code, prismLanguage) {
    let isDiff = prismLanguage.startsWith('diff-')
    let language = isDiff ? prismLanguage.substr(5) : prismLanguage
    let grammar = Prism.languages[isDiff ? 'diff' : language]

    if (!grammar) {
        // eslint-disable-next-line no-console
        console.warn(`Unrecognised language: ${prismLanguage}`)
        return Prism.util.encode(code)
    }

    let highlighted = Prism.highlight(code, grammar, prismLanguage)

    return language === 'html'
        ? highlighted.replace(
              /\*\*(.*?)\*\*/g,
              (_, text) =>
                  `<span class="code-highlight bg-code-highlight">${text}</span>`,
          )
        : highlighted
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

            snippetCode = highlightCode(dedent(snippetCode).trim(), 'html')
            let snippetHast = unified().use(parse).parse(snippetCode)

            let meta = node.meta ? node.meta.trim().split(/\s+/) : []
            let color = meta.find((x) => !/^resizable(:|$)/.test(x))

            let previewHast = unified().use(parse).parse(previewCode)
            let preview = {
                type: 'element',
                tagName: 'div',
                properties: {
                    class: [
                        'rounded-t-xl overflow-hidden code-sample',
                        previewBackground[color],
                    ],
                },
                children: [
                    {
                        type: 'element',
                        tagName: 'div',
                        properties: {
                            class: 'flex overflow-x-auto',
                        },
                        children: [
                            {
                                type: 'element',
                                tagName: 'div',
                                properties: {
                                    class:
                                        'p-10 text-grey-600 mix-blend-multiply whitespace-nowrap',
                                },
                                children:
                                    previewHast.children[0].children[1]
                                        .children,
                            },
                        ],
                    },
                ],
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
                                    snippetHast.children[0].children[1],
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
