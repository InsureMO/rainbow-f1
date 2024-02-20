import {ipcRenderer} from 'electron';
import {F1ProjectSettings} from '../shared/project-settings';
import {F1Project, F1ProjectCreated, F1ProjectEvent} from '../shared/types';

export const F1ProjectHandlers: WindowElectronF1Project = {
	create: async (options: F1ProjectSettings): Promise<F1ProjectCreated> => {
		return ipcRenderer.invoke(F1ProjectEvent.CREATE, options);
	}
};