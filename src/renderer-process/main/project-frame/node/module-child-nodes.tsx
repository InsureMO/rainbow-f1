import React from 'react';
import {
	ModuleCommandsIcon,
	ModuleDBScriptsIcon,
	ModuleEnvsIcon,
	ModuleNodeFilesIcon,
	ModuleRootIcon,
	ModuleScriptsIcon,
	ModuleServerIcon,
	ModuleSourceFilesIcon
} from '../../../../assets/icons';
import {F1ModuleStructure, O23ModuleStructure} from '../../../../shared';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../opened/workbench/event-bus';
import {castTo, isD9Module, isO23Module} from '../../utils';
import {
	ModuleCommandsNodeLabel,
	ModuleDBScriptsNodeLabel,
	ModuleEnvsNodeLabel,
	ModuleNodeFilesNodeLabel,
	ModuleO23ScriptsPipelinesNodeLabel,
	ModuleO23ServerPipelinesNodeLabel,
	ModuleSourceFilesNodeLabel
} from '../label';
import {
	MODULE_COMMANDS_NODE_MARKER,
	MODULE_DB_SCRIPTS_NODE_MARKER,
	MODULE_ENVS_NODE_MARKER,
	MODULE_NODE_FILES_NODE_MARKER,
	MODULE_O23_SCRIPTS_PIPELINES_NODE_MARKER,
	MODULE_O23_SERVER_PIPELINES_NODE_MARKER,
	MODULE_SOURCE_FILES_NODE_MARKER,
	ProjectRoot,
	ProjectTreeNodeDef,
	ProjectTreeNodeType
} from '../types';

const createCommandsNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$commands$$`, $ip2p: '$$commands$$',
		marker: MODULE_COMMANDS_NODE_MARKER(module),
		label: <ModuleCommandsNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_COMMANDS,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
				segments: [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'CLI Commands', icon: <ModuleCommandsIcon/>}
				]
			});
		}
	};
};
const createEnvsNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$envs$$`, $ip2p: '$$envs$$',
		marker: MODULE_ENVS_NODE_MARKER(module),
		label: <ModuleEnvsNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_ENVS,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
				segments: [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'Environments', icon: <ModuleEnvsIcon/>}
				]
			});
		}
	};
};
const createServerPipelinesNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$server$$`, $ip2p: '$$server$$',
		marker: MODULE_O23_SERVER_PIPELINES_NODE_MARKER(module),
		label: <ModuleO23ServerPipelinesNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_O23_SERVER_PIPELINES,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
				segments: [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'Server Pipelines', icon: <ModuleServerIcon/>}
				]
			});
		}
	};
};
const createScriptsPipelinesNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$scripts$$`,
		$ip2p: '$$scripts$$',
		marker: MODULE_O23_SCRIPTS_PIPELINES_NODE_MARKER(module),
		label: <ModuleO23ScriptsPipelinesNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_O23_SCRIPTS_PIPELINES,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
				segments: [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'Scripts Pipelines', icon: <ModuleScriptsIcon/>}
				]
			});
		}
	};
};
const createDBScriptsFilesNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$o23-db-scripts$$`, $ip2p: '$$o23-db-scripts$$',
		marker: MODULE_DB_SCRIPTS_NODE_MARKER(module),
		label: <ModuleDBScriptsNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_DB_SCRIPTS,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
				segments: [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'Database Scripts', icon: <ModuleDBScriptsIcon/>}
				]
			});
		}
	};
};
const createSourceFilesNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$`, $ip2p: '$$source-files$$',
		marker: MODULE_SOURCE_FILES_NODE_MARKER(module),
		label: <ModuleSourceFilesNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_SOURCE_FILES,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
				segments: [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'SRC', icon: <ModuleSourceFilesIcon/>}
				]
			});
		}
	};
};
const createNodeFilesNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$node-files$$`, $ip2p: '$$node-files$$',
		marker: MODULE_NODE_FILES_NODE_MARKER(module),
		label: <ModuleNodeFilesNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_NODE_FILES,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
				segments: [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'NodeJS', icon: <ModuleNodeFilesIcon/>}
				]
			});
		}
	};
};
const createO23ModuleChildNodes = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): Array<ProjectTreeNodeDef> => {
	return [
		// commands
		createCommandsNode(rootData, module, fire),
		// environments
		createEnvsNode(rootData, module, fire),
		// server pipelines
		createServerPipelinesNode(rootData, module, fire),
		// scripts pipelines
		createScriptsPipelinesNode(rootData, module, fire),
		// db-scripts
		createDBScriptsFilesNode(rootData, module, fire),
		// source files
		createSourceFilesNode(rootData, module, fire),
		// node files
		createNodeFilesNode(rootData, module, fire)
	];
};
export const createModuleChildNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
	if (isD9Module(module)) {
		return [];
	} else if (isO23Module(module)) {
		return createO23ModuleChildNodes(rootData, module, fire);
	} else {
		return [];
	}
};
