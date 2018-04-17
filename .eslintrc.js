module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true
    },
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        'space-before-function-paren': ['error', {
            'anonymous': 'ignore',
            'named': 'ignore',
            'asyncArrow': 'always'
        }],
        'comma-dangle': ['error', {
            'arrays': 'ignore',
            'objects': 'ignore'
        }],
        'semi': 0, //['error', 'always'],
        'indent': ['off', 4],
        'eol-last': 0,
        'no-unused-vars': ['warn'],
        'space-before-function-paren': 'off',
        'operator-linebreak': ['error', 'after']
    },
    globals: {}
}