import {ipcRenderer} from 'electron';
import {StoreEvent} from '../shared/types';

export const StoreHandlers: WindowElectronStore = {
	get: (key: string): any => ipcRenderer.sendSync(StoreEvent.GET_FROM_STORE, key),
	set: (key: string, value: any) => ipcRenderer.send(StoreEvent.SET_TO_STORE, key, value)
};
