import {Menu} from 'electron';
import {Envs} from '../envs';
import {createDevMenu} from './top/dev';
import {clearDockMenu} from './top/dock';
import {createEditMenu} from './top/edit';
import {createFileMenuForNonMacQuitOnly} from './top/file';
import {createMacLeadMenuForQuitOnly} from './top/mac-lead';
import {createWindowMenu} from './top/window';
import {QuitAction} from './types';

export interface ProjectWindowMenuOptions {
	quit: QuitAction;
}

export const createProjectWindowMenu = (options: ProjectWindowMenuOptions) => {
	const {quit} = options;

	const menuTemplate: Array<Electron.MenuItemConstructorOptions> = [
		Envs.mac ? createMacLeadMenuForQuitOnly({quit}) : createFileMenuForNonMacQuitOnly({quit}),
		createEditMenu(),
		createWindowMenu(),
		createDevMenu()
	];

	const appMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(appMenu);

	clearDockMenu();
};