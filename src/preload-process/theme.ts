import {ipcRenderer} from 'electron';
import {ThemeEvent, ThemeSource} from '../shared/types';

export const ThemeHandlers: WindowElectronTheme = {
	get: (): ThemeSource => ipcRenderer.sendSync(ThemeEvent.GET)
};
