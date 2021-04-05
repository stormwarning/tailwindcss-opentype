module.exports = {
    extends: ['@zazen/eslint-config/typescript'],
    rules: {
        // Needed due to old version of Prettier config installed by tsdx :/
        '@typescript-eslint/space-before-function-paren': 'off',
    },
    overrides: [
        {
            files: ['*.test.ts'],
            env: { jest: true },
        },
    ],
}
