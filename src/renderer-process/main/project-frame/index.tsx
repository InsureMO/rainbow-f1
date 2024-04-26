import {PROPERTY_PATH_ME, Undefinable} from '@rainbow-d9/n1';
import {GlobalEventHandlers, TreeNodeDef, UnwrappedTree} from '@rainbow-d9/n2';
import {useState} from 'react';
import {F1ModuleStructure, F1Project, F1ProjectStructure, O23ModuleStructure} from '../../../shared';
import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {useAskProjectStructure, useProjectStructure} from '../opened/workbench/use-project';
import {castTo, isD9Module, isO23Module} from '../utils';
import {AddModuleNodeLabel} from './add-module-node-label';
import {ModuleEnvsNodeLabel} from './module-envs-node-label';
import {ModuleNodeFilesNodeLabel} from './module-node-files-node-label';
import {ModuleRootNodeLabel} from './module-root-node-label';
import {ModuleSourceFilesNodeLabel} from './module-source-files-node-label';
import {ProjectRootNodeLabel} from './project-root-node-label';
import {
	ADD_MODULE,
	ADD_MODULE_NODE_MARKER,
	MODULE_ENVS_NODE_MARKER,
	MODULE_NODE_FILES_NODE_MARKER,
	MODULE_NODE_MARKER,
	MODULE_SOURCE_FILES_NODE_MARKER,
	ModuleNodeDef,
	ProjectRoot,
	ProjectTreeNodeDef,
	ProjectTreeNodeType,
	ROOT_NODE_MARKER
} from './types';
import {ProjectFrameContainer} from './widgets';

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

	const rootData: ProjectRoot = {project: state.project, structure: state.structure};
	const createRootNode = (): ProjectTreeNodeDef => {
		// use structure as value
		return {
			value: castTo(rootData),
			$ip2r: rootData.project.directory, $ip2p: PROPERTY_PATH_ME, marker: ROOT_NODE_MARKER,
			label: <ProjectRootNodeLabel {...rootData}/>,
			$type: ProjectTreeNodeType.ROOT
		};
	};
	const createAddModuleNode = (): ProjectTreeNodeDef => {
		// use project and ADD_MODULE as value, tuple
		return {
			value: castTo({...rootData, module: ADD_MODULE}),
			$ip2r: `${rootData.project.directory}/modules`, $ip2p: 'modules',
			marker: ADD_MODULE_NODE_MARKER(rootData.project),
			label: <AddModuleNodeLabel {...rootData}/>,
			$type: ProjectTreeNodeType.ADD_MODULE
		};
	};
	const createModuleNode = (module: F1ModuleStructure): ProjectTreeNodeDef => {
		// use module as value
		return {
			value: castTo({...rootData, module}),
			$ip2r: `${rootData.project.directory}/${module.name}/envs`, $ip2p: module.name,
			marker: MODULE_NODE_MARKER(module),
			label: <ModuleRootNodeLabel {...rootData} module={module}/>,
			$type: ProjectTreeNodeType.MODULE
		};
	};
	const createModuleNodes = (): Array<ProjectTreeNodeDef> => {
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
	const createO23ModuleNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		return [
			// environments
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$envs$$`, $ip2p: '$$envs$$',
				marker: MODULE_ENVS_NODE_MARKER(module),
				label: <ModuleEnvsNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_ENVS
			},
			// server
			// {
			// 	value: castTo({...rootData, module}),
			// 	$ip2r: `${rootData.project.directory}/${module.name}/$$server$$`, $ip2p: '$$server$$',
			// 	marker: MODULE_SERVER_NODE_MARKER(module),
			// 	label: <ModuleServerNodeLabel {...rootData} module={module}/>,
			// 	$type: ProjectTreeNodeType.MODULE_SERVER
			// },
			// scripts
			// {
			// 	value: castTo({...rootData, module}),
			// 	$ip2r: `${rootData.project.directory}/${module.name}/$$scripts$$`, $ip2p: '$$scripts$$',
			// 	marker: MODULE_SCRIPTS_NODE_MARKER(module),
			// 	label: <ModuleScriptsNodeLabel {...rootData} module={module}/>,
			// 	$type: ProjectTreeNodeType.MODULE_SCRIPTS
			// },
			// db-scripts
			// {
			// 	value: castTo({...rootData, module}),
			// 	$ip2r: `${rootData.project.directory}/${module.name}/$$db-scripts$$`, $ip2p: '$$db-scripts$$',
			// 	marker: MODULE_DB_SCRIPTS_NODE_MARKER(module),
			// 	label: <ModuleDBScriptsNodeLabel {...rootData} module={module}/>,
			// 	$type: ProjectTreeNodeType.MODULE_DB_SCRIPTS
			// }
			// source files
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$`, $ip2p: '$$source-files$$',
				marker: MODULE_SOURCE_FILES_NODE_MARKER(module),
				label: <ModuleSourceFilesNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_NODE_FILES
			},
			// node files
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$node-files$$`, $ip2p: '$$node-files$$',
				marker: MODULE_NODE_FILES_NODE_MARKER(module),
				label: <ModuleNodeFilesNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_NODE_FILES
			}
			// root files
		];
	};
	const detective = (parentNode: Undefinable<TreeNodeDef>, _options: GlobalEventHandlers): Array<TreeNodeDef> => {
		if (parentNode == null) {
			return [];
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.ROOT) {
			// project node, create module nodes
			return createModuleNodes();
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			if (isD9Module(module)) {
				return [];
			} else if (isO23Module(module)) {
				return createO23ModuleNodes(module);
			} else {
				return [];
			}
		} else if (castTo(parentNode.value) === rootData) {
			// virtual root, given by tree itself. create physical root node, aka project node
			// put on last since the project root node's value are root data too.
			return [createRootNode()];
		} else {
			return [];
		}
	};

	return <ProjectFrameContainer title="Project" contentKey={SideContentKey.PROJECT} contentPosition={position}>
		<UnwrappedTree data={rootData} detective={detective} initExpandLevel={1} height="100%"/>
	</ProjectFrameContainer>;
};
