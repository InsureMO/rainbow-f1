import {ipcRenderer} from 'electron';
import {ProjectCliEvent, ProjectCliSet} from '../shared';

export const ProjectCliBridge: WindowElectronProjectCli = {
	commands: async (commandLines?: ProjectCliSet): Promise<ProjectCliSet> => {
		return await ipcRenderer.invoke(ProjectCliEvent.COMMANDS, commandLines);
	},
	version: async (key: keyof ProjectCliSet, path: string): Promise<string | undefined> => {
		return await ipcRenderer.invoke(ProjectCliEvent.VERSION, key, path);
	}
};
