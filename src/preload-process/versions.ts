import {ipcRenderer} from 'electron';
import {ApplicationEvent, ElectronBridges} from '../shared';

export const VersionsBridge: ElectronBridges.WindowElectronVersions = {
	chrome: process.versions.chrome,
	node: process.versions.node,
	electron: process.versions.electron,
	v8: process.versions.v8,
	app: () => ipcRenderer.sendSync(ApplicationEvent.GET_VERSION)
};
