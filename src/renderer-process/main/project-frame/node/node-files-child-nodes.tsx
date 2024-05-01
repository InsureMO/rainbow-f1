import React from 'react';
import {ModuleNodeFilesIcon, ModuleRootIcon} from '../../../../assets/icons';
import {F1ModuleStructure, ModuleFile, O23ModuleStructure} from '../../../../shared';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../opened/workbench/event-bus';
import {castTo, isD9Module, isO23Module} from '../../utils';
import {ModuleNodeDirNodeLabel, ModuleNodeFileNodeLabel} from '../label';
import {
	MODULE_NODE_DIR_NODE_MARKER,
	MODULE_NODE_FILE_NODE_MARKER,
	ProjectRoot,
	ProjectTreeNodeDef,
	ProjectTreeNodeType
} from '../types';
import {buildModuleFileAsActiveResource, createModuleFileNodes} from './module-file-nodes';

const createO23ModuleNodeFileNodes = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): Array<ProjectTreeNodeDef> => {
	return createModuleFileNodes({
		module, files: module.nodeFiles,
		asDirNode: (file: ModuleFile) => {
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$node-files$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker: MODULE_NODE_DIR_NODE_MARKER(module, file),
				label: <ModuleNodeDirNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_NODE_DIR,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'NodeJS', icon: <ModuleNodeFilesIcon/>},
							...buildModuleFileAsActiveResource(file)
						]
					});
				}
			};
		},
		asFileNode: (file: ModuleFile) => {
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$node-files$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker: MODULE_NODE_FILE_NODE_MARKER(module, file),
				label: <ModuleNodeFileNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_NODE_FILE,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'NodeJS', icon: <ModuleNodeFilesIcon/>},
							...buildModuleFileAsActiveResource(file)
						]
					});
				}
			};
		}
	});
};
export const createModuleNodeFileNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
	if (isD9Module(module)) {
		return [];
	} else if (isO23Module(module)) {
		return createO23ModuleNodeFileNodes(rootData, module, fire);
	} else {
		return [];
	}
};
