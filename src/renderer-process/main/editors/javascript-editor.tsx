import {indentWithTab} from '@codemirror/commands';
import {esLint, javascript} from '@codemirror/lang-javascript';
import {linter, lintGutter} from '@codemirror/lint';
import {EditorState as CodeMirrorState} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import * as eslint from 'eslint-linter-browserify';
import globals from 'globals';
import {ModuleFileResource} from '../opened/types';
import {useCodeMirrorEditor} from './code-mirror-editor';
import {TypescriptEslintPlugin} from './typescript-eslint-plugin';
import {EditorPanel} from './widgets';

export interface JavascriptEditorProps {
	resource: ModuleFileResource;
}

export const JavascriptEditor = (props: JavascriptEditorProps) => {
	const {resource} = props;

	const {ref} = useCodeMirrorEditor({
		resource, createConfigState: (options) => {
			return CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					javascript(),
					lintGutter(),
					linter(esLint(new eslint.Linter(), {
						// eslint configuration
						languageOptions: {
							globals: {...globals.node}
							// use default latest and module
							// parserOptions: {ecmaVersion: 2022, sourceType: 'module'},
						},
						linterOptions: {
							reportUnusedDisableDirectives: false
						},
						plugins: {
							'@typescript-eslint': TypescriptEslintPlugin
						},
						rules: {
							'no-extra-semi': 'off',
							'@typescript-eslint/no-var-requires': 'off'
							// ...tslint.rules
							// semi: ['error', 'never'],
						}
					})),
					...options.extensions
				]
			});
		}
	});

	return <EditorPanel ref={ref}/>;
};