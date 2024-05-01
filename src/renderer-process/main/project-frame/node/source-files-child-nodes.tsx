import React from 'react';
import {ModuleRootIcon, ModuleSourceFilesIcon} from '../../../../assets/icons';
import {F1ModuleStructure, ModuleFile, O23ModuleStructure} from '../../../../shared';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../opened/workbench/event-bus';
import {castTo, isD9Module, isO23Module} from '../../utils';
import {ModuleSourceDirNodeLabel, ModuleSourceFileNodeLabel} from '../label';
import {
	MODULE_SOURCE_DIR_NODE_MARKER,
	MODULE_SOURCE_FILE_NODE_MARKER,
	ProjectRoot,
	ProjectTreeNodeDef,
	ProjectTreeNodeType
} from '../types';
import {buildModuleFileAsActiveResource, createModuleFileNodes} from './module-file-nodes';

const createO23ModuleSourceFileNodes = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): Array<ProjectTreeNodeDef> => {
	return createModuleFileNodes({
		module, files: module.sourceFiles,
		asDirNode: (file: ModuleFile) => {
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker: MODULE_SOURCE_DIR_NODE_MARKER(module, file),
				label: <ModuleSourceDirNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_SOURCE_DIR,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'SRC', icon: <ModuleSourceFilesIcon/>},
							...buildModuleFileAsActiveResource(file)
						]
					});
				}
			};
		},
		asFileNode: (file: ModuleFile) => {
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker: MODULE_SOURCE_FILE_NODE_MARKER(module, file),
				label: <ModuleSourceFileNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_SOURCE_FILE,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'SRC', icon: <ModuleSourceFilesIcon/>},
							...buildModuleFileAsActiveResource(file)
						]
					});
				}
			};
		}
	});
};
export const createModuleSourceFileNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
	if (isD9Module(module)) {
		return [];
	} else if (isO23Module(module)) {
		return createO23ModuleSourceFileNodes(rootData, module, fire);
	} else {
		return [];
	}
};
