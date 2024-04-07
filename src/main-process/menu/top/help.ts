import {Envs} from '../../envs';
import {createAboutMenu, createCheckUpdateMenu} from '../fragment';

export const createHelpMenu = (): Electron.MenuItemConstructorOptions => {
	return {
		label: 'Help',
		submenu: [
			{label: 'Getting Started'},
			Envs.mac ? null : {type: 'separator'} as Electron.MenuItemConstructorOptions,
			Envs.mac ? null : createCheckUpdateMenu(),
			Envs.mac ? null : createAboutMenu()
		].filter(menu => menu != null)
	};
};
