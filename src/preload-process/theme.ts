import {ipcRenderer} from 'electron';
import {ThemeEvent, ThemeSource} from '../shared';

export const ThemeBridge: WindowElectronTheme = {
	get: (): ThemeSource => ipcRenderer.sendSync(ThemeEvent.GET)
};
