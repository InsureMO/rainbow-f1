import {BrowserWindow} from 'electron';
import {createProjectSelectWindow} from '../../window';

export const createRecentProjectsMenu = (): Electron.MenuItemConstructorOptions => {
	return {
		label: 'Recent Projects...',
		click: () => createProjectSelectWindow({showImmediate: true, parent: BrowserWindow.getFocusedWindow()})
	};
};
