import {indentWithTab} from '@codemirror/commands';
import {json, jsonParseLinter} from '@codemirror/lang-json';
import {linter, lintGutter} from '@codemirror/lint';
import {EditorState} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import {ModuleFileResource} from '../opened/types';
import {MissedContent} from './missed-content';
import {useCodeMirrorEditor} from './use-code-mirror-editor';

import {EditorPanel} from './widgets';

export interface JsonEditorProps {
	resource: ModuleFileResource;
}

export const JsonEditor = (props: JsonEditorProps) => {
	const {resource} = props;

	const {ref, message} = useCodeMirrorEditor({
		resource, createConfigState: (options) => {
			return EditorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					json(),
					lintGutter(),
					linter(jsonParseLinter()),
					...options.extensions
				]
			});
		}
	});

	return <MissedContent resource={resource} message={message}>
		<EditorPanel ref={ref}/>
	</MissedContent>;
};