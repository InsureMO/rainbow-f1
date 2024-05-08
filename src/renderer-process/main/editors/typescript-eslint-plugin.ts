/**
 * TODO don't know why the @typescript-eslint/eslint-plugin cannot be imported, so use this instead temporarily. all rules disabled here
 */

export const TypescriptEslintPlugin = {
	// preferred location of name and version
	meta: {
		name: '@typescript-eslint',
		version: '7.8.0' // latest 2024/05/08
	},
	rules: {
		'no-var-requires': {
			create() {
				// report nothing now
			}
		}
	}
};
