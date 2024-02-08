import {ipcRenderer} from 'electron';
import {F1ProjectSettings} from '../shared/project-settings';
import {F1Project, F1ProjectEvent} from '../shared/types';

export const F1ProjectHandlers: WindowElectronF1Project = {
	create(options: F1ProjectSettings): { success: boolean; project: F1Project; message?: string } {
		return ipcRenderer.sendSync(F1ProjectEvent.CREATE, options);
	}
};