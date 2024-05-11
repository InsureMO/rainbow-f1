import React from 'react';
import {ModuleRootIcon, ModuleScriptsIcon} from '../../../../../assets/icons';
import {ModuleFile, O23ModuleStructure} from '../../../../../shared';
import {ResourceType} from '../../../opened/types';
import {WorkbenchEventBus, WorkbenchEventTypes} from '../../../opened/workbench/event-bus';
import {castTo, MODULE_O23_SCRIPTS_PIPELINE_DIR_MARKER, MODULE_O23_SCRIPTS_PIPELINE_FILE_MARKER} from '../../../utils';
import {ModuleO23ScriptsPipelineDirNodeLabel, ModuleO23ScriptsPipelineFileNodeLabel} from '../label';
import {ProjectRoot, ProjectTreeNodeDef, ProjectTreeNodeType} from '../types';
import {buildModuleFileAsResource, buildModuleFileAsResourceSegments, createModuleFileNodes} from './module-file-nodes';
import {onPipelineFileNodeContextMenu} from './utils';

export const createModuleO23ScriptsPipelineChildNodes = (rootData: ProjectRoot, fire: WorkbenchEventBus['fire']) => (module: O23ModuleStructure): Array<ProjectTreeNodeDef> => {
	return createModuleFileNodes({
		module, files: module.scripts.files,
		asDirNode: (file: ModuleFile) => {
			const marker = MODULE_O23_SCRIPTS_PIPELINE_DIR_MARKER(module, file);
			const resource = buildModuleFileAsResource(module, file, marker, ResourceType.O23_SCRIPTS_PIPELINES_DIR, () => {
				return [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'Scripts Pipelines', icon: <ModuleScriptsIcon/>},
					...buildModuleFileAsResourceSegments(file)
				];
			});
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$server$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker,
				label: <ModuleO23ScriptsPipelineDirNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_O23_SCRIPTS_PIPELINE_DIR,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
				},
				contextMenu: onPipelineFileNodeContextMenu(resource)
			};
		},
		asFileNode: (file: ModuleFile) => {
			const marker = MODULE_O23_SCRIPTS_PIPELINE_FILE_MARKER(module, file);
			const resource = buildModuleFileAsResource(module, file, marker, ResourceType.O23_SCRIPTS_PIPELINES_FILE, () => {
				return [
					{label: module.name, icon: <ModuleRootIcon/>},
					{label: 'Scripts Pipelines', icon: <ModuleScriptsIcon/>},
					...buildModuleFileAsResourceSegments(file)
				];
			});
			return {
				value: castTo({...rootData, module, file}),
				$ip2r: `${rootData.project.directory}/${module.name}/$$o23-pipelines$$/$$server$$/$$${file.path}$$`,
				$ip2p: file.path,
				marker,
				label: <ModuleO23ScriptsPipelineFileNodeLabel {...rootData} module={module} file={file}/>,
				$type: ProjectTreeNodeType.MODULE_O23_SCRIPTS_PIPELINE_FILE,
				click: async () => {
					fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
				},
				dblClick: async () => {
					fire(WorkbenchEventTypes.OPEN_RESOURCE, resource);
				},
				contextMenu: onPipelineFileNodeContextMenu(resource)
			};
		}
	});
};
