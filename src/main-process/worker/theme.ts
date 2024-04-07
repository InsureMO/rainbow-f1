import {ipcMain, nativeTheme} from 'electron';
import {Theme, ThemeEvent, ThemeSource} from '../../shared';
import {StoreKey, StoreWorker} from './store';

class ThemeWorker {
	constructor() {
		nativeTheme.themeSource = this.getTheme();
	}

	public getTheme(): ThemeSource {
		return StoreWorker.get<ThemeSource>(StoreKey.THEME, Theme.SYSTEM);
	}

	public setTheme(theme: ThemeSource): void {
		StoreWorker.set(StoreKey.THEME, theme);
	}
}

const INSTANCE = (() => {
	const worker = new ThemeWorker();
	ipcMain.on(ThemeEvent.GET, (event: Electron.IpcMainEvent): void => {
		event.returnValue = worker.getTheme();
	});
	return worker;
})();
export {INSTANCE as ThemeWorker};
