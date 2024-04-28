import {PROPERTY_PATH_ME, Undefinable} from '@rainbow-d9/n1';
import {GlobalEventHandlers, TreeNodeDef, UnwrappedTree} from '@rainbow-d9/n2';
import {useState} from 'react';
import {F1ModuleStructure, F1Project, F1ProjectStructure, O23ModuleStructure} from '../../../shared';
import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {useAskProjectStructure, useProjectStructure} from '../opened/workbench/use-project';
import {castTo, isD9Module, isO23Module} from '../utils';
import {AddModuleNodeLabel} from './add-module-node-label';
import {ModuleCommandNodeLabel} from './module-command-node-label';
import {ModuleCommandsNodeLabel} from './module-commands-node-label';
import {ModuleEnvsNodeLabel} from './module-envs-node-label';
import {ModuleNodeDirNodeLabel} from './module-node-dir-node-label';
import {ModuleNodeFileNodeLabel} from './module-node-file-node-label';
import {ModuleNodeFilesNodeLabel} from './module-node-files-node-label';
import {ModuleO23PipelinesNodeLabel} from './module-o23-pipelines-node-label';
import {ModuleRootNodeLabel} from './module-root-node-label';
import {ModuleSourceDirNodeLabel} from './module-source-dir-node-label';
import {ModuleSourceFileNodeLabel} from './module-source-file-node-label';
import {ModuleSourceFilesNodeLabel} from './module-source-files-node-label';
import {ProjectRootNodeLabel} from './project-root-node-label';
import {
	ADD_MODULE,
	ADD_MODULE_NODE_MARKER,
	MODULE_COMMAND_NODE_MARKER,
	MODULE_COMMANDS_NODE_MARKER,
	MODULE_ENVS_NODE_MARKER,
	MODULE_NODE_FILES_NODE_MARKER,
	MODULE_NODE_MARKER,
	MODULE_O23_PIPELINES_NODE_MARKER,
	MODULE_SOURCE_DIR_NODE_MARKER,
	MODULE_SOURCE_FILE_NODE_MARKER,
	MODULE_SOURCE_FILES_NODE_MARKER,
	ModuleNodeDef,
	ModuleSourceFileNodeDef,
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
	const createO23ModuleChildNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		return [
			// commands
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$commands$$`, $ip2p: '$$commands$$',
				marker: MODULE_COMMANDS_NODE_MARKER(module),
				label: <ModuleCommandsNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_COMMANDS
			},
			// environments
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$envs$$`, $ip2p: '$$envs$$',
				marker: MODULE_ENVS_NODE_MARKER(module),
				label: <ModuleEnvsNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_ENVS
			},
			// pipelines
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$`, $ip2p: '$$o23-pipelines$$',
				marker: MODULE_O23_PIPELINES_NODE_MARKER(module),
				label: <ModuleO23PipelinesNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_O23_PIPELINES
			},
			// source files
			{
				value: castTo({...rootData, module}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$`, $ip2p: '$$source-files$$',
				marker: MODULE_SOURCE_FILES_NODE_MARKER(module),
				label: <ModuleSourceFilesNodeLabel {...rootData} module={module}/>,
				$type: ProjectTreeNodeType.MODULE_SOURCE_FILES
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
	const createModuleChildNodes = (module: F1ModuleStructure) => {
		if (isD9Module(module)) {
			return [];
		} else if (isO23Module(module)) {
			return createO23ModuleChildNodes(module);
		} else {
			return [];
		}
	};
	const createModuleCommandsChildNodes = (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
		return Object.values(module.commands ?? {}).sort((c1, c2) => {
			return c1.name.localeCompare(c2.name, (void 0), {sensitivity: 'base'});
		}).map(cmd => {
			return {
				value: castTo({...rootData, module, cmd}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$${cmd.name}$$`, $ip2p: cmd.name,
				marker: MODULE_COMMAND_NODE_MARKER(module, cmd),
				label: <ModuleCommandNodeLabel {...rootData} module={module} command={cmd}/>,
				$type: ProjectTreeNodeType.MODULE_COMMAND
			};
		});
	};
	const createO23ModuleEnvChildNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		return [
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
		];
	};
	const createModuleEnvsChildNodes = (module: F1ModuleStructure) => {
		if (isD9Module(module)) {
			return [];
		} else if (isO23Module(module)) {
			return createO23ModuleEnvChildNodes(module);
		} else {
			return [];
		}
	};
	const createO23ModuleNodeFileNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		const files = ([...(module.nodeFiles ?? [])]).sort((f1, f2) => {
			return f1.path.localeCompare(f2.path, (void 0), {sensitivity: 'base'});
		});
		const top: Array<ProjectTreeNodeDef> = [];
		const map: Record<string, ProjectTreeNodeDef> = {};
		files.forEach(file => {
			let node;
			if (file.dir) {
				node = {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_SOURCE_DIR_NODE_MARKER(module, file),
					label: <ModuleNodeDirNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_NODE_DIR
				} as ProjectTreeNodeDef;
			} else {
				node = {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_SOURCE_FILE_NODE_MARKER(module, file),
					label: <ModuleNodeFileNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_NODE_FILE
				} as ProjectTreeNodeDef;
			}
			map[file.path] = node;
			let lastSepIndex = file.path.lastIndexOf('/');
			lastSepIndex = lastSepIndex === -1 ? file.path.lastIndexOf('\\') : lastSepIndex;
			const parentPath = file.path.substring(0, lastSepIndex);
			const parent = map[parentPath];
			if (parent != null) {
				if (parent.$children == null) {
					parent.$children = [];
				}
				parent.$children.push(node);
			} else {
				top.push(node);
			}
		});
		const sort = ({value: {file: f1}}: ModuleSourceFileNodeDef, {value: {file: f2}}: ModuleSourceFileNodeDef) => {
			if (f1.dir === f2.dir) {
				return f1.path.localeCompare(f2.path, (void 0), {sensitivity: 'base'});
			} else if (f1.dir) {
				return -1;
			} else {
				return 1;
			}
		};
		const sortChildren = (node: ModuleSourceFileNodeDef) => {
			(node.$children ?? []).sort((c1, c2) => sort(castTo(c1), castTo(c2)))
				.forEach(child => sortChildren(castTo(child)));
		};
		top.sort((n1, n2) => sort(castTo(n1), castTo(n2)))
			.forEach(node => sortChildren(castTo(node)));

		return top;
	};
	const createModuleNodeFileNodes = (module: F1ModuleStructure) => {
		if (isD9Module(module)) {
			return [];
		} else if (isO23Module(module)) {
			return createO23ModuleNodeFileNodes(module);
		} else {
			return [];
		}
	};
	const createO23ModuleSourceFileNodes = (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
		const files = ([...(module.sourceFiles ?? [])]).sort((f1, f2) => {
			return f1.path.localeCompare(f2.path, (void 0), {sensitivity: 'base'});
		});
		const top: Array<ProjectTreeNodeDef> = [];
		const map: Record<string, ProjectTreeNodeDef> = {};
		files.forEach(file => {
			let node;
			if (file.dir) {
				node = {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_SOURCE_DIR_NODE_MARKER(module, file),
					label: <ModuleSourceDirNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_SOURCE_DIR
				} as ProjectTreeNodeDef;
			} else {
				node = {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker: MODULE_SOURCE_FILE_NODE_MARKER(module, file),
					label: <ModuleSourceFileNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_SOURCE_FILE
				} as ProjectTreeNodeDef;
			}
			map[file.path] = node;
			let lastSepIndex = file.path.lastIndexOf('/');
			lastSepIndex = lastSepIndex === -1 ? file.path.lastIndexOf('\\') : lastSepIndex;
			const parentPath = file.path.substring(0, lastSepIndex);
			const parent = map[parentPath];
			if (parent != null) {
				if (parent.$children == null) {
					parent.$children = [];
				}
				parent.$children.push(node);
			} else {
				top.push(node);
			}
		});
		const sort = ({value: {file: f1}}: ModuleSourceFileNodeDef, {value: {file: f2}}: ModuleSourceFileNodeDef) => {
			if (f1.dir === f2.dir) {
				return f1.path.localeCompare(f2.path, (void 0), {sensitivity: 'base'});
			} else if (f1.dir) {
				return -1;
			} else {
				return 1;
			}
		};
		const sortChildren = (node: ModuleSourceFileNodeDef) => {
			(node.$children ?? []).sort((c1, c2) => sort(castTo(c1), castTo(c2)))
				.forEach(child => sortChildren(castTo(child)));
		};
		top.sort((n1, n2) => sort(castTo(n1), castTo(n2)))
			.forEach(node => sortChildren(castTo(node)));

		return top;
	};
	const createModuleSourceFileNodes = (module: F1ModuleStructure) => {
		if (isD9Module(module)) {
			return [];
		} else if (isO23Module(module)) {
			return createO23ModuleSourceFileNodes(module);
		} else {
			return [];
		}
	};

	const detective = (parentNode: Undefinable<TreeNodeDef>, _options: GlobalEventHandlers): Array<TreeNodeDef> => {
		if (parentNode == null) {
			return [];
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.ROOT) {
			// project node, create module nodes
			return createModuleNodes();
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleChildNodes(module);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_COMMANDS) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleCommandsChildNodes(module);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_ENVS) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleEnvsChildNodes(module);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_NODE_FILES) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleNodeFileNodes(module);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_SOURCE_FILES) {
			const {value: {module}} = castTo<ModuleNodeDef>(parentNode);
			return createModuleSourceFileNodes(module);
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_SOURCE_DIR) {
			return parentNode.$children ?? [];
		} else if (castTo<ProjectTreeNodeDef>(parentNode).$type === ProjectTreeNodeType.MODULE_SOURCE_FILE) {
			return [];
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
