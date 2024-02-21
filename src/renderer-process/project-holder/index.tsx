import {Fragment, useEffect, useState} from 'react';
import {F1ProjectSettings, isNotBlank} from '../../shared';
import {MainEventTypes, useMainEventBus} from '../event-bus';

interface ProjectHolderState {
	project?: F1ProjectSettings;
	message?: string;
}

export const ProjectHolder = () => {
	const {on, off, fire} = useMainEventBus();
	const [state, setState] = useState<ProjectHolderState>({});

	useEffect(() => {
		const onSetProject = (project: F1ProjectSettings) => {
			setState(state => ({...state, project}));
		};
		const onAskProjectFailed = (message: string) => {
			setState(state => ({...state, message}));
		};
		on(MainEventTypes.SET_PROJECT, onSetProject);
		on(MainEventTypes.ASK_PROJECT_FAILED, onAskProjectFailed);
		return () => {
			off(MainEventTypes.SET_PROJECT, onSetProject);
			off(MainEventTypes.ASK_PROJECT_FAILED, onAskProjectFailed);
		};
	}, [on, off]);
	useEffect(() => {
		if (state.project != null) {
			fire(MainEventTypes.PROJECT_SETTLED, state.project);
		} else if (isNotBlank(state.message)) {
			fire(MainEventTypes.FAILURE_SETTLED, state.message);
		}

		const onAskProjectFailure = (callback: (message: string) => void) => callback(state.message);
		on(MainEventTypes.ASK_PROJECT_FAILURE, onAskProjectFailure);
		return () => {
			off(MainEventTypes.ASK_PROJECT_FAILURE, onAskProjectFailure);
		};
	}, [fire, state.project, state.message]);

	return <Fragment/>;
};