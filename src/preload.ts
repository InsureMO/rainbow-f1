// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from 'electron';
import {Store as StoreEvent, ThemeSource} from './shared/constants';

contextBridge.exposeInMainWorld('electron', {
	store: {
		get: (key: string): any => ipcRenderer.sendSync(StoreEvent.GET_EVENT_NAME, key),
		set: (key: string, value: any) => ipcRenderer.send(StoreEvent.SET_EVENT_NAME, key, value),
		getTheme: (): ThemeSource => ipcRenderer.sendSync(StoreEvent.GET_THEME)
	}
} as WindowElectronHandler);
