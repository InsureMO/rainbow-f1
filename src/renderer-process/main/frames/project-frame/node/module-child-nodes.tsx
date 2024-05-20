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
} from '../../../../../assets/icons';
import {
	F1ModuleStructure,
	ModuleCommand,
	ModuleEnv,
	ModuleFile,
	ModuleFileType,
	O23ModuleStructure
} from '../../../../../shared';
import {ResourceType} from '../../../opened/types';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../../opened/workbench/event-bus';
import {
	castTo,
	isD9Module,
	isO23Module,
	MODULE_COMMANDS_MARKER,
	MODULE_ENVS_MARKER,
	MODULE_NODE_FILES_MARKER,
	MODULE_O23_DB_SCRIPTS_MARKER,
	MODULE_O23_SCRIPTS_PIPELINES_MARKER,
	MODULE_O23_SERVER_PIPELINES_MARKER,
	MODULE_SOURCE_FILES_MARKER
} from '../../../utils';
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
	ModuleEnvCommandNodeDef,
	ModuleEnvNodeDef,
	ProjectRoot,
	ProjectTreeNodeDef,
	ProjectTreeNodeType
} from '../types';
import {createAllEnvFilesNode, createNonEnvCommandsNode} from './commands-child-nodes';
import {createModuleEnvsChildNodes} from './envs-child-nodes';
import {createVirtualNodeResource} from './utils';

const createCommandsNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	const marker = MODULE_COMMANDS_MARKER(module);
	const resource = createVirtualNodeResource(module, marker, ResourceType.VIRTUAL_COMMANDS, () => {
		return [
			{label: module.name, icon: <ModuleRootIcon/>},
			{label: 'CLI Commands', icon: <ModuleCommandsIcon/>}
		];
	});
	fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
	const envsNode = createEnvsNode(rootData, module, fire);
	const envCommands = (envsNode.$children ?? [])
		.map(node => castTo<ModuleEnvNodeDef>(node).$children ?? [])
		.flat()
		.map(node => {
			return {
				env: castTo<ModuleEnvNodeDef>(node).value.env,
				command: castTo<ModuleEnvCommandNodeDef>(node).value.command
			};
		})
		.reduce((commands, {env, command}) => {
			commands[command.name] = {env, command};
			return commands;
		}, {} as Record<string, { env: ModuleEnv, command: ModuleCommand }>);
	const findEnv = (command: ModuleCommand): Undefinable<ModuleEnv> => envCommands[command.name]?.env;
	const allFiles = (module.files ?? []).reduce((map, file) => {
		map[file.pathRelativeToModuleRoot] = file;
		return map;
	}, {} as Record<string, ModuleFile>);
	const allEnvDirMap: Record<string, boolean> = {};
	const allEnvFiles = [...new Set(Object.values(envCommands).map(({command}) => command.envFiles).flat())]
		.map(envFile => {
			const file = allFiles[envFile];
			if (file == null) {
				return null;
			}
			// change the file type here
			file.type = ModuleFileType.ENV_FILE;
			const files = [file];
			let dirPath = file.pathRelativeToModuleRoot.slice(0, -file.basename.length - 1);
			while (true) {
				if (allEnvDirMap[dirPath] === true) {
					break;
				}
				const dir = allFiles[dirPath];
				if (dir == null) {
					break;
				}
				files.unshift(dir);
				allEnvDirMap[dirPath] = true;
				console.log(dirPath, dir);
				dirPath = dir.pathRelativeToModuleRoot.slice(0, -dir.basename.length - 1);
			}
			return files;
		})
		.filter(x => x != null)
		.flat();
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$commands$$`, $ip2p: '$$commands$$',
		marker,
		label: <ModuleCommandsNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_COMMANDS,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
		},
		$children: [
			// env nodes and commands
			...(envsNode.$children ?? []),
			// other commands which not belong to any env
			createNonEnvCommandsNode(rootData, module, findEnv, fire),
			// all env files
			createAllEnvFilesNode(rootData, module, allEnvFiles, fire)
		]
	};
};
const createEnvsNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	const marker = MODULE_ENVS_MARKER(module);
	const resource = createVirtualNodeResource(module, marker, ResourceType.VIRTUAL_ENVS, () => {
		return [
			{label: module.name, icon: <ModuleRootIcon/>},
			{label: 'Environments', icon: <ModuleEnvsIcon/>}
		];
	});
	fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$envs$$`, $ip2p: '$$envs$$',
		marker,
		label: <ModuleEnvsNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_ENVS,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
		},
		$children: createModuleEnvsChildNodes(rootData, fire)(module)
	};
};
const createServerPipelinesNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	const marker = MODULE_O23_SERVER_PIPELINES_MARKER(module);
	const resource = createVirtualNodeResource(module, marker, ResourceType.VIRTUAL_SERVER_PIPELINES, () => {
		return [
			{label: module.name, icon: <ModuleRootIcon/>},
			{label: 'Server Pipelines', icon: <ModuleServerIcon/>}
		];
	});
	fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$server$$`, $ip2p: '$$server$$',
		marker,
		label: <ModuleO23ServerPipelinesNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_O23_SERVER_PIPELINES,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
		}
	};
};
const createScriptsPipelinesNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	const marker = MODULE_O23_SCRIPTS_PIPELINES_MARKER(module);
	const resource = createVirtualNodeResource(module, marker, ResourceType.VIRTUAL_SCRIPTS_PIPELINES, () => {
		return [
			{label: module.name, icon: <ModuleRootIcon/>},
			{label: 'Scripts Pipelines', icon: <ModuleScriptsIcon/>}
		];
	});
	fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$scripts$$`,
		$ip2p: '$$scripts$$',
		marker,
		label: <ModuleO23ScriptsPipelinesNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_O23_SCRIPTS_PIPELINES,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
		}
	};
};
const createDBScriptsFilesNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	const marker = MODULE_O23_DB_SCRIPTS_MARKER(module);
	const resource = createVirtualNodeResource(module, marker, ResourceType.VIRTUAL_DB_SCRIPTS, () => {
		return [
			{label: module.name, icon: <ModuleRootIcon/>},
			{label: 'Database Scripts', icon: <ModuleDBScriptsIcon/>}
		];
	});
	fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$o23-db-scripts$$`, $ip2p: '$$o23-db-scripts$$',
		marker,
		label: <ModuleDBScriptsNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_DB_SCRIPTS,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
		}
	};
};
const createSourceFilesNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	const marker = MODULE_SOURCE_FILES_MARKER(module);
	const resource = createVirtualNodeResource(module, marker, ResourceType.VIRTUAL_SOURCE_FILES, () => {
		return [
			{label: module.name, icon: <ModuleRootIcon/>},
			{label: 'SRC', icon: <ModuleSourceFilesIcon/>}
		];
	});
	fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$`, $ip2p: '$$source-files$$',
		marker,
		label: <ModuleSourceFilesNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_SOURCE_FILES,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
		}
	};
};
const createNodeFilesNode = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	const marker = MODULE_NODE_FILES_MARKER(module);
	const resource = createVirtualNodeResource(module, marker, ResourceType.VIRTUAL_NODE_FILES, () => {
		return [
			{label: module.name, icon: <ModuleRootIcon/>},
			{label: 'NodeJS', icon: <ModuleNodeFilesIcon/>}
		];
	});
	fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$node-files$$`, $ip2p: '$$node-files$$',
		marker,
		label: <ModuleNodeFilesNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_NODE_FILES,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
		}
	};
};
const createO23ModuleChildNodes = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): Array<ProjectTreeNodeDef> => {
	return [
		// commands
		createCommandsNode(rootData, module, fire),
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
