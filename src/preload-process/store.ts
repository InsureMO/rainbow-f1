import {ipcRenderer} from 'electron';
import {StoreEvent} from '../shared/types';

export const StoreHandlers: WindowElectronStore = {
	get: (key: string): any => ipcRenderer.sendSync(StoreEvent.GET, key),
	set: (key: string, value: any) => ipcRenderer.send(StoreEvent.SET, key, value)
};
