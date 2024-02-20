import {store} from './events';
import {createMainWindow} from './main-window';
import {createProjectWindow} from './project-window';

export const createFirstWindow = (showImmediate: boolean) => {
	if (store.hasLastProject()) {
		return createMainWindow(showImmediate);
	} else {
		return createProjectWindow({showImmediate});
	}
};
