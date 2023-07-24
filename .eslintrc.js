module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
  ],
  parser: 'vue-eslint-parser',
  plugins: [
    'vue',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    "vue/order-in-components": 0,
    "vue/require-explicit-emits": 0,
    "vue/v-on-event-hyphenation": 0,
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue'],
      },
    },
  },
};