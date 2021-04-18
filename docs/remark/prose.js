function prose() {
    return (tree) => {
        let insideProse = false

        tree.children = tree.children.flatMap((node, i) => {
            console.log('inside:', insideProse)
            console.log('node:', node)
            // if (insideProse && isJsNode(node)) {
            //     insideProse = false
            //     return [{ type: 'jsx', value: '</div>' }, node]
            // }
            if (!insideProse) {
                insideProse = true
                return [
                    {
                        type: 'html',
                        value: '<div class="prose">',
                        // tagName: 'div',
                        // properties: { class: 'prose' },
                    },
                    node,
                    ...(i === tree.children.length - 1
                        ? [{ type: 'html', value: '</div>' }]
                        : []),
                ]
            }

            if (i === tree.children.length - 1 && insideProse) {
                return [node, { type: 'html', value: '</div>' }]
            }

            return [node]
        })
    }
}

module.exports = prose
