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
import {buildModuleFileAsActiveResource, createModuleFileNodes} from './module-file-nodes';

export const createModuleDBScriptsChildNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
	return createModuleFileNodes({
		module, files: module.dbScripts.files,
		asDirNode: (file: ModuleFile) => {
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$$$o23-db-scripts$$$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker: MODULE_DB_SCRIPTS_DIR_NODE_MARKER(module, file),
				label: <ModuleDBScriptsDirNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_DB_SCRIPTS_DIR,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Database Scripts', icon: <ModuleDBScriptsIcon/>},
							...buildModuleFileAsActiveResource(file)
						]
					});
				}
			};
		},
		asFileNode: (file: ModuleFile) => {
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$$$o23-db-scripts$$$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker: MODULE_DB_SCRIPTS_FILE_NODE_MARKER(module, file),
				label: <ModuleDBScriptsFileNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_DB_SCRIPTS_FILE,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Database Scripts', icon: <ModuleDBScriptsIcon/>},
							...buildModuleFileAsActiveResource(file)
						]
					});
				}
			};
		}
	});
};
