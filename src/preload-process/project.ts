import {ipcRenderer} from 'electron';
import {
	ElectronBridges,
	F1Project,
	F1ProjectCreated,
	F1ProjectEvent,
	F1ProjectExisted,
	F1ProjectLoaded,
	F1ProjectSettings
} from '../shared';

export const ProjectBridge: ElectronBridges.WindowElectronProject = {
	create: async (settings: F1ProjectSettings): Promise<F1ProjectCreated> => {
		return await ipcRenderer.invoke(F1ProjectEvent.CREATE, settings);
	},
	open: (project: F1Project): void => {
		ipcRenderer.send(F1ProjectEvent.OPEN, project);
	},
	tryToOpen: async (directory: string): Promise<F1ProjectExisted> => {
		return await ipcRenderer.invoke(F1ProjectEvent.TRY_TO_OPEN, directory);
	},
	closeOnFailedOpen: (): void => {
		ipcRenderer.send(F1ProjectEvent.CLOSE_ON_FAILED_OPEN);
	},
	loadAttached: async (): Promise<F1ProjectLoaded> => {
		return await ipcRenderer.invoke(F1ProjectEvent.LOAD_ATTACHED);
	},
	opened: (project: F1Project): void => {
		ipcRenderer.send(F1ProjectEvent.ON_OPENED, project);
	}
};
