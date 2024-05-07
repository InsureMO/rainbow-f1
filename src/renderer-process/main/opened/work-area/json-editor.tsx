import {indentWithTab} from '@codemirror/commands';
import {json, jsonParseLinter} from '@codemirror/lang-json';
import {linter, lintGutter} from '@codemirror/lint';
import {EditorState as CodeMirrorState} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import {useEffect, useRef, useState} from 'react';
import {ModuleFileResource} from '../types';
import {EditorPanel} from './widgets';

export interface JsonEditorProps {
	resource: ModuleFileResource;
}

export interface JsonEditorState {
	editor?: EditorView;
}

export const JsonEditor = (props: JsonEditorProps) => {
	const ref = useRef<HTMLDivElement>(null);

	const [state, setState] = useState<JsonEditorState>({});
	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const editor = new EditorView({
			state: CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					json(),
					lintGutter(),
					linter(jsonParseLinter())
				]
			}),
			parent: ref.current
		});
		setState(state => ({...state, editor}));
		return () => {
			editor.destroy();
		};
	}, []);

	return <EditorPanel ref={ref}/>;
};