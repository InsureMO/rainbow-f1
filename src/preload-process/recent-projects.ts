import {ipcRenderer} from 'electron';
import {RecentProject, RecentProjectCategory, RecentProjectsEvent, RecentProjectRoot} from '../shared/types';

export const RecentProjectsHandlers: WindowElectronRecentProjects = {
	get: (): RecentProjectRoot => ipcRenderer.sendSync(RecentProjectsEvent.GET_ALL),
	addProject: (project: RecentProject, categoryId?: string) => ipcRenderer.send(RecentProjectsEvent.ADD_PROJECT, project, categoryId),
	renameProject: (projectId: string, newName: string) => ipcRenderer.send(RecentProjectsEvent.RENAME_PROJECT, projectId, newName),
	removeProject: (projectId: string) => ipcRenderer.send(RecentProjectsEvent.REMOVE_PROJECT, projectId),
	clear: () => ipcRenderer.send(RecentProjectsEvent.CLEAR_ALL),
	addCategory: (category: RecentProjectCategory, parentCategoryId?: string) => ipcRenderer.send(RecentProjectsEvent.ADD_CATEGORY, category, parentCategoryId),
	renameCategory: (categoryId: string, newName: string) => ipcRenderer.send(RecentProjectsEvent.RENAME_CATEGORY, categoryId, newName),
	moveCategory: (categoryId: string, newParentCategoryId?: string) => ipcRenderer.send(RecentProjectsEvent.MOVE_CATEGORY, categoryId, newParentCategoryId),
	removeCategory: (categoryId: string) => ipcRenderer.send(RecentProjectsEvent.REMOVE_CATEGORY, categoryId)
};
