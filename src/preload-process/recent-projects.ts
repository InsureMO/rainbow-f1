import {ipcRenderer} from 'electron';
import {ElectronBridges, RecentProject, RecentProjectCategory, RecentProjectRoot, RecentProjectsEvent} from '../shared';

export const RecentProjectsBridge: ElectronBridges.WindowElectronRecentProjects = {
	get: (): RecentProjectRoot => {
		return ipcRenderer.sendSync(RecentProjectsEvent.GET_ALL);
	},
	addProject: (project: RecentProject, categoryId?: string): void => {
		ipcRenderer.send(RecentProjectsEvent.ADD_PROJECT, project, categoryId);
	},
	renameProject: (projectId: string, newName: string): void => {
		ipcRenderer.send(RecentProjectsEvent.RENAME_PROJECT, projectId, newName);
	},
	moveProject: (projectId: string, newParentCategoryId?: string): void => {
		ipcRenderer.send(RecentProjectsEvent.MOVE_PROJECT, projectId, newParentCategoryId);
	},
	removeProject: (projectId: string): void => {
		ipcRenderer.send(RecentProjectsEvent.REMOVE_PROJECT, projectId);
	},
	clear: (): void => {
		ipcRenderer.send(RecentProjectsEvent.CLEAR_ALL);
	},
	addCategory: (category: RecentProjectCategory, parentCategoryId?: string): void => {
		ipcRenderer.send(RecentProjectsEvent.ADD_CATEGORY, category, parentCategoryId);
	},
	renameCategory: (categoryId: string, newName: string): void => {
		ipcRenderer.send(RecentProjectsEvent.RENAME_CATEGORY, categoryId, newName);
	},
	moveCategory: (categoryId: string, newParentCategoryId?: string): void => {
		ipcRenderer.send(RecentProjectsEvent.MOVE_CATEGORY, categoryId, newParentCategoryId);
	},
	removeCategory: (categoryId: string): void => {
		ipcRenderer.send(RecentProjectsEvent.REMOVE_CATEGORY, categoryId);
	}
};
