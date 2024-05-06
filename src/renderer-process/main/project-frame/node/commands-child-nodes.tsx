import React from 'react';
import {ModuleCommandIcon, ModuleCommandsIcon, ModuleRootIcon} from '../../../../assets/icons';
import {F1ModuleStructure} from '../../../../shared';
import {ModuleCommandResource} from '../../opened/types';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../opened/workbench/event-bus';
import {castTo} from '../../utils';
import {ModuleCommandNodeLabel} from '../label';
import {MODULE_COMMAND_NODE_MARKER, ProjectRoot, ProjectTreeNodeDef, ProjectTreeNodeType} from '../types';

export const createModuleCommandsChildNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
	return Object.values(module.commands ?? {}).sort((c1, c2) => {
		return c1.name.localeCompare(c2.name, (void 0), {sensitivity: 'base'});
	}).map(cmd => {
		const marker = MODULE_COMMAND_NODE_MARKER(module, cmd);
		const resource: ModuleCommandResource = {
			command: cmd, marker, file: cmd,
			segments: [
				{label: module.name, icon: <ModuleRootIcon/>},
				{label: 'CLI Commands', icon: <ModuleCommandsIcon/>},
				{label: cmd.name, icon: <ModuleCommandIcon/>}
			],
			absolutePath: () => `${cmd.path}::${cmd.name}`
		};
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
		};
	});
};
