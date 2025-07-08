import dedent from 'dedent'
import { h } from 'hastscript'
import { toHast } from 'mdast-util-to-hast'
import parse from 'rehype-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

export function remarkDirectives() {
	/** @param {import('mdast').Root} tree */
	return (tree) => {
		visit(
			tree,
			['textDirective', 'leafDirective', 'containerDirective'],
			(node) => {
				if (
					node.type === 'containerDirective' ||
					node.type === 'leafDirective' ||
					node.type === 'textDirective'
				) {
					let data = (node.data ??= {})
					/** @type {import('hast').Element} */
					let hast = h(node.name, node.attributes)
					let children = []

					switch (node.name) {
						case 'feat': {
							let tags =
								node.children.length > 0 && node.children[0].type === 'text'
									? node.children[0].value.split(',')
									: undefined
							let features = dedent`
								<span aria-hidden="true" class="inline-flex self-center mx-4 h-6 w-px align-middle bg-grey-900/10 dark:bg-white/15"></span>
								${tags.map((tag) => markupTagText(tag))}
							`
								.replaceAll('\n', '')
								.replaceAll('\t', '')
								.replace(',', ' ')

							let parsed = unified().use(parse).parse(features)
							let html = parsed.children[0]

							/** @todo Fix type information here. */
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							children = html.children[1].children

							hast = h(node.name, node.attributes, [children])
							data.hProperties = {
								class: 'not-prose',
							}
							data.hChildren = hast.children
							break
						}

						case 'reminder': {
							let icon = dedent`
								<svg class="flex-none h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
								</svg>`
							let existing = toHast(node.children[0])
							/** @todo Fix type information here. */
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
			},
		)
	}
}

function markupTagText(tag) {
	return dedent`<span class="align-middle inline-flex items-center px-3 py-1 rounded-full text-xs font-medium leading-4 bg-grey-50 text-grey-600 tracking-tight dark:bg-grey-900 dark:text-gray-400">
		<kbd>${tag}</kbd>
	</span>`
}
