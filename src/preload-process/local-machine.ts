import {ipcRenderer} from 'electron';
import {LocalMachineEvent, LocalMachineVersions} from '../shared/types';

export const LocalMachineHandlers: WindowElectronLocalMachine = {
	versions: (): LocalMachineVersions => {
		return ipcRenderer.sendSync(LocalMachineEvent.VERSIONS);
	}
};
