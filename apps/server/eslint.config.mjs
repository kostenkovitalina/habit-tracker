import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import prettierPlugin from 'eslint-plugin-prettier'
import js from '@eslint/js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
  ...compat.extends(
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended', 
    'prettier'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [['^node:'], ['^\\w'], ['^@(?!/)\\w'], ['^@/'], ['^\\./'], ['^.+\\.?(css)$']],
        },
      ],
      'no-console': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-useless-escape': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    ignores: [
      '.next/',
      'node_modules/',
      'dist/',
      '*.js',
      '*.mjs',
      './src/app/(payload)/**',
      './src/payload-types.ts',
    ],
  },
]

export default eslintConfig
