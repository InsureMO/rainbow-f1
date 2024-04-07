import {ipcMain} from 'electron';
import p from 'path';
import {FileSystemOperationResult, PathEvent} from '../../shared';

class PathWorker {
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

	public resolve(...path: Array<string>): string {
		return p.resolve(...path);
	}
}

const INSTANCE = (() => {
	const worker = new PathWorker();
	ipcMain.on(PathEvent.BASENAME, (event, path: string, suffix?: string): void => {
		event.returnValue = worker.basename(path, suffix);
	});
	return worker;
})();
export {INSTANCE as PathWorker};
