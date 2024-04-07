import {app, ipcMain} from 'electron';
import {ApplicationEvent} from '../../shared';

class ApplicationWorker {
	public getVersion(): string {
		return app.getVersion();
	}
}

const INSTANCE = (() => {
	const worker = new ApplicationWorker();
	ipcMain.on(ApplicationEvent.GET_VERSION, (event: Electron.IpcMainEvent): void => {
		event.returnValue = worker.getVersion();
	});
	return worker;
})();
export {INSTANCE as ApplicationWorker};
