import {BrowserWindow} from 'electron';
import {createProjectWindow} from '../../window';

export const createRecentProjectsMenu = (): Electron.MenuItemConstructorOptions => {
	return {
		label: 'Recent Projects...',
		click: () => createProjectWindow({showImmediate: true, parent: BrowserWindow.getFocusedWindow()})
	};
};
