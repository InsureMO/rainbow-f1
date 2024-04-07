import {ipcRenderer} from 'electron';
import {PathEvent} from '../shared';

export const PathBridge: WindowElectronPath = {
	basename: (path: string, suffix?: string) => ipcRenderer.sendSync(PathEvent.BASENAME, path, suffix)
};
