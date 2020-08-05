module.exports = {
    env: { node: true },
    parserOptions: {
        ecmaVersion: 2020,
    },
    extends: ['plugin:prettier/recommended', 'plugin:node/recommended'],
    rules: {
        'prettier/prettier': 'error',
    },
}
