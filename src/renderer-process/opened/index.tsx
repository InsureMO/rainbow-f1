import {useEffect, useState} from 'react';
import {F1Project} from '../../shared';
import {MainEventTypes, useMainEventBus} from '../event-bus';
import {ProjectWorkbench} from './workbench';
import {WorkbenchEventBusProvider} from './workbench/event-bus';

interface State {
	initialized: boolean;
	project?: F1Project;
}

export const Opened = () => {
	const {fire} = useMainEventBus();
	const [state, setState] = useState<State>({initialized: false});
	useEffect(() => {
		const onAskProject = (project: F1Project) => {
			setState({initialized: true, project});
			document.title = `${project.name} - ${project.directory}`;
			window.electron.f1.opened(project);
		};
		fire(MainEventTypes.ASK_PROJECT, onAskProject);
	}, [fire]);

	if (!state.initialized) {
		return null;
	}

	return <WorkbenchEventBusProvider>
		<ProjectWorkbench project={state.project}/>
	</WorkbenchEventBusProvider>;
};
