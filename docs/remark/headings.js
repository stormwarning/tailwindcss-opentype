const visit = require('unist-util-visit')

function headingClasses() {
	return (tree) => {
		visit(tree, 'heading', (node) => {
			if (node.depth === 1) return

			let data = node.data || (node.data = {})
			let props = data.hProperties || (data.hProperties = {})
			let classes = props.class || (props.class = [])

			classes.push('group flex whitespace-pre-wrap')
		})
	}
}

module.exports = headingClasses
