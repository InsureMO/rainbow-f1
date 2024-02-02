// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from 'electron';
import {
	RecentProject,
	RecentProjectCategory,
	RecentProjectRoot,
	StoreEvent as StoreEvent,
	ThemeSource
} from './shared/constants';

contextBridge.exposeInMainWorld('electron', {
	store: {
		get: (key: string): any => ipcRenderer.sendSync(StoreEvent.GET_FROM_STORE, key),
		set: (key: string, value: any) => ipcRenderer.send(StoreEvent.SET_TO_STORE, key, value)
	},
	getTheme: (): ThemeSource => ipcRenderer.sendSync(StoreEvent.GET_THEME),
	getRecentProjects: (): RecentProjectRoot => ipcRenderer.sendSync(StoreEvent.GET_RECENT_PROJECTS),
	addRecentProject: (project: RecentProject, categoryId?: string) => ipcRenderer.send(StoreEvent.ADD_RECENT_PROJECT, project, categoryId),
	removeRecentProject: (projectId: string) => ipcRenderer.send(StoreEvent.REMOVE_RECENT_PROJECT, projectId),
	clearRecentProjects: () => ipcRenderer.send(StoreEvent.CLEAR_RECENT_PROJECTS),
	addRecentCategory: (category: RecentProjectCategory, parentCategoryId?: string) => ipcRenderer.send(StoreEvent.ADD_RECENT_PROJECT_CATEGORY, category),
	removeRecentCategory: (categoryId: string) => ipcRenderer.send(StoreEvent.REMOVE_RECENT_PROJECT_CATEGORY, categoryId)
} as WindowElectronHandler);
