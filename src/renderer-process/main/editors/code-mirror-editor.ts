import {EditorState as CodeMirrorState, Extension} from '@codemirror/state';
import {EditorView, ViewUpdate} from '@codemirror/view';
import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {ModuleFileResource} from '../opened/types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../opened/workbench/event-bus';

export interface CodeMirrorConfigStateOptions {
	docChanged: Extension;
}

export interface CodeMirrorEditorOptions {
	resource: ModuleFileResource;
	createConfigState: (options: CodeMirrorConfigStateOptions) => CodeMirrorState;
	contentChanged?: (content: string) => Promise<void>;
}

export interface CodeMirrorEditorState {
	editor?: EditorView;
	/** only available when error occurred */
	message?: string;
}

export interface CodeMirrorEditorHookReturn extends CodeMirrorEditorState {
	ref: MutableRefObject<HTMLDivElement>;
}

export const useCodeMirrorEditor = (options: CodeMirrorEditorOptions): CodeMirrorEditorHookReturn => {
	const {resource, createConfigState, contentChanged} = options;

	const ref = useRef<HTMLDivElement>(null);
	const {fire} = useWorkbenchEventBus();
	const [state, setState] = useState<CodeMirrorEditorState>({});
	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const editor = new EditorView({
			state: createConfigState({
				docChanged: EditorView.updateListener.of(async (view: ViewUpdate) => {
					if (view.docChanged) {
						const doc = view.state.doc;
						const value = doc.toString();
						if (contentChanged != null) {
							await contentChanged(value);
						}
					}
				})
			}),
			parent: ref.current
		});
		setState({editor});
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
				setState(state => ({editor: state.editor}));
			},
			(message: string) => {
				setState(state => ({editor: state.editor, message}));
			});
	}, [fire, resource, state.editor]);

	return {ref, editor: state.editor, message: state.message};
};
