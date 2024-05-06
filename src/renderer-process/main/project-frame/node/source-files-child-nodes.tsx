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
import {buildModuleFileAsResource, buildModuleFileAsResourceSegments, createModuleFileNodes} from './module-file-nodes';

const createO23ModuleSourceFileNodes = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): Array<ProjectTreeNodeDef> => {
	return createModuleFileNodes({
		module, files: module.sourceFiles,
		asDirNode: (file: ModuleFile) => {
			const marker = MODULE_SOURCE_DIR_NODE_MARKER(module, file);
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker,
				label: <ModuleSourceDirNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_SOURCE_DIR,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_SELECTED, buildModuleFileAsResource(file, marker, () => {
						return [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'SRC', icon: <ModuleSourceFilesIcon/>},
							...buildModuleFileAsResourceSegments(file)
						];
					}));
				}
			};
		},
		asFileNode: (file: ModuleFile) => {
			const marker = MODULE_SOURCE_FILE_NODE_MARKER(module, file);
			const resource = buildModuleFileAsResource(file, marker, () => {
				return [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'SRC', icon: <ModuleSourceFilesIcon/>},
					...buildModuleFileAsResourceSegments(file)
				];
			});
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$source-files$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker,
				label: <ModuleSourceFileNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_SOURCE_FILE,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
				},
				dblClick: async () => {
					fire(WorkbenchEventTypes.OPEN_RESOURCE, resource);
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
