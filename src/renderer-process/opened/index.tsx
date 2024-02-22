import {useEffect, useState} from 'react';
import {F1Project} from '../../shared';
import {MainEventTypes, useMainEventBus} from '../event-bus';

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
			window.electron.f1.opened(project);
		};
		fire(MainEventTypes.ASK_PROJECT, onAskProject);
	}, [fire]);

	if (!state.initialized) {
		return null;
	}

	return <div>
		{JSON.stringify(state.project)}
	</div>;
};
