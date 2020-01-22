module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'comma-dangle': 0,
    'no-console': 0,
    'vue/html-self-closing': ['error', {
      html: {
        'void': 'any',
      }
    }]
  },
  globals: {
    document: true
  }
}
