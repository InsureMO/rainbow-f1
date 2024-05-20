import {ipcRenderer} from 'electron';
import {ElectronBridges, PathEvent} from '../shared';

export const PathBridge: ElectronBridges.WindowElectronPath = {
	basename: (path: string, suffix?: string): string => {
		return ipcRenderer.sendSync(PathEvent.BASENAME, path, suffix);
	},
	resolve: (...path: Array<string>): string => {
		return ipcRenderer.sendSync(PathEvent.RESOLVE, ...path);
	}
};
