// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const path = require('node:path')

/** @type {import('eslint').Linter.Config} */
const config = {
	extends: [
		'@zazen',
		'@zazen/eslint-config/node',
		'@zazen/eslint-config/typescript',
	],
	env: {
		node: true,
	},
	ignorePatterns: ['dist', '*.njk'],
	parserOptions: {
		project: [path.resolve(__dirname, 'tsconfig.json')],
	},
	rules: {
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/lines-between-class-members': 'off',
		'@typescript-eslint/padding-line-between-statements': 'off',

		/**
		 * Currently conflicting with 'yoda' and 'unicorn/explicit-length-check'.
		 */
		'etc/prefer-less-than': 'off',

		'n/file-extension-in-import': ['error', 'always'],

		'no-multi-assign': 'off',
	},
	overrides: [
		{
			// Jest config
			files: ['**/__tests__/**/*.{js,ts,tsx}', '**/*.@(spec|test).{js,ts,tsx}'],
			env: {
				jest: true,
			},
			rules: {
				'import/no-extraneous-dependencies': 'off',
			},
		},
		{
			files: ['**/*.d.ts'],
			rules: {
				// Prevent conflicts with `import/no-mutable-exports`.
				'prefer-let/prefer-let': 'off',
			},
		},
		{
			files: ['docs/**/*.js', '*.config.js'],
			rules: {
				'import/no-extraneous-dependencies': 'off',
			},
		},
	],
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
module.exports = config
