import {indentWithTab} from '@codemirror/commands';
import {yaml} from '@codemirror/lang-yaml';
import {lintGutter} from '@codemirror/lint';
import {EditorState as CodeMirrorState} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import {ModuleFileResource} from '../opened/types';
import {MissedContent} from './missed-content';
import {useCodeMirrorEditor} from './use-code-mirror-editor';
import {EditorPanel} from './widgets';

export interface YamlEditorProps {
	resource: ModuleFileResource;
}

export const YamlEditor = (props: YamlEditorProps) => {
	const {resource} = props;

	const {ref, message} = useCodeMirrorEditor({
		resource, createConfigState: (options) => {
			return CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					yaml(),
					lintGutter(),
					...options.extensions
				]
			});
		}
	});

	return <MissedContent message={message}>
		<EditorPanel ref={ref}/>
	</MissedContent>;
};