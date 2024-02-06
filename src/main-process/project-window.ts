import {BrowserWindow, Menu} from 'electron';
import path from 'path';
import {createDevMenu} from './menu';
import {isDev} from './utils';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

export const createProjectWindow = (options: {
	showImmediate: boolean;
	parent?: BrowserWindow;
}) => {
	const {showImmediate} = options;

	const window = new BrowserWindow({
		width: 1024,
		height: 768,
		frame: true,
		modal: true,
		resizable: false,
		minimizable: false,
		maximizable: false,
		center: true,
		// parent,
		show: false,
		alwaysOnTop: true,
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	// and load the splash.html of the app.
	if (isDev()) {
		// noinspection JSIgnoredPromiseFromCall
		window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/project.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/project.html`));
	}

	const menuTemplate: Array<MenuItemConstructorOptions> = createDevMenu(isDev());
	const appMenu = Menu.buildFromTemplate(menuTemplate);

	window.on('focus', () => {
		Menu.setApplicationMenu(appMenu);
	});

	if (showImmediate) {
		// Open the DevTools.
		// mainWindow.webContents.openDevTools();
		window.once('ready-to-show', () => {
			window.show();
		});
	}

	return window;
};
