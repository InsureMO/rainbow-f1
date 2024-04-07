import {dialog, ipcMain} from 'electron';
import {DialogEvent, OpenDialogOptions} from '../../shared';

class DialogWorker {
	public showOpenDialog(event: Electron.IpcMainEvent, options: OpenDialogOptions): void {
		const result = dialog.showOpenDialogSync(options);
		if (result == null) {
			event.returnValue = {canceled: true, filePaths: []};
		} else {
			event.returnValue = {canceled: false, filePaths: result};
		}
	}
}

const INSTANCE = (() => {
	const worker = new DialogWorker();
	ipcMain.on(DialogEvent.SHOW_OPEN, (event: Electron.IpcMainEvent, options: OpenDialogOptions): void => {
		worker.showOpenDialog(event, options);
	});
	return worker;
})();
export {INSTANCE as DialogWorker};
