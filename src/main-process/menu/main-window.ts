import {Menu} from 'electron';
import {Envs} from '../envs';
import {createDevMenu} from './top/dev';
import {createMainWindowDockMenu} from './top/dock';
import {createEditMenu} from './top/edit';
import {createMainWindowFileMenu} from './top/file';
import {createHelpMenu} from './top/help';
import {createMainWindowMacLeadMenu} from './top/mac-lead';
import {createWindowMenu} from './top/window';
import {QuitAction} from './types';

export interface MainWindowMenuOptions {
	quit: QuitAction;
}

export const createMainWindowMenu = (options: MainWindowMenuOptions) => {
	const {quit} = options;

	const menuTemplate: Array<Electron.MenuItemConstructorOptions> = [
		Envs.mac ? createMainWindowMacLeadMenu({quit}) : null,
		createMainWindowFileMenu({quit}),
		createEditMenu(),
		createWindowMenu(),
		createDevMenu(),
		createHelpMenu()
	].filter(menu => menu != null);

	const appMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(appMenu);

	createMainWindowDockMenu();
};