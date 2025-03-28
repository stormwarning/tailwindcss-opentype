import baseConfig from '@zazen/prettier-config'

/** @type {import('prettier').Config} */
const config = {
	...baseConfig,
	plugins: [...baseConfig.plugins, 'prettier-plugin-jinja-template'],
	overrides: [
		...baseConfig.overrides,
		{
			files: ['*.njk'],
			options: {
				parser: 'jinja-template',
			},
		},
	],
}

export default config
