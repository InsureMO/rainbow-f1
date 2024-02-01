import Store from 'electron-store';
import {Theme} from '../shared/constants';

const store = new Store();

class ApplicationStore {
	public getTheme(): Exclude<Theme, Theme.EVENT_NAME> {
		return store.get('theme', Theme.SYSTEM) as Exclude<Theme, Theme.EVENT_NAME>;
	}

	public setTheme(theme: Exclude<Theme, Theme.EVENT_NAME>): void {
		store.set('theme', theme);
	}
}

export default new ApplicationStore();
