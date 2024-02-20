import {ipcRenderer} from 'electron';
import {CommandLines, CommandLinesEvent} from '../shared/types';

export const CommandLinesHandlers: WindowElectronCommandLines = {
	commands: (commandLines?: CommandLines): CommandLines => ipcRenderer.sendSync(CommandLinesEvent.COMMANDS, commandLines),
	version: (key: keyof CommandLines, path: string): string | undefined => ipcRenderer.sendSync(CommandLinesEvent.VERSION, key, path)
};
