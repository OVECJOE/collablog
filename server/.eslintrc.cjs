module.exports = {
    root: true,
    env: { node: true },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    ignorePatterns: ['.eslintrc.cjs'],
    rules: {
        'prettier/prettier': [
        'error',
        {
            endOfLine: 'auto',
        },
        ],
        'import/extensions': ['error', 'always'],
        'no-underscore-dangle': 'off',
    },
};