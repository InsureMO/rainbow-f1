import {ipcRenderer} from 'electron';
import {StoreEvent, ThemeSource} from '../shared/types';

export const ThemeHandlers: WindowElectronTheme = {
	get: (): ThemeSource => ipcRenderer.sendSync(StoreEvent.GET_THEME)
};
