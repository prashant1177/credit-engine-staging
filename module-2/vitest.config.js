// vitest.config.js
const { defineConfig } = require('vitest/config');
const path = require('path');

module.exports = defineConfig({
	alias: {
		'@': path.resolve(__dirname, './src')
	},
	test: {
		environment: 'node',
		include: ['src/tests/**/*.test.ts', 'src/tests/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			reportsDirectory: './coverage'
		}
	}
});
