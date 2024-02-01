import {Theme} from './shared/constants';

declare global {
	interface WindowElectronStore {
		get: (key: string) => any;
		set: (key: string, value: any) => void;
		getTheme: () => Exclude<Theme, Theme.EVENT_NAME>;
	}

	interface WindowElectronHandler {
		store: WindowElectronStore;
	}

	interface Window {
		electron: WindowElectronHandler;
	}
}
