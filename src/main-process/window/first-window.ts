import {BrowserWindow} from 'electron';
import {recentProjects} from '../handlers';
import {createMainWindow} from './main-window';
import {createProjectWindow} from './project-window';

export interface FirstWindowOptions {
	showImmediate: boolean;
}

export type OpenWindowFunction = () => void;

/**
 * create first window, could be
 * 1. set of main window when there are projects opened in last termination
 * 2. project window when there are no projects opened in last termination
 */
export const createFirstWindow = (options: FirstWindowOptions): Array<[BrowserWindow, OpenWindowFunction]> => {
	const {showImmediate} = options;

	const lastProjects = recentProjects.getLastProjects();
	if (lastProjects.length !== 0) {
		return lastProjects.map(project => {
			const window = createMainWindow({project, showImmediate});
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
