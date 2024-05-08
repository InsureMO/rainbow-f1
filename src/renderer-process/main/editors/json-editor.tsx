import {indentWithTab} from '@codemirror/commands';
import {json, jsonParseLinter} from '@codemirror/lang-json';
import {linter, lintGutter} from '@codemirror/lint';
import {EditorState as CodeMirrorState} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import {ModuleFileResource} from '../opened/types';
import {useCodeMirrorEditor} from './code-mirror-editor';

import {EditorPanel} from './widgets';

export interface JsonEditorProps {
	resource: ModuleFileResource;
}

export const JsonEditor = (props: JsonEditorProps) => {
	const {resource} = props;

	const {ref} = useCodeMirrorEditor({
		resource, createConfigState: (options) => {
			return CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					json(),
					lintGutter(),
					linter(jsonParseLinter()),
					options.docChanged
				]
			});
		}
	});

	return <EditorPanel ref={ref}/>;
};