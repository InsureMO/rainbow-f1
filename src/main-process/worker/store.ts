import {ipcMain} from 'electron';
import Store from 'electron-store';
import {StoreEvent} from '../../shared';

const store = new Store();

export enum StoreKey {
	THEME = 'theme',
	RECENT_PROJECTS = 'recent-projects',
	LAST_PROJECT = 'last-project'
}

class StoreWorker {
	public get<V>(key: |string, defaultValue?: V): V | undefined {
		return store.get(key, defaultValue) as V | undefined;
	}

	public set<V>(key: StoreKey | string, value?: V | null): void {
		if (value == null) {
			store.delete(key);
		} else {
			store.set(key, value);
		}
	}

	public delete(key: StoreKey | string): void {
		store.delete(key);
	}
}

const INSTANCE = (() => {
	const worker = new StoreWorker();
	ipcMain.on(StoreEvent.SET, (_: Electron.IpcMainEvent, key: string, value?: any): void => {
		worker.set(key, value);
	});
	ipcMain.on(StoreEvent.GET, (event: Electron.IpcMainEvent, key: string): void => {
		event.returnValue = worker.get(key);
	});
	return worker;
})();
export {INSTANCE as StoreWorker};