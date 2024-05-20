import {indentWithTab} from '@codemirror/commands';
import {StreamLanguage} from '@codemirror/language';
import {properties} from '@codemirror/legacy-modes/mode/properties';
import {lintGutter} from '@codemirror/lint';
import {EditorState} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import {ModuleFileResource} from '../../opened/types';
import {MissedContent} from '../missed-content';
import {useCodeMirrorEditor} from '../use-code-mirror-editor';
import {CodeMirrorEditorPanel} from '../widgets';

export interface EnvFileEditorProps {
	resource: ModuleFileResource;
}

export const EnvFileInCommandEditor = (props: EnvFileEditorProps) => {
	const {resource} = props;

	const {ref, message} = useCodeMirrorEditor({
		resource, createConfigState: (options) => {
			return EditorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					StreamLanguage.define(properties),
					lintGutter(),
					...options.extensions
				]
			});
		}
	});

	return <MissedContent resource={resource} message={message} closable={false}>
		<CodeMirrorEditorPanel ref={ref}/>
	</MissedContent>;
};