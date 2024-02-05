import {app, ipcMain, Menu, nativeTheme} from 'electron';
import {Theme, ThemeSource} from '../shared/types';
import store from './store';
import {isMac} from './utils';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

const mac = isMac();

const createRecentProjectsMenu = () => {
	return {label: 'Recent Projects'};
};
const createThemeChangeMenuHandler = (source: ThemeSource) => {
	return () => {
		nativeTheme.themeSource = source;
		ipcMain.emit(Theme.EVENT_NAME, source);
	};
};

export const createAppMenu = () => {
	const aboutMenuItem = {
		label: 'About @Rainbow-F1', click: () => {
			// TODO OPEN ABOUT WINDOW
		}
	};
	const checkForUpdatesMenuItem = {
		label: 'Check for Updates...', click: () => {
			// TODO CHECK FOR UPDATES
		}
	};
	const quitMenuItem = {
		label: 'Quit @Rainbow-F1', accelerator: 'CmdOrCtrl+Q',
		click: () => {
			// TODO CHECK IF THERE IS ANY UNSAVED WORK
			app.quit();
		}
	};
	const theme = store.getTheme();

	const menuTemplate: Array<MenuItemConstructorOptions> = [
		mac ? {
			label: app.getName(),
			submenu: [
				aboutMenuItem,
				checkForUpdatesMenuItem,
				{type: 'separator'} as MenuItemConstructorOptions,
				quitMenuItem
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
				mac ? null : quitMenuItem
			].filter(menu => menu != null)
		},
		{label: 'Edit', role: 'editMenu'} as MenuItemConstructorOptions,
		{
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
		},
		{
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
		},
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
	const menuTemplate = [
		createRecentProjectsMenu()
	];
	const dockMenu = Menu.buildFromTemplate(menuTemplate);
	app.dock.setMenu(dockMenu);
};
