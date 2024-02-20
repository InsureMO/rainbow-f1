import {ipcMain} from 'electron';
import Store from 'electron-store';
import {StoreEvent, Theme, ThemeSource} from '../../shared/types';

const store = new Store();

export enum StoreKey {
	THEME = 'theme',
	RECENT_PROJECTS = 'recent-projects',
	LAST_PROJECT = 'last-project'
}

class ApplicationStore {
	constructor() {
		ipcMain.on(StoreEvent.SET_TO_STORE, (_, key: string, value: any) => store.set(key, value));
		ipcMain.on(StoreEvent.GET_FROM_STORE, (event, key: string) => event.returnValue = store.get(key));
	}

	public get<V>(key: StoreKey, defaultValue?: V): V | undefined {
		return store.get(key, defaultValue) as V | undefined;
	}

	public set<V>(key: StoreKey, value?: V | null): void {
		if (value == null) {
			store.delete(key);
		} else {
			store.set(key, value);
		}
	}

	public delete(key: StoreKey): void {
		store.delete(key);
	}

	public getTheme(): ThemeSource {
		return store.get(StoreKey.THEME, Theme.SYSTEM) as ThemeSource;
	}

	public setTheme(theme: ThemeSource): void {
		store.set(StoreKey.THEME, theme);
	}
}

export default new ApplicationStore();
