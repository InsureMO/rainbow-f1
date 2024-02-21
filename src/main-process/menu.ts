import {app, BrowserWindow, ipcMain, Menu, nativeTheme} from 'electron';
import {Theme, ThemeSource} from '../shared';
import {openAboutWindow} from './about-window';
import {theme as ThemeHelper} from './handlers';
import {createProjectWindow} from './project-window';
import {isMac} from './utils';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

const mac = isMac();

const createRecentProjectsMenu = () => {
	return {
		label: 'Recent Projects...', click: () => {
			createProjectWindow({showImmediate: true, parent: BrowserWindow.getFocusedWindow()});
		}
	};
};
const createThemeChangeMenuHandler = (source: ThemeSource) => {
	return () => {
		nativeTheme.themeSource = source;
		ThemeHelper.setTheme(source);
		ipcMain.emit(Theme.EVENT_NAME, source);
	};
};

export const createQuitMenuItem = (check: boolean) => {
	return {
		label: 'Quit @Rainbow-F1', accelerator: 'CmdOrCtrl+Q',
		click: () => {
			// TODO CHECK IF THERE IS ANY UNSAVED WORK
			app.quit();
		}
	};
};

export const createDevQuitMenu = (should: boolean) => {
	if (should) {
		return [{
			label: app.getName(),
			submenu: [
				createQuitMenuItem(false)
			]
		}];
	} else {
		return [];
	}
};

export const createEditMenu = (should: boolean) => {
	if (should) {
		return [{label: 'Edit', role: 'editMenu'} as MenuItemConstructorOptions];
	} else {
		return [];
	}
};

export const createWindowMenu = (should: boolean) => {
	if (should) {
		const theme = ThemeHelper.getTheme();

		return [{
			label: 'Window',
			submenu: [
				{
					label: 'Appearance', submenu: [
						{
							label: 'Light', type: 'radio', checked: theme === Theme.LIGHT,
							click: createThemeChangeMenuHandler(Theme.LIGHT)
						} as MenuItemConstructorOptions,
						{
							label: 'Dark', type: 'radio', checked: theme === Theme.DARK,
							click: createThemeChangeMenuHandler(Theme.DARK)
						} as MenuItemConstructorOptions,
						{
							label: 'Auto-follow system', type: 'radio', checked: theme === Theme.SYSTEM,
							click: createThemeChangeMenuHandler(Theme.SYSTEM)
						} as MenuItemConstructorOptions
					]
				}
			]
		}];
	} else {
		return [];
	}
};

export const createDevMenu = (should: boolean) => {
	if (should) {
		return [{
			label: 'Developers',
			submenu: [
				{label: 'Zoom In', role: 'zoomIn'} as MenuItemConstructorOptions,
				{label: 'Zoom Out', role: 'zoomOut'} as MenuItemConstructorOptions,
				{label: 'Zoom Reset', role: 'resetZoom'} as MenuItemConstructorOptions,
				{type: 'separator'} as MenuItemConstructorOptions,
				{label: 'Reload', role: 'reload'} as MenuItemConstructorOptions,
				{label: 'Force Reload', role: 'forceReload'} as MenuItemConstructorOptions,
				{type: 'separator'} as MenuItemConstructorOptions,
				{label: 'Toggle Developer Tools', role: 'toggleDevTools'} as MenuItemConstructorOptions
			]
		}];
	} else {
		return [];
	}
};

export const createAppMenu = () => {
	let aboutWindow: BrowserWindow;
	const aboutMenuItem = {
		label: 'About @Rainbow-F1', click: () => {
			if (aboutWindow != null) {
				aboutWindow.center();
				aboutWindow.focus();
			} else {
				aboutWindow = openAboutWindow(BrowserWindow.getFocusedWindow());
				aboutWindow.on('closed', () => {
					aboutWindow = null;
				});
			}
		}
	};
	const checkForUpdatesMenuItem = {
		label: 'Check for Updates...', click: () => {
			// TODO CHECK FOR UPDATES
		}
	};

	const menuTemplate: Array<MenuItemConstructorOptions> = [
		mac ? {
			label: app.getName(),
			submenu: [
				aboutMenuItem,
				checkForUpdatesMenuItem,
				{type: 'separator'} as MenuItemConstructorOptions,
				createQuitMenuItem(true)
			]
		} : null,
		{
			label: 'File',
			submenu: [
				{label: 'New'},
				{label: 'Open...'},
				{type: 'separator'} as MenuItemConstructorOptions,
				createRecentProjectsMenu(),
				{type: 'separator'} as MenuItemConstructorOptions,
				{label: 'Close Project'},
				mac ? null : {type: 'separator'} as MenuItemConstructorOptions,
				mac ? null : createQuitMenuItem(true)
			].filter(menu => menu != null)
		},
		...createEditMenu(true),
		...createWindowMenu(true),
		...createDevMenu(true),
		{
			label: 'Help',
			submenu: [
				{label: 'Getting Started'},
				mac ? null : {type: 'separator'} as MenuItemConstructorOptions,
				mac ? null : checkForUpdatesMenuItem,
				mac ? null : aboutMenuItem
			].filter(menu => menu != null)
		}
	].filter(menu => menu != null);

	const appMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(appMenu);
};

export const createDockMenu = () => {
	const menuTemplate: Array<MenuItemConstructorOptions> = [];
	const dockMenu = Menu.buildFromTemplate(menuTemplate);
	app.dock.setMenu(dockMenu);
};
