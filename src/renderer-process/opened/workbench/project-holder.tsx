import {Fragment, useEffect} from 'react';
import {F1Project} from '../../../shared';
import {ProjectBaseProps} from '../types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from './event-bus';

export interface ProjectHolderProps extends ProjectBaseProps {
}

export const ProjectHolder = (props: ProjectHolderProps) => {
	const {project} = props;
	const {on, off} = useWorkbenchEventBus();

	useEffect(() => {
		const onAskProject = (callback: (project: F1Project) => void) => {
			console.log(callback);
			callback(project);
		};
		on(WorkbenchEventTypes.ASK_PROJECT, onAskProject);
		return () => {
			off(WorkbenchEventTypes.ASK_PROJECT, onAskProject);
		};
	}, [on, off, project]);

	return <Fragment/>;
};