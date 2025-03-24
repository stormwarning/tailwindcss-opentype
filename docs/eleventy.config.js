/* eslint-disable @typescript-eslint/no-unsafe-call */

import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import eleventyRemark from '@fec/eleventy-plugin-remark'
import dedent from 'dedent'
import { rehype } from 'rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { remark } from 'remark'
import remarkDirective from 'remark-directive'

import { remarkDirectives } from './remark/directives.js'
import { remarkHeadings } from './remark/headings.js'
import { remarkSample } from './remark/sample.js'

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default async function config(eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		'src/assets/fonts': './assets/fonts',
	})
	eleventyConfig.addPassthroughCopy({
		'src/assets/images': './assets/images',
	})
	eleventyConfig.addPassthroughCopy({ 'src/public': '.' })

	eleventyConfig.addPairedShortcode(
		'navitem',
		(content, url, isSelected, isInactive) => {
			let tag = ''

			if (isInactive) {
				tag = `<span class="px-3 py-2 relative block text-grey-400">${content}</span>`
			} else {
				let linkClass = [
					'px-3 py-2 transition-colors duration-200 relative block',
					isSelected && 'text-sky-700',
					!isSelected && 'hover:text-grey-900 text-grey-500',
				].join(' ')

				tag = dedent`<a class="${linkClass}" href="${url}">
						<span class="rounded-md absolute inset-0 bg-sky-50 ${
							!isSelected && 'opacity-0'
						}"></span>
						<span class="relative">${content}</span>
					</a>`
			}

			return `<li>${tag}</li>`
		},
	)

	eleventyConfig.addPlugin(eleventyNavigationPlugin)
	eleventyConfig.addPlugin(eleventyRemark, {
		plugins: [
			remarkHeadings,
			remarkDirective,
			remarkDirectives,
			remarkSample,
			// Require('./remark/prose'),
		],
	})

	eleventyConfig.addTransform(
		'rehype',
		/** @param {string} content */ async (content, outputPath) => {
			let newContent = content

			if (outputPath?.endsWith('.html')) {
				let result = await rehype()
					.use(rehypeSlug)
					.use(rehypeAutolinkHeadings, {
						test: (element, index, parent) => parent.tagName !== 'nav',
						properties: {
							class:
								'absolute ml-[-0.75em] md:ml-[-1em] pr-[0.5em] !no-underline !text-grey-400 opacity-0 group-hover:opacity-100',
						},
						content: {
							type: 'text',
							value: '¶',
						},
					})
					.process(content)

				newContent = result.toString()
			}

			return newContent
		},
	)

	return {
		dir: {
			input: 'src',
			data: 'data',
			includes: 'includes',
			layouts: 'layouts',
			output: 'dist',
		},
		// PathPrefix:
		//     process.env.NODE_ENV === 'production'
		//         ? '/tailwindcss-opentype/'
		//         : '',
	}
}
