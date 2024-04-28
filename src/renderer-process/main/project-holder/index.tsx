import {Fragment, useEffect, useState} from 'react';
import {F1Project, F1ProjectStructure, isNotBlank} from '../../../shared';
import {MainEventTypes, useMainEventBus} from '../event-bus';

interface ProjectHolderState {
	project?: F1Project;
	structure?: F1ProjectStructure;
	message?: string;
}

export const ProjectHolder = () => {
	const {on, off, fire} = useMainEventBus();
	const [state, setState] = useState<ProjectHolderState>({});

	useEffect(() => {
		const onSetProject = (project: F1Project, structure: F1ProjectStructure) => {
			console.log(structure);
			setState(state => ({...state, project, structure}));
		};
		const onAskProjectFailed = (message: string) => {
			setState(state => ({...state, message}));
		};
		on(MainEventTypes.SET_PROJECT, onSetProject);
		on(MainEventTypes.SET_FAILED_TO_ASK_PROJECT, onAskProjectFailed);
		return () => {
			off(MainEventTypes.SET_PROJECT, onSetProject);
			off(MainEventTypes.SET_FAILED_TO_ASK_PROJECT, onAskProjectFailed);
		};
	}, [on, off]);
	useEffect(() => {
		if (state.project != null) {
			fire(MainEventTypes.PROJECT_SETTLED, state.project);
		} else if (isNotBlank(state.message)) {
			fire(MainEventTypes.FAILURE_SETTLED, state.message);
		}

		const onAskProjectFailure = (callback: (message: string) => void) => callback(state.message);
		const onAskProject = (callback: (project: F1Project, structure: F1ProjectStructure) => void) => callback(state.project, state.structure);
		on(MainEventTypes.ASK_PROJECT_FAILURE, onAskProjectFailure);
		on(MainEventTypes.ASK_PROJECT, onAskProject);
		return () => {
			off(MainEventTypes.ASK_PROJECT_FAILURE, onAskProjectFailure);
			off(MainEventTypes.ASK_PROJECT, onAskProject);
		};
	}, [fire, state.project, state.message]);

	return <Fragment/>;
};
