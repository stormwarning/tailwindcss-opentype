import fs from 'node:fs/promises'

import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

export default class Styles {
	async data() {
		return {
			permalink: 'assets/styles.css',
		}
	}

	async render() {
		let processed = await postcss([
			tailwindcss('./tailwind.config.js'),
			autoprefixer,
		]).process(await fs.readFile('./src/assets/main.css'), {
			from: undefined,
		})

		return processed.css
	}
}
