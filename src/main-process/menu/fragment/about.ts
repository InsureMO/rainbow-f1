import {BrowserWindow} from 'electron';
import {openAboutWindow} from '../../window';

export const createAboutMenu = (): Electron.MenuItemConstructorOptions => {
	let aboutWindow: BrowserWindow;
	return {
		label: 'About @Rainbow-F1',
		click: () => {
			if (aboutWindow != null) {
				aboutWindow.center();
				aboutWindow.focus();
			} else {
				aboutWindow = openAboutWindow({parent: BrowserWindow.getFocusedWindow()});
				aboutWindow.on('closed', () => {
					aboutWindow = null;
				});
			}
		}
	};
};
