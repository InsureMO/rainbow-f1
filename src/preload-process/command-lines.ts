import {ipcRenderer} from 'electron';
import {CommandLines, CommandLinesEvent} from '../shared/types';

export const CommandLinesHandlers: WindowElectronCommandLines = {
	commands: (commandLines?: CommandLines): Promise<CommandLines> => ipcRenderer.invoke(CommandLinesEvent.COMMANDS, commandLines),
	version: (key: keyof CommandLines, path: string): Promise<string | undefined> => ipcRenderer.invoke(CommandLinesEvent.VERSION, key, path)
};
