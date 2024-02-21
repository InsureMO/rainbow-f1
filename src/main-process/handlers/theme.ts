import {ipcMain, nativeTheme} from 'electron';
import {Theme, ThemeEvent, ThemeSource} from '../../shared';
import store, {StoreKey} from './store';

class ApplicationTheme {
	constructor() {
		nativeTheme.themeSource = this.getTheme();
		ipcMain.on(ThemeEvent.GET, (event) => event.returnValue = this.getTheme());
	}

	public getTheme(): ThemeSource {
		return store.get<ThemeSource>(StoreKey.THEME, Theme.SYSTEM);
	}

	public setTheme(theme: ThemeSource): void {
		store.set(StoreKey.THEME, theme);
	}
}

export default new ApplicationTheme();
