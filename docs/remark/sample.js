import dedent from 'dedent'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index.js'
import parse from 'rehype-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

loadLanguages()

const previewBackground = {
	amber: 'bg-gradient-to-r from-amber-50 to-amber-100 accent-amber',
	orange: 'bg-gradient-to-r from-orange-50 to-orange-100 accent-orange',
	rose: 'bg-gradient-to-r from-rose-50 to-rose-100 accent-rose',
	fuchsia: 'bg-gradient-to-r from-fuchsia-50 to-fuchsia-100 accent-fuchsia',
	indigo: 'bg-gradient-to-r from-indigo-50 to-indigo-100 accent-indigo',
	emerald: 'bg-gradient-to-r from-emerald-50 to-teal-100 accent-emerald',
}

/**
 * @param {string} code
 * @param {string} prismLanguage
 * @returns {string}
 */
function highlightCode(code, prismLanguage) {
	let isDiff = prismLanguage.startsWith('diff-')
	let language = isDiff ? prismLanguage.slice(5) : prismLanguage
	/** @type {import('prismjs').Grammar} */
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	let grammar = Prism.languages[isDiff ? 'diff' : language]

	if (!grammar) {
		// eslint-disable-next-line no-console
		console.warn(`Unrecognised language: ${prismLanguage}`)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return Prism.util.encode(code)
	}

	let highlighted = Prism.highlight(code, grammar, prismLanguage)

	return language === 'html'
		? highlighted.replaceAll(
				/\*\*(.*?)\*\*/g,
				(_, text) =>
					`<span class="code-highlight bg-code-highlight">${text}</span>`,
			)
		: highlighted
}

export function remarkSample() {
	/** @param {import('@types/mdast').Root} tree */
	return (tree) => {
		visit(tree, 'code', (node) => {
			if (node.lang !== 'html') return

			let hasPreview = false
			//
			// let previewClassName
			let previewCode
			let snippetCode = node.value
				.replace(
					/<template\s+(?:class="([^"]*)"\s+)?preview(?:\s+class="([^"]*)")?>(.*?)<\/template>/is,
					/** @param {string} content */
					(m, class1, class2, content) => {
						hasPreview = true
						//
						// previewClassName = class1 || class2
						previewCode = content
						return ''
					},
				)
				.trim()

			if (!hasPreview) return
			snippetCode ||= previewCode

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
								/** @todo Fix type information here. */
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								children: previewHast.children[0].children[1].children,
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
								children: node.data?.hChildren ?? [
									snippetHast.children[0].children[1],
								],
							},
						],
					},
				],
			}

			let n = node

			n.type = 'code-sample'
			n.data ??= {}

			n.data.hName = 'div'
			n.data.hProperties = {
				className: ['relative overflow-hidden mb-8'],
			}
			n.data.hChildren = [preview, snippet]
		})
	}
}
