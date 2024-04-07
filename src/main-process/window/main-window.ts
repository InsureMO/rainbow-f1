import {BrowserWindow} from 'electron';
import path from 'path';
import {F1Project} from '../../shared';
import {Envs} from '../envs';
import {createMainWindowMenu} from '../menu';
import {createProjectSelectWindow} from './project-select-window';
import {WindowManager} from './window-manager';

export interface MainWindowOptions {
	showImmediate: boolean;
	project: F1Project;
}

export const createMainWindow = (options: MainWindowOptions): BrowserWindow => {
	const {showImmediate, project} = options;

	// create the main window.
	const window = new BrowserWindow({
		show: false, icon: 'asserts/logo.png',
		minWidth: 1024, minHeight: 768,
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	WindowManager.registerMainWindow(window, project);

	// switch menu
	window.on('focus', () => {
		createMainWindowMenu({quit: () => window.close()});
	});
	window.once('close', () => {
		if (WindowManager.projects().length === 1) {
			// last opened main window will close, call project window
			const window = createProjectSelectWindow({showImmediate: true});
			window.show();
		}
	});

	// and load the index.html of the app
	if (Envs.dev) {
		// noinspection JSIgnoredPromiseFromCall
		window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/main.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/main.html`));
	}

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
