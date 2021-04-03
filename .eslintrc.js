module.exports = {
    extends: ['@zazen/eslint-config/typescript'],
    rules: {
        '@typescript-eslint/indent': ['error', 4],
    },
    overrides: [
        {
            files: ['*.test.ts'],
            env: { jest: true },
        },
    ],
}
