// @ts-nocheck

import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fixupPluginRules } from '@eslint/compat';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginTailwind from 'eslint-plugin-tailwindcss';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
  },
  {
    plugins: {
      'react': eslintPluginReact,
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
      'tailwindcss': eslintPluginTailwind,
    },
  },
  {
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
);
