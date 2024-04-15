import {PROPERTY_PATH_ME, PropValue, Undefinable} from '@rainbow-d9/n1';
import {GlobalEventHandlers, TreeNodeDef, UnwrappedTree} from '@rainbow-d9/n2';
import {useState} from 'react';
import {F1ModuleStructure, F1Project, F1ProjectStructure} from '../../../shared';
import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {useAskProjectStructure, useProjectStructure} from '../opened/workbench/use-project';
import {AddModuleNodeLabel} from './add-module-node-label';
import {ModuleRootNodeLabel} from './module-root-node-label';
import {ProjectRootNodeLabel} from './project-root-node-label';
import {ProjectTreeNodeDef, ProjectTreeNodeType} from './types';
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
	const createRootNode = () => {
		// use structure as value
		return {
			value: rootData.structure as unknown as PropValue,
			$ip2r: rootData.project.directory, $ip2p: PROPERTY_PATH_ME, marker: ROOT_NODE_MARKER,
			label: <ProjectRootNodeLabel project={rootData.project}/>,
			$type: ProjectTreeNodeType.ROOT
		} as ProjectTreeNodeDef;
	};
	const createAddModuleNode = () => {
		// use project and ADD_MODULE as value, tuple
		return {
			value: [rootData.project, ADD_MODULE] as unknown as PropValue,
			$ip2r: `${rootData.project.directory}/modules`, $ip2p: 'modules',
			marker: ADD_MODULE_NODE_MARKER(rootData.project),
			label: <AddModuleNodeLabel project={rootData.project}/>,
			$type: ProjectTreeNodeType.ADD_MODULE
		} as ProjectTreeNodeDef;
	};
	const createModuleNode = (module: F1ModuleStructure) => {
		// use module as value
		return {
			value: module as unknown as PropValue,
			$ip2r: `${rootData.project.directory}/${module.name}`, $ip2p: module.name,
			marker: MODULE_NODE_MARKER(module),
			label: <ModuleRootNodeLabel module={module}/>,
			$type: ProjectTreeNodeType.MODULE
		} as ProjectTreeNodeDef;
	};
	const createModuleNodes = () => {
		const modules = [...(rootData.structure as F1ProjectStructure).modules ?? []];
		modules.sort((m1, m2) => {
			return (m1.name ?? '').localeCompare(m2.name ?? '', (void 0), {sensitivity: 'base'});
		});
		if (modules.length === 0) {
			return [createAddModuleNode()];
		} else {
			return modules.map(createModuleNode);
		}
	};
	const detective = (parentNode: Undefinable<TreeNodeDef>, _options: GlobalEventHandlers): Array<TreeNodeDef> => {
		if (parentNode == null) {
			return [];
		} else if (parentNode.value as any === rootData) {
			return [createRootNode()];
		} else if (parentNode.value as any === rootData.structure) {
			return createModuleNodes();
		} else {
			return [];
		}
	};

	return <ProjectFrameContainer title="Project" contentKey={SideContentKey.PROJECT} contentPosition={position}>
		<UnwrappedTree data={rootData} detective={detective} initExpandLevel={1} height="100%"/>
	</ProjectFrameContainer>;
};
