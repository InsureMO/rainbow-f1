import {BrowserWindow, Menu} from 'electron';
import path from 'path';
import {createMainWindow} from './main-window';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

export const createSplashWindow = () => {
	const mainWindow = createMainWindow(false);
	const splashWindow = new BrowserWindow({
		width: 640,
		height: 480,
		frame: false,
		transparent: true,
		alwaysOnTop: true,
		resizable: false,
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});

	// and load the splash.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		// noinspection JSIgnoredPromiseFromCall
		splashWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/splash.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		splashWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/splash.html`));
	}

	const menuTemplate: Array<MenuItemConstructorOptions> = [];
	const appMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(appMenu);
	splashWindow.center();
	setTimeout(() => {
		splashWindow.close();
		mainWindow.maximize();
		mainWindow.show();
	}, 5000);
};
