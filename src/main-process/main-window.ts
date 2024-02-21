import {BrowserWindow} from 'electron';
import path from 'path';
import {F1ProjectSettings} from '../shared';
import {createAppMenu, createDockMenu} from './menu';
import {isDev} from './utils';
import WindowManager from './window-manager';

export const createMainWindow = (project: F1ProjectSettings, showImmediate: boolean): BrowserWindow => {
	// Create the browser window.
	const window = new BrowserWindow({
		show: false,
		icon: 'asserts/logo.png',
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	WindowManager.registerMain(window, project);

	// and load the index.html of the app
	if (isDev()) {
		// noinspection JSIgnoredPromiseFromCall
		window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
	}
	window.on('focus', () => {
		createAppMenu();
		createDockMenu();
	});

	if (showImmediate) {
		// Open the DevTools.
		// mainWindow.webContents.openDevTools();
		window.once('ready-to-show', () => {
			window.maximize();
			window.show();
		});
	}
	return window;
};
