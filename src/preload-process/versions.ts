import {ipcRenderer} from 'electron';
import {ApplicationEvent} from '../shared';

export const VersionsBridge: WindowElectronVersions = {
	chrome: process.versions.chrome,
	node: process.versions.node,
	electron: process.versions.electron,
	v8: process.versions.v8,
	app: () => ipcRenderer.sendSync(ApplicationEvent.GET_VERSION)
};
