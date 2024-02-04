import {app, BrowserWindow} from 'electron';
import path from 'path';
import {createAppMenu, createDockMenu} from './main-process/menu';
import './main-process/context-menu';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createSplashWindow = () => {
	const mainWindow = createMainWindow(false);
	const splashWindow = new BrowserWindow({
		width: 640,
		height: 480,
		frame: false,
		transparent: true,
		alwaysOnTop: true,
		resizable: false
	});

	// and load the splash.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		// noinspection JSIgnoredPromiseFromCall
		splashWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/splash.html`);
	} else {
		// noinspection JSIgnoredPromiseFromCall
		splashWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/splash.html`));
	}

	splashWindow.center();
	setTimeout(() => {
		splashWindow.close();
		mainWindow.maximize();
		mainWindow.show();
	}, 5000);
};

const createMainWindow = (showImmediate: boolean): BrowserWindow => {
	createAppMenu();
	createDockMenu();

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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createSplashWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		// do not show splash window when activate again
		createMainWindow(true);
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
