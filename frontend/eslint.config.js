import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist/', 'node_modules/'],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': ['off'],
      'no-shadow': 'off',
      'max-len': 'off',
      'arrow-parens': ['error', 'as-needed'],
      'implicit-arrow-linebreak': 'off',
      'no-param-reassign': 'off',
      'dot-notation': 'off',
      'no-underscore-dangle': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'operator-linebreak': ['error', 'after'],
      'no-multiple-empty-lines': 'off',
      'import/no-extraneous-dependencies': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto', singleQuote: true }],
    },
    plugins: {
      prettier: prettierPlugin,
    },
  },
  pluginJs.configs.recommended,
  prettier,
];
