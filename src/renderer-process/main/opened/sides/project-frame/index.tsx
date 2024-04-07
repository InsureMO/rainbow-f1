import {useState} from 'react';
import {F1Project} from '../../../../../shared';
import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {useAskProject, useProject} from '../../workbench/use-project';
import {SideFrame} from '../side-bar';

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
