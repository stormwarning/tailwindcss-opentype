import {
	transformerMetaWordHighlight,
	transformerNotationWordHighlight,
} from '@shikijs/transformers'
import rehypeParse from 'rehype-parse'
import { createHighlighter } from 'shiki'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * @typedef {Object} FontCredit
 * @property {string} name
 * @property {string} foundry
 * @property {string} url
 */

/** @type {Record<string, FontCredit>} */
const FONT_CREDITS = {
	allan: {
		name: 'Allan Regular',
		foundry: 'Anton Koovit',
		url: 'https://fonts.google.com/specimen/Allan',
	},
	caflisch: {
		name: 'Caflisch Script Pro Regular',
		foundry: 'Adobe Originals',
		url: 'https://fonts.adobe.com/fonts/caflisch-script',
	},
	exo: {
		name: 'Exo Medium',
		foundry: 'Natanael Gama',
		url: 'https://fonts.google.com/specimen/Exo',
	},
	garamond: {
		name: 'EB Garamond Semibold',
		foundry: 'Georg Mayr-Duffner',
		url: 'https://googlefonts.github.io/ebgaramond-specimen/',
	},
	hypatia: {
		name: 'Hypatia Sans Pro',
		foundry: 'Adobe Originals',
		url: 'https://fonts.adobe.com/fonts/hypatia-sans',
	},
	inter: {
		name: 'Inter',
		foundry: 'Rasmus Andersson',
		url: 'https://rsms.me/inter/',
	},
	warnock: {
		name: 'Warnock Pro Bold',
		foundry: 'Adobe Originals',
		url: 'https://fonts.adobe.com/fonts/warnock',
	},
}

/**
 * @typedef {import('hast').Element} HastElement
 * @typedef {import('hast').Root} HastRoot
 */

const highlighter = await createHighlighter({
	themes: ['dracula'],
	langs: ['html', 'js'],
})

export function remarkSample() {
	/** @param {import('mdast').Root} tree */
	return (tree) => {
		visit(tree, 'code', (node) => {
			/** @type {HastElement[]} */
			let figureContents = []
			let snippetCode = node.value

			if (node.lang === 'html' && node.value.includes('<template')) {
				let previewCode = ''
				/** @type {FontCredit | undefined} */
				let fontDetails

				snippetCode = node.value
					.trim()
					.replace(
						/<template\s+(?:credit="([^"]*)"\s+)?preview(?:\s+class="([^"]*)")?>(.*?)<\/template>/is,
						/**
						 * @param {string} credit
						 * @param {string} content
						 */
						(m, credit, class2, content) => {
							fontDetails = FONT_CREDITS[credit]
							previewCode = content
							return ''
						},
					)
					.trim()

				if (fontDetails) {
					let { name, foundry, url } = fontDetails
					let captionHast = /** @type {HastElement[]} */ (
						unified()
							.use(rehypeParse, { fragment: true })
							.parse(
								`Set in <strong>${name}</strong> by <a href="${url}">${foundry}</a>.`,
							).children
					)

					figureContents.push({
						type: 'element',
						tagName: 'figcaption',
						properties: {
							class: ['self-end p-1 text-xs'],
						},
						children: captionHast,
					})
				}

				let previewHast = /** @type {HastElement[]} */ (
					unified().use(rehypeParse, { fragment: true }).parse(previewCode)
						.children
				)

				figureContents.push({
					type: 'element',
					tagName: 'div',
					properties: {
						class: ['code-sample'],
					},
					children: [
						{
							type: 'element',
							tagName: 'div',
							properties: {
								class:
									'not-prose text-grey-600 whitespace-nowrap overflow-auto rounded-lg bg-white outline outline-white/5 dark:text-gray-400 dark:bg-gray-950/50 p-8',
							},
							children: previewHast,
						},
					],
				})
			}

			let codeHast = highlighter.codeToHast(snippetCode, {
				lang: node.lang ?? '',
				meta: { __raw: node.meta ?? '' },
				theme: 'dracula',
				transformers: [
					{
						pre(node) {
							this.addClassToHast(
								node,
								'scrollbar-none overflow-x-auto !m-0 !p-6 text-sm leading-snug',
							)
						},
					},
					transformerNotationWordHighlight({
						classActiveWord: 'code-highlight',
					}),
					transformerMetaWordHighlight({ className: 'code-highlight' }),
				],
			})

			figureContents.push(codeBlockWrapper(codeHast))

			let figure = figureElement(figureContents)

			// @ts-expect-error -- Prevent this block from being wrapped in a `pre` element.
			node.type = 'code-sample'
			node.data ??= {}

			node.data.hName = 'div'
			node.data.hProperties = {
				className: ['not-prose isolate'],
			}
			node.data.hChildren = [figure]
		})
	}
}

/**
 * @param {HastRoot} child
 * @returns {HastElement}
 */
function codeBlockWrapper(child) {
	return {
		type: 'element',
		tagName: 'div',
		properties: {
			class: 'bg-gray-950 -mb-1 -mx-1 rounded-xl',
		},
		children: [
			{
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
						children: /** @type {HastElement[]} */ (child.children),
					},
				],
			},
		],
	}
}

/**
 * @param {HastElement[]} children
 * @returns {HastElement}
 */
function figureElement(children) {
	let classes =
		children.length > 1
			? 'flex flex-col gap-1 rounded-xl bg-gray-950/5 p-1 inset-ring inset-ring-gray-950/5 dark:bg-white/10 dark:inset-ring-white/10'
			: ''

	return {
		type: 'element',
		tagName: 'figure',
		properties: {
			class: classes,
		},
		children: [...children],
	}
}
