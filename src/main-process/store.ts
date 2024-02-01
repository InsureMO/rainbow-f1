import {ipcMain} from 'electron';
import Store from 'electron-store';
import {Store as StoreEvent, Theme, ThemeSource} from '../shared/constants';

const store = new Store();

class ApplicationStore {
	constructor() {
		ipcMain.on(StoreEvent.SET_EVENT_NAME, (_, key: string, value: any) => store.set(key, value));
		ipcMain.on(StoreEvent.GET_EVENT_NAME, (event, key: string) => event.returnValue = store.get(key));
		ipcMain.on(StoreEvent.GET_THEME, (event) => event.returnValue = this.getTheme());
	}

	public getTheme(): ThemeSource {
		return store.get(StoreEvent.GET_THEME, Theme.SYSTEM) as ThemeSource;
	}

	public setTheme(theme: ThemeSource): void {
		store.set(StoreEvent.GET_THEME, theme);
	}
}

export default new ApplicationStore();
