import {indentWithTab} from '@codemirror/commands';
import {sql} from '@codemirror/lang-sql';
import {lintGutter} from '@codemirror/lint';
import {EditorState as CodeMirrorState} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import {ModuleFileResource} from '../opened/types';
import {MissedContent} from './missed-content';
import {useCodeMirrorEditor} from './use-code-mirror-editor';
import {EditorPanel} from './widgets';

export interface SqlEditorProps {
	resource: ModuleFileResource;
}

export const SqlEditor = (props: SqlEditorProps) => {
	const {resource} = props;

	const {ref, message} = useCodeMirrorEditor({
		resource, createConfigState: (options) => {
			return CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					sql(),
					lintGutter(),
					...options.extensions
				]
			});
		}
	});

	return <MissedContent resource={resource} message={message}>
		<EditorPanel ref={ref}/>
	</MissedContent>;
};