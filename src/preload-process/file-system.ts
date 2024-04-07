import {ipcRenderer} from 'electron';
import {FileSystemEvent} from '../shared';

export const FileSystemBridge: WindowElectronFileSystem = {
	exists: (path: string) => ipcRenderer.sendSync(FileSystemEvent.EXISTS, path),
	empty: (directory: string) => ipcRenderer.sendSync(FileSystemEvent.EMPTY, directory),
	mkdir: (directory: string) => ipcRenderer.sendSync(FileSystemEvent.MKDIR, directory),
	createFile: (path: string, content: string) => ipcRenderer.sendSync(FileSystemEvent.CREATE_FILE, path, content)
};
