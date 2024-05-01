import React from 'react';
import {ModuleRootIcon, ModuleScriptsIcon, ModuleServerIcon} from '../../../../assets/icons';
import {ModuleFile, O23ModuleStructure} from '../../../../shared';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../opened/workbench/event-bus';
import {castTo} from '../../utils';
import {
	ModuleO23ScriptsPipelineDirNodeLabel,
	ModuleO23ScriptsPipelineFileNodeLabel,
	ModuleO23ServerPipelineDirNodeLabel,
	ModuleO23ServerPipelineFileNodeLabel
} from '../label';
import {
	MODULE_O23_SCRIPTS_PIPELINE_DIR_NODE_MARKER,
	MODULE_O23_SCRIPTS_PIPELINE_FILE_NODE_MARKER,
	MODULE_O23_SERVER_PIPELINE_DIR_NODE_MARKER,
	MODULE_O23_SERVER_PIPELINE_FILE_NODE_MARKER,
	ProjectRoot,
	ProjectTreeNodeDef,
	ProjectTreeNodeType
} from '../types';
import {buildModuleFileAsActiveResource, createModuleFileNodes} from './module-file-nodes';

export const createModuleO23ServerPipelineChildNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
	return createModuleFileNodes({
		module, files: module.server.files,
		asDirNode: (file: ModuleFile) => {
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$server$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker: MODULE_O23_SERVER_PIPELINE_DIR_NODE_MARKER(module, file),
				label: <ModuleO23ServerPipelineDirNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_O23_SERVER_PIPELINE_DIR,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Server Pipelines', icon: <ModuleServerIcon/>},
							...buildModuleFileAsActiveResource(file)
						]
					});
				}
			};
		},
		asFileNode: (file: ModuleFile) => {
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$server$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker: MODULE_O23_SERVER_PIPELINE_FILE_NODE_MARKER(module, file),
				label: <ModuleO23ServerPipelineFileNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_O23_SERVER_PIPELINE_FILE,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_ACTIVE, {
						segments: [
							{label: module.name, icon: <ModuleRootIcon/>},
							{label: 'Server Pipelines', icon: <ModuleServerIcon/>},
							...buildModuleFileAsActiveResource(file)
						]
					});
				}
			};
		}
	});
};
