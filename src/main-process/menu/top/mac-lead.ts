import {app} from 'electron';
import {createAboutMenu, createCheckUpdateMenu, createQuitMenuItem} from '../fragment';
import {QuitAction} from '../types';

export interface MacLeadMenuOptions {
	quit: QuitAction;
}

export const createMacLeadMenuForQuitOnly = (options: MacLeadMenuOptions): Electron.MenuItemConstructorOptions => {
	const {quit} = options;
	return {
		label: app.getName(),
		submenu: [createQuitMenuItem({action: quit, check: false})]
	};
};

export const createMainWindowMacLeadMenu = (options: MacLeadMenuOptions): Electron.MenuItemConstructorOptions => {
	const {quit} = options;

	return {
		label: app.getName(),
		submenu: [
			createAboutMenu(),
			createCheckUpdateMenu(),
			{type: 'separator'} as Electron.MenuItemConstructorOptions,
			createQuitMenuItem({action: quit, check: true})
		]
	};
};
