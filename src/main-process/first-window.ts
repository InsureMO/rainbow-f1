import {BrowserWindow} from 'electron';
import {recentProjects} from './handlers';
import {createMainWindow} from './main-window';
import {createProjectWindow} from './project-window';

export const createFirstWindow = (showImmediate: boolean): Array<[BrowserWindow, () => void]> => {
	const lastProjects = recentProjects.getLastProjects();
	if (lastProjects.length !== 0) {
		return lastProjects.map(project => {
			const window = createMainWindow(project, showImmediate);
			return [window, () => {
				window.maximize();
				window.show();
			}];
		});
	} else {
		const window = createProjectWindow({showImmediate});
		return [[window, () => window.show()]];
	}
};
