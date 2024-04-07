import {ipcRenderer} from 'electron';
import {ElectronBridges, StoreEvent} from '../shared';

export const StoreBridge: ElectronBridges.WindowElectronStore = {
	get: (key: string): any => {
		return ipcRenderer.sendSync(StoreEvent.GET, key);
	},
	set: (key: string, value: any): void => {
		ipcRenderer.send(StoreEvent.SET, key, value);
	}
};
