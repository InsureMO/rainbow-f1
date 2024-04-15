import {useEffect, useState} from 'react';
import {F1Project, F1ProjectStructure} from '../../../shared';
import {MainEventTypes, useMainEventBus} from '../event-bus';
import {ProjectWorkbench} from './workbench';

interface State {
	initialized: boolean;
	project?: F1Project;
	structure?: F1ProjectStructure;
}

export const Opened = () => {
	const {fire} = useMainEventBus();
	const [state, setState] = useState<State>({initialized: false});
	useEffect(() => {
		const onAskProject = (project: F1Project, structure: F1ProjectStructure) => {
			setState({initialized: true, project, structure});
			document.title = `${project.name} - ${project.directory}`;
			window.electron.project.opened(project);
		};
		fire(MainEventTypes.ASK_PROJECT, onAskProject);
	}, [fire]);

	if (!state.initialized) {
		return null;
	}

	return <ProjectWorkbench project={state.project} structure={state.structure}/>;
};
