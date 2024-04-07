import {app, BrowserWindow} from 'electron';
import path from 'path';
import {Envs} from '../envs';
import {createProjectSelectWindowMenu} from '../menu';
import {WindowManager, WindowType} from './window-manager';

export interface ProjectWindowOptions {
	showImmediate: boolean;
	parent?: BrowserWindow;
}

/**
 * project window could be used when
 * 1. ide opened when no opened projects in last termination,
 * 2. create or open a new project, when some projects are opened
 */
export const createProjectSelectWindow = (options: ProjectWindowOptions) => {
	const {showImmediate} = options;

	const window = new BrowserWindow({
		width: 1024, height: 768,
		frame: true, modal: true,
		resizable: false, minimizable: false, maximizable: false,
		center: true, show: false,
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	WindowManager.registerWindow(window, WindowType.PROJECT);

	// menu
	window.on('focus', () => {
		createProjectSelectWindowMenu({quit: () => app.quit()});
	});

	// and load project.html of the app.
	if (Envs.dev) {
		// noinspection JSIgnoredPromiseFromCall
		window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/project-select.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/project-select.html`));
	}

	if (showImmediate) {
		// Open the DevTools.
		// mainWindow.webContents.openDevTools();
		window.once('ready-to-show', () => {
			window.show();
		});
	}

	return window;
};
