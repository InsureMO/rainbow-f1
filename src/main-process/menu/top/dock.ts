import {app, Menu} from 'electron';

/**
 * create dock menu
 */
export const createMainWindowDockMenu = () => {
	const menuTemplate: Array<Electron.MenuItemConstructorOptions> = [];
	const dockMenu = Menu.buildFromTemplate(menuTemplate);
	app.dock.setMenu(dockMenu);
};

/**
 * clear dock menu
 */
export const clearDockMenu = () => {
	const menuTemplate: Array<Electron.MenuItemConstructorOptions> = [];
	const dockMenu = Menu.buildFromTemplate(menuTemplate);
	app.dock.setMenu(dockMenu);
};
