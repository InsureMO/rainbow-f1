import {ipcMain, nativeTheme} from 'electron';
import {Theme, ThemeSource} from '../../../shared';
import {theme as ThemeHelper} from '../../handlers';

const createThemeChangeMenuHandler = (source: ThemeSource) => {
	return () => {
		nativeTheme.themeSource = source;
		ThemeHelper.setTheme(source);
		ipcMain.emit(Theme.EVENT_NAME, source);
	};
};

export const createAppearanceMenu = (): Electron.MenuItemConstructorOptions => {
	const theme = ThemeHelper.getTheme();

	return {
		label: 'Appearance',
		submenu: [
			{
				label: 'Light', type: 'radio', checked: theme === Theme.LIGHT,
				click: createThemeChangeMenuHandler(Theme.LIGHT), accelerator: 'CmdOrCtrl+Shift+L'
			} as Electron.MenuItemConstructorOptions,
			{
				label: 'Dark', type: 'radio', checked: theme === Theme.DARK,
				click: createThemeChangeMenuHandler(Theme.DARK), accelerator: 'CmdOrCtrl+Shift+D'
			} as Electron.MenuItemConstructorOptions,
			{
				label: 'Auto-follow system', type: 'radio', checked: theme === Theme.SYSTEM,
				click: createThemeChangeMenuHandler(Theme.SYSTEM)
			} as Electron.MenuItemConstructorOptions
		]
	};
};

export const createWindowMenu = (): Electron.MenuItemConstructorOptions => {
	return {label: 'Window', submenu: [createAppearanceMenu()]};
};
