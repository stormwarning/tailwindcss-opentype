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
					className: ['group flex whitespace-pre-wrap'],
				}

				// Let data = (node.data ??= {})
				// let properties = (data.hProperties ??= {})
				// /** @type {string[]} */
				// let classes =
				// 	typeof properties.className === 'string' ? [properties.className] : []

				// classes.push('group flex whitespace-pre-wrap')
			},
		)
	}
}
