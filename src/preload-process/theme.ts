import {ipcRenderer} from 'electron';
import {ElectronBridges, ThemeEvent, ThemeSource} from '../shared';

export const ThemeBridge: ElectronBridges.WindowElectronTheme = {
	get: (): ThemeSource => {
		return ipcRenderer.sendSync(ThemeEvent.GET);
	}
};
