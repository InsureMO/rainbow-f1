import {Envs} from '../../envs';
import {createQuitMenuItem, createRecentProjectsMenu} from '../fragment';
import {QuitAction} from '../types';

export interface FileMenuOptions {
	quit: QuitAction;
}

export const createFileMenuForNonMacQuitOnly = (options: FileMenuOptions): Electron.MenuItemConstructorOptions | undefined => {
	const {quit} = options;
	if (Envs.mac) {
		return {
			label: 'File',
			submenu: [createQuitMenuItem({action: quit, check: true})]
		};
	} else {
		return (void 0);
	}
};

export const createMainWindowFileMenu = (options: FileMenuOptions): Electron.MenuItemConstructorOptions => {
	const {quit} = options;

	return {
		label: 'File',
		submenu: [
			// TODO OPEN NEW PROJECT WINDOW
			{label: 'New'},
			// TODO OPEN OPEN PROJECT WINDOW
			{label: 'Open...'},
			{type: 'separator'} as Electron.MenuItemConstructorOptions,
			createRecentProjectsMenu(),
			{type: 'separator'} as Electron.MenuItemConstructorOptions,
			{label: 'Close Project'},
			Envs.mac ? null : {type: 'separator'} as Electron.MenuItemConstructorOptions,
			Envs.mac ? null : createQuitMenuItem({action: quit, check: true})
		].filter(menu => menu != null)
	};
};
