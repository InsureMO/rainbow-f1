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
import IpcRendererEvent = Electron.IpcRendererEvent;

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

contextBridge.exposeInMainWorld('ipcRenderer', {
	on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
		ipcRenderer.on(channel, listener);
	},
	off: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
		ipcRenderer.off(channel, listener);
	},
	once: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
		ipcRenderer.once(channel, listener);
	},
	send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
	sendSync: (channel: string, ...args: any[]) => ipcRenderer.sendSync(channel, ...args)
});
