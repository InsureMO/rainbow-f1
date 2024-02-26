import {ipcRenderer} from 'electron';
import {F1Project, F1ProjectCreated, F1ProjectEvent, F1ProjectLoaded, F1ProjectSettings} from '../shared';

export const F1ProjectHandlers: WindowElectronF1Project = {
	create: async (settings: F1ProjectSettings): Promise<F1ProjectCreated> => await ipcRenderer.invoke(F1ProjectEvent.CREATE, settings),
	open: (project: F1Project) => ipcRenderer.send(F1ProjectEvent.OPEN, project),
	tryToOpen: async (directory: string) => await ipcRenderer.invoke(F1ProjectEvent.TRY_TO_OPEN, directory),
	closeOnFailedOpen: () => ipcRenderer.send(F1ProjectEvent.CLOSE_ON_FAILED_OPEN),
	ask: async (): Promise<F1ProjectLoaded> => await ipcRenderer.invoke(F1ProjectEvent.ASK),
	opened: (project: F1Project) => ipcRenderer.send(F1ProjectEvent.OPENED, project)
};
