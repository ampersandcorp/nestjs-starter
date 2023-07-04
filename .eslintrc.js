module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: "module",
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    "src/**/*.spec.ts",
    "tests/**/*.ts",
  ],
  rules: {
    'init-declarations': 'off',
    'no-dupe-class-members': 'off',
    'no-implied-eval': 'off',
    'no-invalid-this': 'off',
    'no-magic-numbers': 'off',
    'no-redeclare': 'off',
    'no-unused-vars': 'off',
    'semi': 'off',
    'quotes': 'off',
    'brace-style': 'off',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    "@typescript-eslint/init-declarations": "error",
    "@typescript-eslint/no-empty-interface": "warn",
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'semi',
          'requireLast': true,
        },
        'singleline': {
          'delimiter': 'semi',
          'requireLast': true,
        },
      },
    ],
    '@typescript-eslint/method-signature-style': [
      'error',
      'method',
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'variable',
        'modifiers': ['const'],
        'format': ['UPPER_CASE', 'camelCase'],
      },
      {
        'selector': 'variable',
        'modifiers': ['exported'],
        'format': [],
      },
      {
        'selector': 'variable',
        'modifiers': ['unused'],
        'format': ['camelCase'],
        'leadingUnderscore': 'require',
      },
      {
        'selector': 'accessor',
        'modifiers': ['static'],
        'format': ['UPPER_CASE'],
      },
      {
        'selector': 'enumMember',
        'format': ['UPPER_CASE'],
      },
      {
        'selector': 'class',
        'format': ['PascalCase'],
      },
      {
        'selector': 'interface',
        'format': ['PascalCase'],
      },
      {
        'selector': 'typeAlias',
        'format': ['PascalCase'],
      },
      {
        'selector': 'enum',
        'format': ['UPPER_CASE', 'PascalCase'],
      },
      {
        'selector': 'typeParameter',
        'format': ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        'ignoreEnums': true,
        'ignoreNumericLiteralTypes': true,
        'ignoreReadonlyClassProperties': true,
        'ignoreTypeIndexes': true,
      }
    ],
    '@typescript-eslint/no-redeclare': 'warn',
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    '@typescript-eslint/no-type-alias': [
      'error',
      {
        'allowAliases': 'always',
        'allowCallbacks': 'never',
        'allowConditionalTypes': 'always',
        'allowConstructors': 'never',
        'allowLiterals': 'never',
        'allowMappedTypes': 'always',
        'allowTupleTypes': 'always',
        'allowGenerics': 'always',
      }
    ],
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-useless-empty-export': 'error',
    '@typescript-eslint/non-nullable-type-assertion-style': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-return-this-type': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single'
    ],
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/brace-style': [
      'error',
      '1tbs',
      {
        'allowSingleLine': true,
      },
    ],
  },
};
