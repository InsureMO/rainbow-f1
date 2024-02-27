import {BrowserWindow, Menu} from 'electron';
import path from 'path';
import {createDevMenu, createDevQuitMenu, createEditMenu, createWindowMenu} from './menu';
import {isDev} from './utils';
import WindowManager, {WindowType} from './window-manager';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

export const createProjectWindow = (options: {
	showImmediate: boolean;
	parent?: BrowserWindow;
}) => {
	const {showImmediate} = options;

	const dev = isDev();
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
		// alwaysOnTop: !dev,
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	WindowManager.register(window, WindowType.PROJECT);

	// and load project.html of the app.
	if (dev) {
		// noinspection JSIgnoredPromiseFromCall
		window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/project.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/project.html`));
	}

	window.on('focus', () => {
		const menuTemplate: Array<MenuItemConstructorOptions> = [
			...createDevQuitMenu({should: true}),
			...createEditMenu(dev), ...createWindowMenu(dev), ...createDevMenu(dev)
		];
		Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
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
