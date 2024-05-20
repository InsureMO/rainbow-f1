import React from 'react';
import {ModuleCommandIcon, ModuleCommandsIcon, ModuleEnvFilesIcon, ModuleRootIcon} from '../../../../../assets/icons';
import {F1ModuleStructure, ModuleCommand, ModuleEnv, ModuleFile, O23ModuleStructure} from '../../../../../shared';
import {ModuleCommandResource, ResourceType} from '../../../opened/types';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../../opened/workbench/event-bus';
import {
	castTo,
	MODULE_COMMAND_MARKER,
	MODULE_ENV_FILES_DIR_MARKER,
	MODULE_ENV_FILES_FILE_MARKER,
	MODULE_ENV_FILES_MARKER,
	MODULE_NON_ENV_COMMANDS_MARKER
} from '../../../utils';
import {
	ModuleCommandNodeLabel,
	ModuleEnvFilesDirNodeLabel,
	ModuleEnvFilesFileNodeLabel,
	ModuleEnvFilesNodeLabel,
	ModuleNonEnvCommandsNodeLabel
} from '../label';
import {ProjectRoot, ProjectTreeNodeDef, ProjectTreeNodeType} from '../types';
import {buildModuleFileAsResource, buildModuleFileAsResourceSegments, createModuleFileNodes} from './module-file-nodes';
import {createVirtualNodeResource} from './utils';

export const createModuleNonEnvCommandsChildNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => {
	return (module: F1ModuleStructure, findEnv: (command: ModuleCommand) => Undefinable<ModuleEnv>): Array<ProjectTreeNodeDef> => {
		return Object.values(module.commands ?? {}).sort((c1, c2) => {
			return c1.name.localeCompare(c2.name, (void 0), {sensitivity: 'base'});
		}).map(cmd => {
			const env = findEnv(cmd);
			if (env != null) {
				return null;
			}
			const marker = MODULE_COMMAND_MARKER(module, cmd);
			const resource: ModuleCommandResource = {
				module: <M extends F1ModuleStructure>() => module as M,
				command: cmd, marker, type: ResourceType.COMMAND, file: cmd,
				segments: [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'CLI Commands', icon: <ModuleCommandsIcon/>},
					{label: 'Others', icon: <ModuleCommandsIcon/>},
					{label: cmd.name, icon: <ModuleCommandIcon/>}
				],
				absolutePath: () => `${cmd.path}::${cmd.name}`,
				relativePathToRoot: () => `${cmd.pathRelativeToRoot}::${cmd.name}`,
				relativePathToProjectRoot: () => `${cmd.pathRelativeToProjectRoot}::${cmd.name}`,
				relativePathToModuleRoot: () => `${cmd.pathRelativeToModuleRoot}::${cmd.name}`
			};
			fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
			return {
				value: castTo({...rootData, module, cmd}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$commands$$/${cmd.name}`, $ip2p: cmd.name,
				marker, label: <ModuleCommandNodeLabel {...rootData} module={module} command={cmd}/>,
				$type: ProjectTreeNodeType.MODULE_COMMAND,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
				},
				dblClick: async () => {
					fire(WorkbenchEventTypes.OPEN_RESOURCE, resource);
				}
			} as ProjectTreeNodeDef;
		}).filter(x => x != null);
	};
};
export const createNonEnvCommandsNode = (rootData: ProjectRoot, module: O23ModuleStructure, findEnv: (command: ModuleCommand) => Undefinable<ModuleEnv>, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	const marker = MODULE_NON_ENV_COMMANDS_MARKER(module);
	const resource = createVirtualNodeResource(module, marker, ResourceType.VIRTUAL_NON_ENV_COMMANDS, () => {
		return [
			{label: module.name, icon: <ModuleRootIcon/>},
			{label: 'CLI Commands', icon: <ModuleCommandsIcon/>},
			{label: 'Others', icon: <ModuleCommandsIcon/>}
		];
	});
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$non-env-commands$$`,
		$ip2p: '$$non-env-commands$$',
		marker,
		label: <ModuleNonEnvCommandsNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_NON_ENV_COMMANDS,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
		},
		$children: createModuleNonEnvCommandsChildNodes(rootData, fire)(module, findEnv)
	};
};
export const createAllEnvFilesNode = (rootData: ProjectRoot, module: O23ModuleStructure, allEnvFiles: Array<ModuleFile>, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	const marker = MODULE_ENV_FILES_MARKER(module);
	const allEnvFilesResource = createVirtualNodeResource(module, marker, ResourceType.VIRTUAL_ENV_FILES, () => {
		return [
			{label: module.name, icon: <ModuleRootIcon/>},
			{label: 'CLI Commands', icon: <ModuleCommandsIcon/>},
			{label: 'Environment Files', icon: <ModuleEnvFilesIcon/>}
		];
	});
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/$$env-files$$`,
		$ip2p: '$$env-files$$',
		marker,
		label: <ModuleEnvFilesNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE_ENV_FILES,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_SELECTED, allEnvFilesResource);
		},
		$children: createModuleFileNodes({
			module, files: allEnvFiles,
			asDirNode: (file: ModuleFile) => {
				const marker = MODULE_ENV_FILES_DIR_MARKER(module, file);
				const resource = buildModuleFileAsResource(module, file, marker, ResourceType.ENV_FILE_DIR, () => {
					return [
						{label: module.name, icon: <ModuleRootIcon/>},
						{label: 'CLI Commands', icon: <ModuleCommandsIcon/>},
						{label: 'Environment Files', icon: <ModuleEnvFilesIcon/>},
						...buildModuleFileAsResourceSegments(file)
					];
				});
				fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$env-files-dir$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker,
					label: <ModuleEnvFilesDirNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_ENV_FILES_DIR,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
					}
				};
			},
			asFileNode: (file: ModuleFile) => {
				const marker = MODULE_ENV_FILES_FILE_MARKER(module, file);
				const resource = buildModuleFileAsResource(module, file, marker, ResourceType.ENV_FILE, () => {
					return [
						{label: module.name, icon: <ModuleRootIcon/>},
						{label: 'CLI Commands', icon: <ModuleCommandsIcon/>},
						{label: 'Environment Files', icon: <ModuleEnvFilesIcon/>},
						...buildModuleFileAsResourceSegments(file)
					];
				});
				fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
				return {
					value: castTo({...rootData, module, file}),
					$ip2r: `${rootData.project.directory}/${module.name}/$$env-files-file$$/$$${file.path}$$`,
					$ip2p: file.path,
					marker,
					label: <ModuleEnvFilesFileNodeLabel {...rootData} module={module} file={file}/>,
					$type: ProjectTreeNodeType.MODULE_ENV_FILES_FILE,
					click: async () => {
						fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
					},
					dblClick: async () => {
						fire(WorkbenchEventTypes.OPEN_RESOURCE, resource);
					}
				};
			}
		})
	};
};