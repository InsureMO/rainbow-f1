import {BrowserWindow} from 'electron';
import {RecentProjectsWorker} from '../worker';
import {createMainWindow} from './main-window';
import {createProjectSelectWindow} from './project-select-window';

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

	const lastProjects = RecentProjectsWorker.getLastProjects();
	if (lastProjects.length !== 0) {
		return lastProjects.map(project => {
			const window = createMainWindow({project, showImmediate});
			return [window, () => {
				window.maximize();
				window.show();
			}];
		});
	} else {
		const window = createProjectSelectWindow({showImmediate});
		return [[window, () => window.show()]];
	}
};
