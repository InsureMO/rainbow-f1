import {ipcMain} from 'electron';
import * as p from 'path';
import {FileSystemOperationResult, PathEvent} from '../../shared/types';

class ApplicationPath {
	constructor() {
		ipcMain.on(PathEvent.BASENAME, (event, path: string, suffix?: string) => event.returnValue = this.basename(path, suffix));
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

	public basename(path: string, suffix?: string): string | undefined {
		if (!this.isValid(path)) {
			return (void 0);
		} else {
			return p.basename(path, suffix);
		}
	}
}

export default new ApplicationPath();
