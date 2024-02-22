import {ipcRenderer} from 'electron';
import {F1Project, F1ProjectCreated, F1ProjectEvent, F1ProjectLoaded, F1ProjectSettings} from '../shared';

export const F1ProjectHandlers: WindowElectronF1Project = {
	create: async (settings: F1ProjectSettings): Promise<F1ProjectCreated> => await ipcRenderer.invoke(F1ProjectEvent.CREATE, settings),
	open: (settings: F1ProjectSettings) => ipcRenderer.send(F1ProjectEvent.OPEN, settings),
	tryToOpen: async (directory: string) => await ipcRenderer.invoke(F1ProjectEvent.TRY_TO_OPEN, directory),
	ask: async (): Promise<F1ProjectLoaded> => await ipcRenderer.invoke(F1ProjectEvent.ASK),
	opened: (project: F1Project) => ipcRenderer.send(F1ProjectEvent.OPENED, project)
};
