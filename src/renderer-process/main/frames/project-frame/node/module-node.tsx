import React from 'react';
import {ModuleRootIcon} from '../../../../../assets/icons';
import {F1ModuleStructure, F1ProjectStructure} from '../../../../../shared';
import {ModuleResource, ResourceType} from '../../../opened/types';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../../opened/workbench/event-bus';
import {ADD_MODULE, ADD_MODULE_MARKER, castTo, isD9Module, isO23Module, MODULE_MARKER} from '../../../utils';
import {AddModuleNodeLabel, ModuleRootNodeLabel} from '../label';
import {ProjectRoot, ProjectTreeNodeDef, ProjectTreeNodeType} from '../types';

const createAddModuleNode = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	// use project and ADD_MODULE as value, tuple
	const marker = ADD_MODULE_MARKER(rootData.project);
	return {
		value: castTo({...rootData, module: ADD_MODULE}),
		$ip2r: `${rootData.project.directory}/modules`, $ip2p: 'modules',
		marker,
		label: <AddModuleNodeLabel {...rootData}/>,
		$type: ProjectTreeNodeType.ADD_MODULE,
		click: async () => {
			// TODO, TO ADD NEW MODULE
		}
	};
};
const createModuleNode = (rootData: ProjectRoot, module: F1ModuleStructure, fire: WorkbenchEventBus['fire']): ProjectTreeNodeDef => {
	// use module as value
	const marker = MODULE_MARKER(module);
	const type = (() => {
		if (isO23Module(module)) {
			return ResourceType.MODULE_O23;
		} else if (isD9Module(module)) {
			return ResourceType.MODULE_D9;
		} else {
			return ResourceType.MODULE_UNKNOWN;
		}
	});
	const resource: ModuleResource = {
		module: <M extends F1ModuleStructure>() => module as M,
		marker, type: type(), segments: [{label: module.name, icon: <ModuleRootIcon/>}]
	};
	return {
		value: castTo({...rootData, module}),
		$ip2r: `${rootData.project.directory}/${module.name}/envs`, $ip2p: module.name,
		marker,
		label: <ModuleRootNodeLabel {...rootData} module={module}/>,
		$type: ProjectTreeNodeType.MODULE,
		click: async () => {
			fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
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
