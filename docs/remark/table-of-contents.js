import { headingRank } from 'hast-util-heading-rank'
import { h } from 'hastscript'
import { remove } from 'unist-util-remove'
import { visit } from 'unist-util-visit'

import classnames from '../src/data/classnames.js'

/**
 * @typedef {Object} HeadingObject
 * @property {number} rank
 * @property {string} id
 * @property {string} text
 * @property {HeadingObject[]} children
 */

const HEADINGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

export function rehypeTableOfContents(hasReference = false) {
	/** @param {import('hast').Root} tree */
	return (tree) => {
		/** @type {HeadingObject[]} */
		let headings = []

		remove(
			tree,
			(node) =>
				'tagName' in node &&
				!HEADINGS.has(/** @type {string} */ (node.tagName)),
		)

		visit(
			tree,
			'element',
			/** @param {import('hast').Element} node */ (node, index) => {
				let rank = headingRank(node)
				if (rank && node.properties.id) {
					let newHeading = {
						rank,
						id: String(node.properties.id),
						text: String(
							node.children.find((child) => child.type === 'text')?.value,
						),
						children: [],
					}

					if (headings.length > 0) {
						let parentIndex = headings.length - 1

						while (parentIndex >= 0) {
							if (headings[parentIndex].rank < rank) {
								headings[parentIndex].children.push(newHeading)
								break
							}
							parentIndex--
						}

						if (parentIndex < 0) headings.push(newHeading)
					} else {
						headings.push(newHeading)
					}
				}
			},
		)

		/**
		 * @param {string} id
		 * @param {string} text
		 * @param {boolean} [nested]
		 * @returns
		 */
		function buildAnchor(id, text, nested = false) {
			let classNames = `${classnames.commonTextClass} ${classnames.anchorClass} ${nested ? 'sm:pl-7.5' : ''}`
			return h('a', { class: classNames, href: `#${id}` }, [text])
		}

		visit(tree, 'root', (node) => {
			node.children = [
				h('ul', { class: classnames.listClass }, [
					hasReference
						? h('li', { class: classnames.listItemClass }, [
								buildAnchor('quick-reference', 'Quick reference'),
							])
						: undefined,
					headings.map((item, index) =>
						h('li', { class: classnames.listItemClass }, [
							buildAnchor(item.id, item.text),
							item.children.length > 0
								? h('ul', { class: classnames.listClass }, [
										item.children.map((subItem) =>
											h('li', { class: classnames.listItemClass }, [
												buildAnchor(subItem.id, subItem.text, true),
											]),
										),
									])
								: null,
						]),
					),
				]),
			]
		})
	}
}
