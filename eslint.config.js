import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import love from 'eslint-config-love'
import stylistic from '@stylistic/eslint-plugin'


export default tseslint.config(
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    commaDangle: 'never',
    arrowParens: 'always',
    quoteProps: 'as-needed'
  }),
  { ignores: ['dist', 'eslint.config.js'] },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      love
    ],
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off'
    }
  }
)