import {ipcMain} from 'electron';
import fs from 'fs';
import {
	FileSystemBooleanResult,
	FileSystemEvent,
	FileSystemFoldersResult,
	FileSystemOperationResult,
	MAC_INDEX_FILE
} from '../../shared';
import {Envs} from '../envs';
import {PathWorker} from './path';

interface ScannedFile {
	file: string;
	prefix?: string;
	dir: boolean;
}

class FileSystemWorker {
	/**
	 * check given path is valid or not
	 */
	protected isValid(path: string): boolean {
		return path != null && path.trim().length > 0;
	}

	/**
	 * check given path is valid or not, if not, return system result.
	 * otherwise return result of given `or` function.
	 */
	protected invalidOr<X, R extends FileSystemOperationResult<X>>(path: string, or: () => R): R {
		if (!this.isValid(path)) {
			return {success: true, message: 'Given path is not valid.'} as R;
		} else {
			return or();
		}
	}

	/**
	 * returns true when file or directory exists
	 */
	public exists(path: string): FileSystemBooleanResult {
		return {success: true, ret: this.isValid(path) && fs.existsSync(path)};
	}

	/**
	 * returns true when
	 * 1. not exists
	 * 2. or is directory and empty
	 */
	public empty(directory: string): FileSystemBooleanResult {
		if (!this.isValid(directory)) {
			return {success: true, ret: false};
		}
		if (!this.exists(directory).ret) {
			return {success: true, ret: true};
		}
		if (!fs.lstatSync(directory).isDirectory()) {
			return {success: true, ret: false};
		}
		const files = fs.readdirSync(directory) as Array<string>;
		if (files.length === 0) {
			return {success: true, ret: true};
		} else if (Envs.mac && files.length === 1 && files[0] === MAC_INDEX_FILE) {
			return {success: true, ret: true};
		} else {
			return {success: false, ret: false};
		}
	}

	public mkdir(directory: string): FileSystemBooleanResult {
		return this.invalidOr(directory, () => {
			if (fs.existsSync(directory) && fs.lstatSync(directory).isDirectory()) {
				return {success: true, ret: true};
			}
			try {
				fs.mkdirSync(directory, {recursive: true});
				return {success: true, ret: true};
			} catch (e) {
				return {success: true, ret: false, message: e.message};
			}
		});
	}

	protected scanDir(options: { directory: string; prefix?: string; recursive: boolean }): Array<ScannedFile> {
		const {directory, prefix, recursive} = options;

		let files: Array<ScannedFile> = (fs.readdirSync(directory, {recursive: false}) as Array<string>)
			.map(file => ({file, prefix, dir: fs.lstatSync(PathWorker.resolve(directory, file)).isDirectory()}))
			.filter(({file, dir}) => !dir || file !== 'node_modules');
		if (recursive) {
			files = files.map(file => {
				if (file.dir) {
					return [file, ...this.scanDir({
						directory: file.file,
						prefix: file.prefix == null ? file.file : PathWorker.resolve(file.prefix, file.file),
						recursive
					})];
				} else {
					return [file];
				}
			}).flat();
		}
		return files;
	}

	/**
	 * default including all files and directories, not recursive.
	 * please note if recursive is true, the result will include all descendant files not matter directory is included or not.
	 */
	public dir(directory: string, options?: {
		dir?: boolean, file?: boolean, recursive?: boolean
	}): FileSystemFoldersResult {
		return this.invalidOr(directory, () => {
			if (!fs.existsSync(directory) || fs.lstatSync(directory).isFile()) {
				return {success: true, ret: []};
			}
			if (!(options?.dir ?? true) && !(options?.file ?? true)) {
				// ask nothing, return directly
				return {success: true, ret: []};
			}
			const includeDirectory = options?.dir ?? true;
			const includeFile = options?.file ?? true;
			const recursive = options?.recursive ?? false;
			try {
				const files = this.scanDir({directory, recursive}).filter(({dir}) => {
					if (includeDirectory && includeFile) {
						return true;
					} else if (includeDirectory) {
						return dir;
					} else {
						return !dir;
					}
				}).map(({file, prefix}) => {
					if (prefix == null) {
						return file;
					} else {
						return PathWorker.resolve(prefix, file);
					}
				});
				return {success: true, ret: files};
			} catch (e) {
				return {success: false, ret: [], message: e.message};
			}
		});
	}

	public createFile(path: string, content: string): FileSystemBooleanResult {
		return this.invalidOr(path, () => {
			if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
				return {success: false, ret: false, message: 'File already exists.'};
			}
			try {
				fs.writeFileSync(path, content);
				return {success: true, ret: true};
			} catch (e) {
				return {success: false, ret: false, message: e.message};
			}
		});
	}

	public createOrReplaceFile(path: string, content: string): FileSystemBooleanResult {
		return this.invalidOr(path, () => {
			try {
				if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
					fs.writeFileSync(path, content);
				}
				return {success: true, ret: true};
			} catch (e) {
				return {success: false, ret: false, message: e.message};
			}
		});
	}

	/**
	 * read given file to json format, use u8. return undefined when file not found or not valid json
	 */
	public readJSON<T>(file: string): T | undefined {
		try {
			const content = fs.readFileSync(file, {encoding: 'utf-8'});
			return JSON.parse(content);
		} catch {
			return (void 0);
		}
	}
}

const INSTANCE = (() => {
	const worker = new FileSystemWorker();
	ipcMain.on(FileSystemEvent.EXISTS, (event: Electron.IpcMainEvent, path: string): void => {
		event.returnValue = worker.exists(path);
	});
	ipcMain.on(FileSystemEvent.IS_EMPTY_DIR, (event: Electron.IpcMainEvent, directory: string): void => {
		event.returnValue = worker.empty(directory);
	});
	ipcMain.on(FileSystemEvent.MKDIR, (event: Electron.IpcMainEvent, directory: string): void => {
		event.returnValue = worker.mkdir(directory);
	});
	ipcMain.on(FileSystemEvent.CREATE_FILE, (event: Electron.IpcMainEvent, path: string, content: string): void => {
		event.returnValue = worker.createFile(path, content);
	});
	return worker;
})();
export {INSTANCE as FileSystemWorker};
