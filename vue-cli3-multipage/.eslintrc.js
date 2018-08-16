module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/prettier'
    ],
    rules: {
        'no-console': process.env.VUE_APP_CURRENTMODE === 'production' ? 'error' : 'off',
        'no-debugger': process.env.VUE_APP_CURRENTMODE === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
