import {BrowserWindow, Menu} from 'electron';
import path from 'path';
import {Envs} from '../envs';
import {createFirstWindow} from './first-window';
import {WindowManager, WindowType} from './window-manager';

const createSplashWindowMenu = () => {
	// no menu for splash window
	const menuTemplate: Array<Electron.MenuItemConstructorOptions> = [];
	const appMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(appMenu);
};

export const createSplashWindow = () => {
	const firstWindows = createFirstWindow({showImmediate: false});
	const window = new BrowserWindow({
		width: 640, height: 480,
		frame: false, transparent: true, alwaysOnTop: true, resizable: false,
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	WindowManager.registerWindow(window, WindowType.SPLASH);

	// and load the splash.html of the app.
	if (Envs.dev) {
		// noinspection JSIgnoredPromiseFromCall
		window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/splash.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/splash.html`));
	}

	createSplashWindowMenu();
	window.center();
	setTimeout(() => {
		window.close();
		firstWindows.forEach(([, show]) => show());
	}, 5000);
};
