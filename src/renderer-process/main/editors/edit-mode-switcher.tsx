import {useEffect, useState} from 'react';
import {Resource} from '../opened/types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../opened/workbench/event-bus';
import {useWorkAreaEditorEventBus, WorkAreaEditorEventTypes} from './event-bus';
import {EditorStatusButton} from './widgets';

export interface EditModeSwitcherProps {
	resource: Resource;
}

export const EditModeSwitcher = (props: EditModeSwitcherProps) => {
	const {resource} = props;

	const {fire} = useWorkbenchEventBus();
	const {fire: fireEditor} = useWorkAreaEditorEventBus();

	const [state, setState] = useState({locked: true, switchable: false});
	useEffect(() => {
		fire(WorkbenchEventTypes.ASK_RESOURCE_LOCK_STATUS, resource, (locked: boolean, switchable: boolean) => {
			setState({locked, switchable});
			if (locked) {
				fireEditor(WorkAreaEditorEventTypes.LOCK_CONTENT, resource);
			} else {
				fireEditor(WorkAreaEditorEventTypes.UNLOCK_CONTENT, resource);
			}
		});
	}, [resource]);

	const onLockClicked = () => {
		if (!state.switchable) {
			return;
		}
		setState(state => ({...state, locked: true}));
		fireEditor(WorkAreaEditorEventTypes.LOCK_CONTENT, resource);
		fire(WorkbenchEventTypes.SWITCH_RESOURCE_LOCK_STATUS, resource, true);
	};
	const onUnlockClicked = () => {
		if (!state.switchable) {
			return;
		}
		setState(state => ({...state, locked: false}));
		fireEditor(WorkAreaEditorEventTypes.UNLOCK_CONTENT, resource);
		fire(WorkbenchEventTypes.SWITCH_RESOURCE_LOCK_STATUS, resource, false);
	};

	if (state.locked) {
		return <EditorStatusButton leads={['$icons.f1Lock']} onClick={onUnlockClicked}>
			{state.switchable ? 'Read Mode' : 'Read Mode Only'}
		</EditorStatusButton>;
	} else {
		return <EditorStatusButton leads={['$icons.f1Unlock']} onClick={onLockClicked}>Edit Mode</EditorStatusButton>;
	}
};
