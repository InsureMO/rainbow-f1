import {indentWithTab} from '@codemirror/commands';
import {javascript} from '@codemirror/lang-javascript';
import {lintGutter} from '@codemirror/lint';
import {EditorState as CodeMirrorState} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import {ModuleFileResource} from '../opened/types';
import {MissedContent} from './missed-content';
import {useCodeMirrorEditor} from './use-code-mirror-editor';
import {CodeMirrorEditorPanel} from './widgets';

export interface TypescriptEditorProps {
	resource: ModuleFileResource;
}

export const TypescriptEditor = (props: TypescriptEditorProps) => {
	const {resource} = props;

	const {ref, message} = useCodeMirrorEditor({
		resource, createConfigState: (options) => {
			return CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					javascript({typescript: true}),
					lintGutter(),
					// TODO ignore linter here, no idea about typescript lint for code mirror
					// linter(esLint(new eslint.Linter(), {
					// 	// eslint configuration
					// 	languageOptions: {
					// 		globals: {...globals.node}
					// 		// use default latest and module
					// 		// parserOptions: {ecmaVersion: 2022, sourceType: 'module'},
					// 	},
					// 	linterOptions: {
					// 		reportUnusedDisableDirectives: false
					// 	},
					// 	plugins: {
					// 		'@typescript-eslint': TypescriptEslintPlugin
					// 	},
					// 	rules: {
					// 		'no-extra-semi': 'off',
					// 		'@typescript-eslint/no-var-requires': 'off'
					// 		// ...tslint.rules
					// 		// semi: ['error', 'never'],
					// 	}
					// })),
					...options.extensions
				]
			});
		}
	});

	return <MissedContent resource={resource} message={message}>
		<CodeMirrorEditorPanel ref={ref}/>
	</MissedContent>;
};