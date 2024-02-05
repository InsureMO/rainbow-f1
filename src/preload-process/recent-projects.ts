import {ipcRenderer} from 'electron';
import {RecentProject, RecentProjectCategory, RecentProjectRoot, StoreEvent} from '../shared/types';

export const RecentProjectsHandlers: WindowElectronRecentProjects = {
	get: (): RecentProjectRoot => ipcRenderer.sendSync(StoreEvent.GET_RECENT_PROJECTS),
	addProject: (project: RecentProject, categoryId?: string) => ipcRenderer.send(StoreEvent.ADD_RECENT_PROJECT, project, categoryId),
	removeProject: (projectId: string) => ipcRenderer.send(StoreEvent.REMOVE_RECENT_PROJECT, projectId),
	clear: () => ipcRenderer.send(StoreEvent.CLEAR_RECENT_PROJECTS),
	addCategory: (category: RecentProjectCategory, parentCategoryId?: string) => ipcRenderer.send(StoreEvent.ADD_RECENT_PROJECT_CATEGORY, category, parentCategoryId),
	removeCategory: (categoryId: string) => ipcRenderer.send(StoreEvent.REMOVE_RECENT_PROJECT_CATEGORY, categoryId)
};
