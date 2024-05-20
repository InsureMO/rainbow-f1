import {Compartment, EditorState, Extension} from '@codemirror/state';
import {EditorView, ViewUpdate} from '@codemirror/view';
import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {ModuleFileResource, Resource} from '../opened/types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../opened/workbench/event-bus';
import {useWorkAreaEditorEventBus, WorkAreaEditorEventTypes} from './event-bus';

export interface CodeMirrorConfigStateOptions {
	extensions: Array<Extension>;
}

export interface CodeMirrorEditorOptions {
	resource: ModuleFileResource;
	createConfigState: (options: CodeMirrorConfigStateOptions) => EditorState;
	contentChanged?: (content: string) => Promise<void>;
}

export interface CodeMirrorEditorState {
	editor?: EditorView;
	readOnly?: Compartment;
	/** only available when error occurred */
	message?: string;
}

export interface CodeMirrorEditorHookReturn extends Pick<CodeMirrorEditorState, 'editor' | 'message'> {
	ref: MutableRefObject<HTMLDivElement>;
}

export const useCodeMirrorEditor = (options: CodeMirrorEditorOptions): CodeMirrorEditorHookReturn => {
	const {resource, createConfigState, contentChanged} = options;

	const ref = useRef<HTMLDivElement>(null);
	const {fire} = useWorkbenchEventBus();
	const {on: onEditor, off: offEditor} = useWorkAreaEditorEventBus();
	const [state, setState] = useState<CodeMirrorEditorState>({});
	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const readOnly = new Compartment();
		const editorState = createConfigState({
			extensions: [
				EditorView.updateListener.of(async (view: ViewUpdate) => {
					if (view.docChanged) {
						const doc = view.state.doc;
						const value = doc.toString();
						if (contentChanged != null) {
							await contentChanged(value);
						}
					}
				}),
				readOnly.of(EditorState.readOnly.of(true))
			]
		});
		const editor = new EditorView({state: editorState, parent: ref.current});
		setState({editor, readOnly});
		fire(WorkbenchEventTypes.ASK_MODULE_FILE_CONTENT, resource,
			(content: string) => {
				const doc = editor.state.doc;
				editor.dispatch({changes: {from: 0, to: doc.length, insert: content}});
				setState(state => ({editor: state.editor, readOnly: state.readOnly}));
			},
			(message: string) => {
				setState(state => ({editor: state.editor, readOnly: state.readOnly, message}));
			});
		return () => {
			editor.destroy();
		};
	}, [fire, resource]);
	useEffect(() => {
		const onSwitchLock = (to: boolean) => (res: Resource) => {
			if (resource !== res) {
				return;
			}
			if (state.editor == null) {
				return;
			}
			state.editor.dispatch({
				effects: state.readOnly.reconfigure(EditorState.readOnly.of(to))
			});
		};
		const onLockContent = onSwitchLock(true);
		const onUnlockContent = onSwitchLock(false);
		onEditor(WorkAreaEditorEventTypes.LOCK_CONTENT, onLockContent);
		onEditor(WorkAreaEditorEventTypes.UNLOCK_CONTENT, onUnlockContent);
		return () => {
			offEditor(WorkAreaEditorEventTypes.LOCK_CONTENT, onLockContent);
			offEditor(WorkAreaEditorEventTypes.UNLOCK_CONTENT, onUnlockContent);
		};
	}, [onEditor, offEditor, resource, state.editor, state.readOnly]);

	return {ref, editor: state.editor, message: state.message};
};
