import { visit } from 'unist-util-visit'

export function remarkHeadings() {
	/** @param {import('mdast').Root} tree */
	return (tree) => {
		visit(
			tree,
			'heading',
			/** @param {import('mdast').Heading} node */ (node) => {
				if (node.depth === 1) return

				node.data ??= {}
				node.data.hProperties = {
					className: ['group flex gap-4 whitespace-pre-wrap'],
				}
			},
		)
	}
}
