import {ipcMain} from 'electron';
import p from 'path';
import {PathEvent} from '../../shared';

class PathWorker {
	protected isValid(path: string): boolean {
		return path != null && path.trim().length > 0;
	}

	// protected invalidOr<X, R extends FileSystemOperationResult<X>>(path: string, or: () => R): R {
	// 	if (!this.isValid(path)) {
	// 		return {success: true, message: 'Given path is not valid.'} as R;
	// 	}
	// 	return or();
	// }

	public separator(): string {
		return p.sep;
	}

	public dirname(path: string): string {
		return p.dirname(path);
	}

	public basename(path: string, suffix?: string): string | undefined {
		if (!this.isValid(path)) {
			return (void 0);
		} else {
			return p.basename(path, suffix);
		}
	}

	public extname(path: string): string | undefined {
		if (!this.isValid(path)) {
			return (void 0);
		} else {
			return p.extname(path) || (void 0);
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
	ipcMain.on(PathEvent.RESOLVE, (event, ...path: Array<string>): void => {
		event.returnValue = worker.resolve(...path);
	});
	return worker;
})();
export {INSTANCE as PathWorker};
