import {ipcRenderer} from 'electron';
import {ElectronBridges, FileSystemBooleanResult, FileSystemEvent} from '../shared';

export const FileSystemBridge: ElectronBridges.WindowElectronFileSystem = {
	exists: (path: string): FileSystemBooleanResult => {
		return ipcRenderer.sendSync(FileSystemEvent.EXISTS, path);
	},
	empty: (directory: string): FileSystemBooleanResult => {
		return ipcRenderer.sendSync(FileSystemEvent.EMPTY, directory);
	},
	mkdir: (directory: string): FileSystemBooleanResult => {
		return ipcRenderer.sendSync(FileSystemEvent.MKDIR, directory);
	},
	createFile: (path: string, content: string): FileSystemBooleanResult => {
		return ipcRenderer.sendSync(FileSystemEvent.CREATE_FILE, path, content);
	}
};
