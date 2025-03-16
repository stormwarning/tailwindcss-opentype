import postcss from 'postcss'
import tailwindcss, { type Config } from 'tailwindcss'

const css = String.raw

export async function generateCss(testConfig: Omit<Config, 'content'>) {
	let config: Config = {
		...testConfig,
		content: ['./**/*.test.ts'],
		corePlugins: { preflight: false },
	}
	let input = css`
		@tailwind utilities;
	`

	return postcss(tailwindcss(config)).process(input, { from: undefined })
}
