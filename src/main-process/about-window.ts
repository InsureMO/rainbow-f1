import {BrowserWindow, Menu} from 'electron';
import path from 'path';
import {isDev} from './utils';
import WindowManager, {WindowType} from './window-manager';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

export const openAboutWindow = (parent: BrowserWindow) => {
	const window = new BrowserWindow({
		width: 640,
		height: 480,
		frame: true,
		// alwaysOnTop: true,
		resizable: false,
		modal: true,
		minimizable: false,
		maximizable: false,
		center: true,
		// parent,
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	WindowManager.register(window, WindowType.ABOUT);

	// and load about.html of the app.
	if (isDev()) {
		// noinspection JSIgnoredPromiseFromCall
		window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/about.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/about.html`));
	}

	const menuTemplate: Array<MenuItemConstructorOptions> = [];
	const appMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(appMenu);

	return window;
};