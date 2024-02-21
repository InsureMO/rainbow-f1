import {ipcRenderer} from 'electron';
import {CommandLines, CommandLinesEvent} from '../shared';

export const CommandLinesHandlers: WindowElectronCommandLines = {
	commands: async (commandLines?: CommandLines): Promise<CommandLines> => await ipcRenderer.invoke(CommandLinesEvent.COMMANDS, commandLines),
	version: async (key: keyof CommandLines, path: string): Promise<string | undefined> => await ipcRenderer.invoke(CommandLinesEvent.VERSION, key, path)
};
