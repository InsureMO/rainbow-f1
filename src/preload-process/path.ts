import {ipcRenderer} from 'electron';
import {PathEvent} from '../shared';

export const PathHandlers: WindowElectronPath = {
	basename: (path: string, suffix?: string) => ipcRenderer.sendSync(PathEvent.BASENAME, path, suffix)
};
