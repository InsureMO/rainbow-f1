import {ipcRenderer} from 'electron';
import {StoreEvent} from '../shared';

export const StoreBridge: WindowElectronStore = {
	get: (key: string): any => ipcRenderer.sendSync(StoreEvent.GET, key),
	set: (key: string, value: any) => ipcRenderer.send(StoreEvent.SET, key, value)
};
