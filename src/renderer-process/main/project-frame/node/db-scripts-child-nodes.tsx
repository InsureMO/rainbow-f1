import React from 'react';
import {ModuleDBScriptsIcon, ModuleRootIcon} from '../../../../assets/icons';
import {ModuleFile, O23ModuleStructure} from '../../../../shared';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../opened/workbench/event-bus';
import {castTo} from '../../utils';
import {ModuleDBScriptsDirNodeLabel, ModuleDBScriptsFileNodeLabel} from '../label';
import {
	MODULE_DB_SCRIPTS_DIR_NODE_MARKER,
	MODULE_DB_SCRIPTS_FILE_NODE_MARKER,
	ProjectRoot,
	ProjectTreeNodeDef,
	ProjectTreeNodeType
} from '../types';
import {buildModuleFileAsResource, buildModuleFileAsResourceSegments, createModuleFileNodes} from './module-file-nodes';

export const createModuleDBScriptsChildNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
	return createModuleFileNodes({
		module, files: module.dbScripts.files,
		asDirNode: (file: ModuleFile) => {
			const marker = MODULE_DB_SCRIPTS_DIR_NODE_MARKER(module, file);
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$$$o23-db-scripts$$$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker,
				label: <ModuleDBScriptsDirNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_DB_SCRIPTS_DIR,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_SELECTED, buildModuleFileAsResource(file, marker, () => {
						return [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Database Scripts', icon: <ModuleDBScriptsIcon/>},
							...buildModuleFileAsResourceSegments(file)
						];
					}));
				}
			};
		},
		asFileNode: (file: ModuleFile) => {
			const marker = MODULE_DB_SCRIPTS_FILE_NODE_MARKER(module, file);
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$$$o23-db-scripts$$$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker,
				label: <ModuleDBScriptsFileNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_DB_SCRIPTS_FILE,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_SELECTED, buildModuleFileAsResource(file, marker, () => {
						return [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Database Scripts', icon: <ModuleDBScriptsIcon/>},
							...buildModuleFileAsResourceSegments(file)
						];
					}));
				}
			};
		}
	});
};
