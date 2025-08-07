const eslint = require('@eslint/js');
const prettier = require('eslint-config-prettier');
const globals = require('globals');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = [
	eslint.configs.recommended,
	prettier,
	{
		languageOptions: {
			globals: {
				...globals.node
			}
		},
		plugins: {
			'unused-imports': unusedImports
		},
		rules: {
			eqeqeq: ['error', 'always'],
			curly: 'error',
			'no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'error',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_'
				}
			]
		}
	},
	{
		ignores: ['node_modules/', 'dist/', 'build/']
	}
];
