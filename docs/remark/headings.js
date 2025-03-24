import { visit } from 'unist-util-visit'

export function remarkHeadings() {
	/** @param {import('@types/mdast').Root} tree */
	return (tree) => {
		visit(
			tree,
			'heading',
			/** @param {import('@types/mdast').Heading} node */ (node) => {
				if (node.depth === 1) return

				let data = (node.data ??= {})
				let properties = (data.hProperties ??= {})
				/** @type {string[]} */
				let classes = (properties.class ??= [])

				classes.push('group flex whitespace-pre-wrap')
			},
		)
	}
}
