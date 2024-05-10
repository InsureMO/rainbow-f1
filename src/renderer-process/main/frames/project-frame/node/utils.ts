import {ContextMenuItem, showContextMenu} from '../../../../common/context-menu';
import {ModuleFileResource} from '../../../opened/types';

export const copyResourcePath = (resource: ModuleFileResource) => {
	const path = resource.segments.map(segment => segment.label).join('/');
	(async () => await window.navigator.clipboard.writeText(path))();
};
export const copyResourceAbsolutePath = (resource: ModuleFileResource) => {
	(async () => await window.navigator.clipboard.writeText(resource.absolutePath()))();
};
export const copyResourceRelativePathToProject = (resource: ModuleFileResource) => {
	(async () => await window.navigator.clipboard.writeText(resource.relativePathToProjectRoot()))();
};
export const copyResourceRelativePathToModule = (resource: ModuleFileResource) => {
	(async () => await window.navigator.clipboard.writeText(resource.relativePathToModuleRoot()))();
};

const newSubFolder = (resource: ModuleFileResource) => {
	// TODO NEW SUB FOLDER
};
const newPipeline = (resource: ModuleFileResource) => {
	// TODO NEW PIPELINE
};
const renameResource = (resource: ModuleFileResource) => {
	// TODO RENAME RESOURCE
};
export const onPipelineFileNodeContextMenu = (resource: ModuleFileResource) => {
	return async () => {
		showContextMenu([
			{label: 'New Pipeline', click: 'new-pipeline', invoke: () => newPipeline(resource)},
			{label: 'New Folder', click: 'new-folder', invoke: () => newSubFolder(resource)},
			{type: 'separator'},
			{label: 'Copy Path', click: 'copy-path', invoke: () => copyResourcePath(resource)},
			{
				label: 'Copy Absolute Path', click: 'copy-absolute-path',
				invoke: () => copyResourceAbsolutePath(resource)
			},
			{
				label: 'Copy Relative Path to Project', click: 'copy-relative-path-to-project',
				invoke: () => copyResourceRelativePathToProject(resource)
			},
			{
				label: 'Copy Relative Path to Module', click: 'copy-relative-path-to-module',
				invoke: () => copyResourceRelativePathToModule(resource)
			},
			{type: 'separator'},
			{label: 'Rename', click: 'rename', invoke: () => renameResource(resource)}
		].filter(x => x != null) as Array<ContextMenuItem>);
	};
};
