import {BrowserWindow, Menu} from 'electron';
import path from 'path';
import {Envs} from '../envs';
import {WindowManager, WindowType} from './window-manager';

/** no menu for about window */
const createAboutWindowMenu = (window: BrowserWindow) => {
	// switch menu
	window.on('focus', () => {
		const menuTemplate: Array<Electron.MenuItemConstructorOptions> = [];
		const appMenu = Menu.buildFromTemplate(menuTemplate);
		Menu.setApplicationMenu(appMenu);
	});
};

export interface AboutWindowOptions {
	parent?: BrowserWindow;
}

export const openAboutWindow = (_options: AboutWindowOptions) => {
	const window = new BrowserWindow({
		width: 640, height: 480,
		frame: true, resizable: false,
		modal: true, minimizable: false, maximizable: false, center: true,
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	WindowManager.registerWindow(window, WindowType.ABOUT);

	// menu
	createAboutWindowMenu(window);

	// and load about.html of the app.
	if (Envs.dev) {
		// noinspection JSIgnoredPromiseFromCall
		window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/about.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/about.html`));
	}

	return window;
};