module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        'react-native/react-native': true,
        jest: true,
    },
    settings: {
        react: { version: 'detect' },
        'import/resolver': {
            typescript: {},
        },
    },
 
 
    extends: [
        'standard-with-typescript',
        'eslint:recommended',
        'prettier',
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
    ],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    ],
    parserOptions: {
        ecmafeatures: { jsx: true },
        ecmaVersion: 'latest',
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'react-native'],
    rules: {
        'react/jsx-filename-extension': [
            'error',
            { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        ],
        'no-use-before-define': [
            'error',
            { functions: true, classes: true, variables: true },
        ],
        'react-native/no-unused-styles': 'error',
        'react-native/split-platform-components': 'error',
        'react-native/no-inline-styles': 'error',
        'react-native/no-color-literals': 'error',
        'react-native/no-raw-text': 'error',
        'react-native/no-single-element-style-arrays': 'error',
        "react/function-component-definition": [
            2,
            {
              namedComponents: "function-declaration",
            },
          ],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        'import/prefer-default-export': 'off',
        'react/react-in-jsx-scope': 'off',

        'jsx-a11y/anchor-is-valid': 'off',

        '@typescript-eslint/no-unused-vars': ['error'],

        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],

        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
 };