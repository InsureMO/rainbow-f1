import {ipcMain} from 'electron';
import * as fs from 'fs';
import {FileSystemBooleanResult, FileSystemEvent, FileSystemOperationResult} from '../../shared';

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
		return {
			success: true,
			ret: this.isValid(directory)
				&& (!this.exists(directory) || (fs.lstatSync(directory).isDirectory() && fs.readdirSync(directory).length === 0))
		};
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
