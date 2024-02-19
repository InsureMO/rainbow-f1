import {ipcRenderer} from 'electron';
import {CommandLines, CommandLinesEvent} from '../shared/types';

export const CommandLinesHandlers: WindowElectronCommandLines = {
	commands: (commandLines?: CommandLines): CommandLines => ipcRenderer.sendSync(CommandLinesEvent.COMMANDS, commandLines)
};
