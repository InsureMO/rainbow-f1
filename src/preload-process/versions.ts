import {ipcRenderer} from 'electron';
import {VersionsEvent} from '../shared/types';

export const Versions: WindowElectronVersions = {
	chrome: process.versions.chrome,
	node: process.versions.node,
	electron: process.versions.electron,
	v8: process.versions.v8,
	app: () => ipcRenderer.sendSync(VersionsEvent.APP)
};
