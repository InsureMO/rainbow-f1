import {BrowserWindow, Menu} from 'electron';
import path from 'path';
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
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	// and load the splash.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		// noinspection JSIgnoredPromiseFromCall
		window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/project.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/project.html`));
	}

	const menuTemplate: Array<MenuItemConstructorOptions> = [{
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
	}];
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
