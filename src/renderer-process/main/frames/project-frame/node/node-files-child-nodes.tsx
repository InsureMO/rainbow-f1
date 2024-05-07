import React from 'react';
import {ModuleNodeFilesIcon, ModuleRootIcon} from '../../../../../assets/icons';
import {F1ModuleStructure, ModuleFile, O23ModuleStructure} from '../../../../../shared';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../../opened/workbench/event-bus';
import {
	castTo,
	isD9Module,
	isO23Module,
	MODULE_NODE_FILES_DIR_MARKER,
	MODULE_NODE_FILES_FILE_MARKER
} from '../../../utils';
import {ModuleNodeDirNodeLabel, ModuleNodeFileNodeLabel} from '../label';
import {ProjectRoot, ProjectTreeNodeDef, ProjectTreeNodeType} from '../types';
import {buildModuleFileAsResource, buildModuleFileAsResourceSegments, createModuleFileNodes} from './module-file-nodes';

const createO23ModuleNodeFileNodes = (rootData: ProjectRoot, module: O23ModuleStructure, fire: WorkbenchEventBus['fire']): Array<ProjectTreeNodeDef> => {
	return createModuleFileNodes({
		module, files: module.nodeFiles,
		asDirNode: (file: ModuleFile) => {
			const marker = MODULE_NODE_FILES_DIR_MARKER(module, file);
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$node-files$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker,
				label: <ModuleNodeDirNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_NODE_DIR,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_SELECTED, buildModuleFileAsResource(file, marker, () => {
						return [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'NodeJS', icon: <ModuleNodeFilesIcon/>},
							...buildModuleFileAsResourceSegments(file)
						];
					}));
				}
			};
		},
		asFileNode: (file: ModuleFile) => {
			const marker = MODULE_NODE_FILES_FILE_MARKER(module, file);
			const resource = buildModuleFileAsResource(file, marker, () => {
				return [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'NodeJS', icon: <ModuleNodeFilesIcon/>},
					...buildModuleFileAsResourceSegments(file)
				];
			});
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$node-files$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker,
				label: <ModuleNodeFileNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_NODE_FILE,
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
export const createModuleNodeFileNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: F1ModuleStructure): Array<ProjectTreeNodeDef> => {
	if (isD9Module(module)) {
		return [];
	} else if (isO23Module(module)) {
		return createO23ModuleNodeFileNodes(rootData, module, fire);
	} else {
		return [];
	}
};
