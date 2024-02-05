import {BrowserWindow} from 'electron';
import path from 'path';
import {createAppMenu, createDockMenu} from './menu';

export const createMainWindow = (showImmediate: boolean): BrowserWindow => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		show: false,
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	// mainWindow.maximize();

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		// noinspection JSIgnoredPromiseFromCall
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
	}
	mainWindow.on('focus', () => {
		createAppMenu();
		createDockMenu();
	});

	if (showImmediate) {
		// Open the DevTools.
		// mainWindow.webContents.openDevTools();
		mainWindow.once('ready-to-show', () => {
			mainWindow.maximize();
			mainWindow.show();
		});
	}
	return mainWindow;
};
