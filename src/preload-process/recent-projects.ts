import {ipcRenderer} from 'electron';
import {RecentProject, RecentProjectCategory, RecentProjectRoot, StoreEvent} from '../shared/types';

export const RecentProjectsHandlers: WindowElectronRecentProjects = {
	get: (): RecentProjectRoot => ipcRenderer.sendSync(StoreEvent.GET_RECENT_PROJECTS),
	addProject: (project: RecentProject, categoryId?: string) => ipcRenderer.send(StoreEvent.ADD_RECENT_PROJECT, project, categoryId),
	removeProject: (projectId: string) => ipcRenderer.send(StoreEvent.REMOVE_RECENT_PROJECT, projectId),
	clear: () => ipcRenderer.send(StoreEvent.CLEAR_RECENT_PROJECTS),
	addCategory: (category: RecentProjectCategory, parentCategoryId?: string) => ipcRenderer.send(StoreEvent.ADD_RECENT_PROJECT_CATEGORY, category, parentCategoryId),
	renameCategory: (categoryId: string, newName: string) => ipcRenderer.send(StoreEvent.RENAME_RECENT_PROJECT_CATEGORY, categoryId, newName),
	moveCategory: (categoryId: string, newParentCategoryId?: string) => ipcRenderer.send(StoreEvent.MOVE_RECENT_PROJECT_CATEGORY, categoryId, newParentCategoryId),
	removeCategory: (categoryId: string) => ipcRenderer.send(StoreEvent.REMOVE_RECENT_PROJECT_CATEGORY, categoryId)
};
