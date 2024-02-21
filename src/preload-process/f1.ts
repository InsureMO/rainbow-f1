import {ipcRenderer} from 'electron';
import {F1ProjectCreated, F1ProjectEvent, F1ProjectSettings} from '../shared';

export const F1ProjectHandlers: WindowElectronF1Project = {
	create: async (settings: F1ProjectSettings): Promise<F1ProjectCreated> => {
		return ipcRenderer.invoke(F1ProjectEvent.CREATE, settings);
	},
	open: (settings: F1ProjectSettings) => {
		ipcRenderer.send(F1ProjectEvent.OPEN, settings);
	}
};