import React from 'react';
import {ModuleCommandIcon, ModuleEnvIcon, ModuleEnvsIcon, ModuleRootIcon} from '../../../../../assets/icons';
import {F1ModuleStructure, ModuleCommand, ModuleEnv} from '../../../../../shared';
import {ModuleCommandResource, ModuleEnvResource, ResourceType} from '../../../opened/types';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../../opened/workbench/event-bus';
import {castTo, isD9Module, isO23Module, MODULE_ENV_COMMAND_MARKER, MODULE_ENV_MARKER} from '../../../utils';
import {ModuleEnvCommandNodeLabel, ModuleEnvNodeLabel} from '../label';
import {ProjectRoot, ProjectTreeNodeDef, ProjectTreeNodeType} from '../types';

const getModuleCommands = (module: F1ModuleStructure) => {
	switch (true) {
		case isO23Module(module):
			return ['start', 'scripts'];
		case isD9Module(module):
			return ['start'];
		default:
			return [];
	}
};
export const createModuleEnvsChildNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
	const envs: Record<string, Array<ModuleCommand>> = {};
	const commands = getModuleCommands(module);
	Object.entries(module.commands ?? {}).forEach(([, command]) => {
		const {name} = command;
		if (commands.includes(name)) {
			envs.local = envs.local ?? [];
			envs.local.push(command);
		}
		const parts = name.split(/[:\-]/);
		if (parts.length > 1) {
			let env = parts[0];
			// treat debug as local
			env = env === 'debug' ? 'local' : env;
			const cmd = parts[parts.length - 1];
			if (commands.includes(cmd)) {
				envs[env] = envs[env] ?? [];
				envs[env].push(command);
			}
		}
	});

	return Object.entries(envs)
		.sort(([n1], [n2]) => {
			return n1.localeCompare(n2, (void 0), {sensitivity: 'base'});
		}).map(([name, commands]) => ({name, commands} as ModuleEnv))
		.map((env) => {
			const marker = MODULE_ENV_MARKER(module, env);
			const resource: ModuleEnvResource = {
				module: <M extends F1ModuleStructure>() => module as M,
				env, marker, type: ResourceType.ENV, file: env,
				segments: [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'Environments', icon: <ModuleEnvsIcon/>},
					{label: env.name, icon: <ModuleEnvIcon/>}
				],
				absolutePath: () => `${env.path}`,
				relativePathToRoot: () => `${env.pathRelativeToRoot}`,
				relativePathToProjectRoot: () => `${env.pathRelativeToProjectRoot}`,
				relativePathToModuleRoot: () => `${env.pathRelativeToModuleRoot}`
			};
			fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
			return {
				value: castTo({...rootData, module, env}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$envs$$/${env.name}`, $ip2p: env.name,
				marker,
				label: <ModuleEnvNodeLabel {...rootData} module={module} env={env}/>,
				$type: ProjectTreeNodeType.MODULE_ENV,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
				},
				$children: createModuleEnvChildNodes(rootData, fire)(module, env)
			};
		});
};
export const createModuleEnvChildNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: F1ModuleStructure, env: ModuleEnv): Array<ProjectTreeNodeDef> => {
	return [...env.commands]
		.sort((c1, c2) => c1.name.localeCompare(c2.name, (void 0)))
		.map(command => {
			const marker = MODULE_ENV_COMMAND_MARKER(module, env, command);
			const resource: ModuleCommandResource = {
				module: <M extends F1ModuleStructure>() => module as M,
				env, command, marker, type: ResourceType.ENV_COMMAND, file: command,
				segments: [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'Environments', icon: <ModuleEnvsIcon/>},
					{label: env.name, icon: <ModuleEnvIcon/>},
					{label: command.name, icon: <ModuleCommandIcon/>}
				],
				absolutePath: () => `${command.path}::${command.name}`,
				relativePathToRoot: () => `${command.pathRelativeToRoot}::${command.name}`,
				relativePathToProjectRoot: () => `${command.pathRelativeToProjectRoot}::${command.name}`,
				relativePathToModuleRoot: () => `${command.pathRelativeToModuleRoot}::${command.name}`
			};
			fire(WorkbenchEventTypes.REGISTER_RESOURCE, resource);
			return {
				value: castTo({...rootData, module, env, command}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$envs$$/${env.name}/${command.name}`,
				$ip2p: command.name,
				marker,
				label: <ModuleEnvCommandNodeLabel {...rootData} module={module} env={env} command={command}/>,
				$type: ProjectTreeNodeType.MODULE_ENV_COMMAND,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
				},
				dblClick: async () => {
					fire(WorkbenchEventTypes.OPEN_RESOURCE, resource);
				}
			};
		});
};
