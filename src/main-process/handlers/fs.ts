import {ipcMain} from 'electron';
import * as fs from 'fs';
import {
	FileSystemBooleanResult,
	FileSystemEvent,
	FileSystemFoldersResult,
	FileSystemOperationResult,
	MAC_INDEX_FILE
} from '../../shared';
import {isMac} from '../utils';
import path from './path';

class ApplicationFileSystem {
	constructor() {
		ipcMain.on(FileSystemEvent.EXISTS, (event, path: string) => event.returnValue = this.exists(path));
		ipcMain.on(FileSystemEvent.EMPTY, (event, directory: string) => event.returnValue = this.empty(directory));
		ipcMain.on(FileSystemEvent.MKDIR, (event, directory: string) => event.returnValue = this.mkdir(directory));
		ipcMain.on(FileSystemEvent.CREATE_FILE, (event, path: string, content: string) => event.returnValue = this.createFile(path, content));
	}

	protected isValid(path: string): boolean {
		return path != null && path.trim().length > 0;
	}

	protected invalidOr<X, R extends FileSystemOperationResult<X>>(path: string, or: () => R): R {
		if (!this.isValid(path)) {
			return {success: true, message: 'Given path is not valid.'} as R;
		}
		return or();
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
		} else if (isMac() && files.length === 1 && files[0] === MAC_INDEX_FILE) {
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

	public dir(directory: string, options?: {
		dir?: false, file?: false, recursive?: true
	}): FileSystemFoldersResult {
		return this.invalidOr(directory, () => {
			if (!fs.existsSync(directory) || fs.lstatSync(directory).isFile()) {
				return {success: true, ret: []};
			}
			if (!(options?.dir ?? true) && !(options?.file ?? true)) {
				// ask nothing, return directly
				return {success: true, ret: []};
			}
			try {
				let files = fs.readdirSync(directory, {recursive: options?.recursive ?? false}) as Array<string>;
				if ((options?.dir ?? true) || (options?.file ?? true)) {
					// require all, do nothing
				} else if (!(options?.dir ?? true)) {
					files = files.filter(file => fs.lstatSync(path.resolve(directory, file)).isDirectory());
				} else if (!(options?.file ?? true)) {
					files = files.filter(file => fs.lstatSync(path.resolve(directory, file)).isFile());
				}
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

export default new ApplicationFileSystem();
