import React from 'react';
import {ModuleCommandIcon, ModuleEnvIcon, ModuleEnvsIcon, ModuleRootIcon} from '../../../../assets/icons';
import {F1ModuleStructure, ModuleCommand} from '../../../../shared';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../opened/workbench/event-bus';
import {castTo} from '../../utils';
import {ModuleEnvCommandNodeLabel, ModuleEnvNodeLabel} from '../label';
import {
	MODULE_ENV_COMMAND_NODE_MARKER,
	MODULE_ENV_NODE_MARKER,
	ModuleEnv,
	ProjectRoot,
	ProjectTreeNodeDef,
	ProjectTreeNodeType
} from '../types';

export const createModuleEnvsChildNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
	const envs: Record<string, Array<ModuleCommand>> = {};
	Object.entries(module.commands ?? {}).forEach(([, command]) => {
		const {name} = command;
		if (name === 'start' || name === 'scripts') {
			envs.local = envs.local ?? [];
			envs.local.push(command);
		}
		const parts = name.split(/[:\-]/);
		if (parts.length > 1) {
			const env = parts[0];
			const cmd = parts[parts.length - 1];
			if (cmd === 'start' || cmd === 'scripts') {
				envs[env] = envs[env] ?? [];
				envs[env].push(command);
			}
		}
	});

	return Object.entries(envs)
		.sort(([n1], [n2]) => {
			return n1.localeCompare(n2, (void 0), {sensitivity: 'base'});
		}).map(([name, commands]) => ({name, commands}))
		.map((env) => {
			return {
				value: castTo({...rootData, module, env}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$envs$$/${env.name}`, $ip2p: env.name,
				marker: MODULE_ENV_NODE_MARKER(module, env),
				label: <ModuleEnvNodeLabel {...rootData} module={module} env={env}/>,
				$type: ProjectTreeNodeType.MODULE_ENV,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Environments', icon: <ModuleEnvsIcon/>},
							{label: env.name, icon: <ModuleEnvIcon/>}
						]
					});
				}
			};
		});
};
export const createModuleEnvChildNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: F1ModuleStructure, env: ModuleEnv): Array<ProjectTreeNodeDef> => {
	return [...env.commands]
		.sort((c1, c2) => c1.name.localeCompare(c2.name, (void 0)))
		.map(command => {
			return {
				value: castTo({...rootData, module, env, command}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$envs$$/${env.name}/${command.name}`,
				$ip2p: command.name,
				marker: MODULE_ENV_COMMAND_NODE_MARKER(module, env, command),
				label: <ModuleEnvCommandNodeLabel {...rootData} module={module} env={env} command={command}/>,
				$type: ProjectTreeNodeType.MODULE_ENV_COMMAND,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Environments', icon: <ModuleEnvsIcon/>},
							{label: env.name, icon: <ModuleEnvIcon/>},
							{label: command.name, icon: <ModuleCommandIcon/>}
						]
					});
				}
			};
		});
};
