import dedent from 'dedent'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index.js'
import parse from 'rehype-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

loadLanguages()

const previewBackground = {
	amber: 'accent-amber',
	orange: 'accent-orange',
	rose: 'accent-rose',
	fuchsia: 'accent-fuchsia',
	indigo: 'accent-indigo',
	emerald: 'accent-emerald',
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
					class: ['code-sample', previewBackground[color]],
				},
				children: [
					{
						type: 'element',
						tagName: 'div',
						properties: {
							class:
								'not-prose text-grey-600 whitespace-nowrap overflow-auto rounded-lg bg-white outline outline-white/5 dark:text-gray-400 dark:bg-gray-950/50 p-8',
						},
						/** @todo Fix type information here. */
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						children: previewHast.children[0].children[1].children,
					},
				],
			}

			let snippet = {
				type: 'element',
				tagName: 'div',
				properties: {
					class:
						'dark:bg-white/5 dark:inset-ring dark:inset-ring-white/10 not-prose p-1 rounded-xl scheme-dark text-sm',
				},
				children: [
					{
						type: 'element',
						tagName: 'div',
						properties: {
							class:
								'*:flex *:*:max-w-none *:*:shrink-0 *:*:grow *:overflow-auto *:rounded-lg *:bg-white/10! *:p-5 dark:*:bg-white/5! **:[.line]:isolate **:[.line]:not-last:min-h-[1lh] *:inset-ring *:inset-ring-white/10 dark:*:inset-ring-white/5',
						},
						children: [
							{
								type: 'element',
								tagName: 'pre',
								properties: {
									class: `scrollbar-none overflow-x-auto !m-0 !p-6 text-sm leading-snug language-${node.lang} text-white`,
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
					},
				],
			}

			let codeBlock = {
				type: 'element',
				tagName: 'div',
				properties: {
					class: 'bg-gray-950 -mb-1 -mx-1 rounded-xl',
				},
				children: [snippet],
			}

			let figure = {
				type: 'element',
				tagName: 'figure',
				properties: {
					class:
						'flex flex-col gap-1 rounded-xl bg-gray-950/5 p-1 inset-ring inset-ring-gray-950/5 dark:bg-white/10 dark:inset-ring-white/10',
				},
				children: [preview, codeBlock],
			}

			let n = node

			n.type = 'code-sample'
			n.data ??= {}

			n.data.hName = 'div'
			n.data.hProperties = {
				className: ['not-prose isolate'],
			}
			n.data.hChildren = [figure]
		})
	}
}
