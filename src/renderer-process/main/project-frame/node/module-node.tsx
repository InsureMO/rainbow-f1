import React from 'react';
import {ModuleRootIcon} from '../../../../assets/icons';
import {F1ModuleStructure, F1ProjectStructure} from '../../../../shared';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../opened/workbench/event-bus';
import {castTo} from '../../utils';
import {AddModuleNodeLabel, ModuleRootNodeLabel} from '../label';
import {
	ADD_MODULE,
	ADD_MODULE_NODE_MARKER,
	MODULE_NODE_MARKER,
	ProjectRoot,
	ProjectTreeNodeDef,
	ProjectTreeNodeType
} from '../types';

const createAddModuleNode = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	// use project and ADD_MODULE as value, tuple
	return {
		value: castTo({...rootData, module: ADD_MODULE}),
		$ip2r: `${rootData.project.directory}/modules`, $ip2p: 'modules',
		marker: ADD_MODULE_NODE_MARKER(rootData.project),
		label: <AddModuleNodeLabel {...rootData}/>,
		$type: ProjectTreeNodeType.ADD_MODULE,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {segments: []});
		}
	};
};
const createModuleNode = (rootData: ProjectRoot, module: F1ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	// use module as value
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/envs`, $ip2p: module.name,
		marker: MODULE_NODE_MARKER(module),
		label: <ModuleRootNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {segments: [{label: module.name, icon: <ModuleRootIcon/>}]});
		}
	};
};
export const createModuleNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (): Array<ProjectTreeNodeDef> => {
	const modules = [...(rootData.structure as F1ProjectStructure).modules ?? []];
	modules.sort((m1, m2) => {
		return (m1.name ?? '').localeCompare(m2.name ?? '', (void 0), {sensitivity: 'base'});
	});
	if (modules.length === 0) {
		return [createAddModuleNode(rootData, fire)];
	} else {
		return modules.map(module => createModuleNode(rootData, module, fire));
	}
};
