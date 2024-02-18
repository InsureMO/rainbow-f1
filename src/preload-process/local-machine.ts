import {ipcRenderer} from 'electron';
import {LocalMachineCommands, LocalMachineEvent, LocalMachineVersions} from '../shared/types';

export const LocalMachineHandlers: WindowElectronLocalMachine = {
	versions: (): LocalMachineVersions => ipcRenderer.sendSync(LocalMachineEvent.VERSIONS),
	commands: (): LocalMachineCommands => ipcRenderer.sendSync(LocalMachineEvent.COMMANDS)
};
