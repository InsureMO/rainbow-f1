import {ipcRenderer} from 'electron';
import {
	ElectronBridges,
	RecentProject,
	RecentProjectCategory,
	RecentProjectEntityId,
	RecentProjectEntityName,
	RecentProjectRoot,
	RecentProjectsEvent
} from '../shared';

export const RecentProjectsBridge: ElectronBridges.WindowElectronRecentProjects = {
	get: (): RecentProjectRoot => {
		return ipcRenderer.sendSync(RecentProjectsEvent.GET_ALL);
	},
	addProject: (project: RecentProject, categoryId?: RecentProjectEntityId): void => {
		ipcRenderer.send(RecentProjectsEvent.ADD_PROJECT, project, categoryId);
	},
	renameProject: (projectId: RecentProjectEntityId, newName: RecentProjectEntityName): void => {
		ipcRenderer.send(RecentProjectsEvent.RENAME_PROJECT, projectId, newName);
	},
	moveProject: (projectId: RecentProjectEntityId, newParentCategoryId?: RecentProjectEntityId): void => {
		ipcRenderer.send(RecentProjectsEvent.MOVE_PROJECT, projectId, newParentCategoryId);
	},
	removeProject: (projectId: RecentProjectEntityId): void => {
		ipcRenderer.send(RecentProjectsEvent.REMOVE_PROJECT, projectId);
	},
	clear: (): void => {
		ipcRenderer.send(RecentProjectsEvent.CLEAR_ALL);
	},
	addCategory: (category: RecentProjectCategory, parentCategoryId?: RecentProjectEntityId): void => {
		ipcRenderer.send(RecentProjectsEvent.ADD_CATEGORY, category, parentCategoryId);
	},
	renameCategory: (categoryId: RecentProjectEntityId, newName: RecentProjectEntityName): void => {
		ipcRenderer.send(RecentProjectsEvent.RENAME_CATEGORY, categoryId, newName);
	},
	moveCategory: (categoryId: RecentProjectEntityId, newParentCategoryId?: RecentProjectEntityId): void => {
		ipcRenderer.send(RecentProjectsEvent.MOVE_CATEGORY, categoryId, newParentCategoryId);
	},
	removeCategory: (categoryId: RecentProjectEntityId): void => {
		ipcRenderer.send(RecentProjectsEvent.REMOVE_CATEGORY, categoryId);
	}
};
