import {BrowserWindow, Menu} from 'electron';
import path from 'path';
import {createFirstWindow} from './first-window';
import {isDev} from './utils';
import WindowManager, {WindowType} from './window-manager';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

export const createSplashWindow = () => {
	const firstWindows = createFirstWindow(false);
	const window = new BrowserWindow({
		width: 640,
		height: 480,
		frame: false,
		transparent: true,
		alwaysOnTop: true,
		resizable: false,
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	WindowManager.register(window, WindowType.SPLASH);

	// and load the splash.html of the app.
	if (isDev()) {
		// noinspection JSIgnoredPromiseFromCall
		window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/splash.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/splash.html`));
	}

	const menuTemplate: Array<MenuItemConstructorOptions> = [];
	const appMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(appMenu);
	window.center();
	setTimeout(() => {
		window.close();
		firstWindows.forEach(([, show]) => show());
	}, 5000);
};
