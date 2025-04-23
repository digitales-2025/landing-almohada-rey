import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

// Configuraciones base de Next.js
const nextConfigs = compat.extends('next', 'next/core-web-vitals', 'prettier');

// Configuración global para todos los archivos
const globalConfig = {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'public/**'],
    plugins: {
        prettier: prettierPlugin,
    },
    rules: {
        '@next/next/no-img-element': 'off',
        'prettier/prettier': 'error',
        camelcase: 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/no-unused-prop-types': 'off',
        'react/require-default-props': 'off',
        'react/no-unescaped-entities': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                js: 'never',
                jsx: 'never',
            },
        ],
        'no-restricted-imports': [
            'error',
            {
                name: 'next/link',
                message: 'Please import from `@/i18n/navigation` instead.',
            },
            {
                name: 'next/navigation',
                importNames: [
                    'redirect',
                    'permanentRedirect',
                    'useRouter',
                    'usePathname',
                ],
                message: 'Please import from `@/i18n/navigation` instead.',
            },
        ],
    },
};

// Configuración específica para archivos TypeScript
const tsConfig = {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
    },
};

// Usa las configuraciones de TypeScript de Next.js
const nextTsConfigs = compat.extends('next/typescript');

export default [globalConfig, ...nextConfigs, ...nextTsConfigs, tsConfig];
