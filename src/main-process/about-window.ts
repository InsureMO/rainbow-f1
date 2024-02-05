import {BrowserWindow} from 'electron';
import path from 'path';

export const openAboutWindow = (parent: BrowserWindow) => {
	const window = new BrowserWindow({
		width: 640,
		height: 480,
		frame: true,
		alwaysOnTop: true,
		resizable: false,
		modal: true,
		minimizable: false,
		maximizable: false,
		center: true,
		// parent,
		webPreferences: {preload: path.join(__dirname, 'preload.js')}
	});
	// and load the splash.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		// noinspection JSIgnoredPromiseFromCall
		window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/about.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/about.html`));
	}

	return window;
};