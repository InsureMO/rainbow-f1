import {PropValue, Undefinable} from '@rainbow-d9/n1';
import {GlobalEventHandlers, TreeNodeDef, UnwrappedTree} from '@rainbow-d9/n2';
import {useState} from 'react';
import {F1ModuleStructure, F1Project, F1ProjectStructure} from '../../../shared';
import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {useAskProjectStructure, useProjectStructure} from '../opened/workbench/use-project';
import {AddModuleNodeLabel} from './add-module-node-label';
import {ModuleRootNodeLabel} from './module-root-node-label';
import {ProjectRootNodeLabel} from './project-root-node-label';
import {ProjectFrameContainer} from './widgets';

interface ProjectFrameState {
	project?: F1Project;
	structure?: F1ProjectStructure;
}

const ROOT_NODE_MARKER = '$$root$$';
const ADD_MODULE = Symbol();
const ADD_MODULE_NODE_MARKER = (project: F1Project) => `$$add-module$$-${project.directory}`;
const MODULE_NODE_MARKER = (module: F1ModuleStructure) => `$$module$$-${module.name}`;

export const ProjectFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	const {ask} = useProjectStructure();
	const [state, setState] = useState<ProjectFrameState>({});
	useAskProjectStructure(ask, (project, structure) => setState({project, structure}));

	if (state.structure == null) {
		return null;
	}

	const rootData = {project: state.project, structure: state.structure};
	const detective = (parentNode: Undefinable<TreeNodeDef>, _options: GlobalEventHandlers): Array<TreeNodeDef> => {
		if (parentNode == null) {
			return [];
		} else if (parentNode.value as any === rootData) {
			// use structure as value
			return [{
				value: rootData.structure as unknown as PropValue,
				$ip2r: 'structure', $ip2p: 'structure', marker: ROOT_NODE_MARKER,
				label: <ProjectRootNodeLabel project={rootData.project}/>
			} as TreeNodeDef];
		} else if (parentNode.value as any === rootData.structure) {
			const modules = (rootData.structure as F1ProjectStructure).modules ?? [];
			if (modules.length === 0) {
				// use project and ADD_MODULE as value, tuple
				return [{
					value: [rootData.project, ADD_MODULE] as unknown as PropValue,
					$ip2r: `structure.modules`, $ip2p: 'modules',
					marker: ADD_MODULE_NODE_MARKER(rootData.project),
					label: <AddModuleNodeLabel project={rootData.project}/>
				} as TreeNodeDef];
			} else {
				// use module as value
				return modules.map((module, index) => {
					return {
						value: module as unknown as PropValue,
						$ip2r: `structure.modules[${index}]`, $ip2p: `modules[${index}]`,
						marker: MODULE_NODE_MARKER(module),
						label: <ModuleRootNodeLabel module={module}/>
					} as TreeNodeDef;
				});
			}
		} else {
			return [];
		}
	};

	return <ProjectFrameContainer title="Project" contentKey={SideContentKey.PROJECT} contentPosition={position}>
		<UnwrappedTree data={rootData} detective={detective} initExpandLevel={1} height="100%"/>
	</ProjectFrameContainer>;
};
