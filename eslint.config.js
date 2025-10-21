import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // Ігноруємо технічні папки
  globalIgnores(['dist', 'node_modules', 'build']),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
    },

    extends: [
      js.configs.recommended, // тільки базовий ESLint
    ],

    rules: {
      // React правила
      'react/jsx-uses-react': 'off', // React 17+ не потребує
      'react/react-in-jsx-scope': 'off',

      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // React Refresh (Vite)
      'react-refresh/only-export-components': 'off',

      // Імпорти
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
        },
      ],

      // Доступність JSX
      'jsx-a11y/alt-text': 'warn',

      // Загальні правила
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]);
