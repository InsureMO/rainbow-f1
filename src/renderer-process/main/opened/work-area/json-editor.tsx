import {indentWithTab} from '@codemirror/commands';
import {json, jsonParseLinter} from '@codemirror/lang-json';
import {linter, lintGutter} from '@codemirror/lint';
import {EditorState as CodeMirrorState} from '@codemirror/state';
import {EditorView, keymap, ViewUpdate} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import {useEffect, useRef, useState} from 'react';
import {ModuleFileResource} from '../types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../workbench/event-bus';
import {EditorPanel} from './widgets';

export interface JsonEditorProps {
	resource: ModuleFileResource;
}

export interface JsonEditorState {
	editor?: EditorView;
}

export const JsonEditor = (props: JsonEditorProps) => {
	const {resource} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {fire} = useWorkbenchEventBus();

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
					linter(jsonParseLinter()),
					EditorView.updateListener.of((view: ViewUpdate) => {
						if (view.docChanged) {
							const doc = view.state.doc;
							const value = doc.toString();
							// fire(PlaygroundEventTypes.CONTENT_CHANGED, value);
						}
					})
				]
			}),
			parent: ref.current
		});
		setState(state => ({...state, editor}));
		return () => {
			editor.destroy();
		};
	}, []);
	useEffect(() => {
		if (state.editor == null) {
			return;
		}
		fire(WorkbenchEventTypes.ASK_MODULE_FILE_CONTENT, resource,
			(content: string) => {
				const doc = state.editor.state.doc;
				state.editor.dispatch({changes: {from: 0, to: doc.length, insert: content}});
			},
			(message: string) => {
				// TODO
				console.log(message);
			});
	}, [fire, resource, state.editor]);

	return <EditorPanel ref={ref}/>;
};