module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        files: ['*.ts', '*.tsx'],
        project: 'tsconfig.json',
        sourceType: 'module',
    },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'simple-import-sort'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-console': 2,
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@next/next/no-img-element': 'off',
  },
  overrides: [
    {
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
      files: ['**/*.js', '**/*.ts',],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // `@nestjs` first,
              ['^@nestjs'],
              // Packages starting with a character
              ['^[a-z]'],
              // Packages starting with `@`
              ['^@'],
              // Packages starting with `~`
              ['^~'],
              // Packages starting with `~~`
              ['^~~'],
              // Imports starting with `../`
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Imports starting with `./`
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Side effect imports
              ['^\\u0000'],
            ],
          },
        ],
      },
    },
  ],
};
