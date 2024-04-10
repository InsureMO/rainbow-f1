import {ChangeEvent, useState} from 'react';
import {F1Project} from '../../../shared';
import {SideFrame} from '../opened/sides/side-bar';
import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {useAskProject, useProject} from '../opened/workbench/use-project';

interface ProjectFrameState {
	project?: F1Project;
}

export const ProjectFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	const {ask} = useProject();
	const [state, setState] = useState<ProjectFrameState>({});
	useAskProject(ask, (project) => setState({project}));

	return <SideFrame title="Project" contentKey={SideContentKey.PROJECT} contentPosition={position}>

	</SideFrame>;
};
