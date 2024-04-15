import {useState} from 'react';
import {F1Project, F1ProjectStructure} from '../../../shared';
import {SideFrame} from '../opened/sides/side-bar';
import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {useAskProjectStructure, useProjectStructure} from '../opened/workbench/use-project';

interface ProjectFrameState {
	project?: F1Project;
	structure?: F1ProjectStructure;
}

export const ProjectFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	const {ask} = useProjectStructure();
	const [state, setState] = useState<ProjectFrameState>({});
	useAskProjectStructure(ask, (project, structure) => setState({project, structure}));

	if (state.structure == null) {
		return null;
	}

	return <SideFrame title="Project" contentKey={SideContentKey.PROJECT} contentPosition={position}>

	</SideFrame>;
};
