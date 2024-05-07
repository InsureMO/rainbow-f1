import {UnwrappedTree} from '@rainbow-d9/n2';
import React, {useState} from 'react';
import {F1Project, F1ProjectStructure} from '../../../../../shared';
import {SideContentKey, SideContentPosition, useWorkbenchEventBus} from '../../opened/workbench/event-bus';
import {useAskProjectStructure, useProjectStructure} from '../../opened/workbench/use-project';
import {createDetective} from './node';
import {ProjectRoot} from './types';
import {ProjectFrameContainer} from './widgets';

interface ProjectFrameState {
	project?: F1Project;
	structure?: F1ProjectStructure;
}

export const ProjectFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	const {fire} = useWorkbenchEventBus();
	const {ask} = useProjectStructure();
	const [state, setState] = useState<ProjectFrameState>({});
	useAskProjectStructure(ask, (project, structure) => setState({project, structure}));

	if (state.structure == null) {
		return null;
	}

	const rootData: ProjectRoot = {project: state.project, structure: state.structure};
	const detective = createDetective(rootData, fire);

	return <ProjectFrameContainer title="Project" contentKey={SideContentKey.PROJECT} contentPosition={position}>
		<UnwrappedTree data={rootData} detective={detective} initExpandLevel={1} height="100%"/>
	</ProjectFrameContainer>;
};
