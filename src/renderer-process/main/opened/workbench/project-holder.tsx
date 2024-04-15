import {Fragment, useEffect} from 'react';
import {F1Project, F1ProjectStructure} from '../../../../shared';
import {useWorkbenchEventBus, WorkbenchEventTypes} from './event-bus';

export interface ProjectHolderProps {
	project: F1Project;
	structure: F1ProjectStructure;
}

export const ProjectHolder = (props: ProjectHolderProps) => {
	const {project, structure} = props;
	const {on, off} = useWorkbenchEventBus();

	useEffect(() => {
		const onAskProject = (callback: (project: F1Project) => void) => {
			callback(project);
		};
		const onAskProjectStructure = (callback: (project: F1Project, structure: F1ProjectStructure) => void) => {
			callback(project, structure);
		};
		on(WorkbenchEventTypes.ASK_PROJECT, onAskProject);
		on(WorkbenchEventTypes.ASK_PROJECT_STRUCTURE, onAskProjectStructure);
		return () => {
			off(WorkbenchEventTypes.ASK_PROJECT, onAskProject);
			off(WorkbenchEventTypes.ASK_PROJECT_STRUCTURE, onAskProjectStructure);
		};
	}, [on, off, project, structure]);

	return <Fragment/>;
};