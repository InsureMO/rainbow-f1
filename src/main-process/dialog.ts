import {dialog, ipcMain} from 'electron';
import {DialogEvent, OpenDialogOptions} from '../shared/types';

class ApplicationDialog {
	constructor() {
		ipcMain.on(DialogEvent.OPEN, async (event, options: OpenDialogOptions) => {
			const result = await dialog.showOpenDialog(options);
			event.sender.send(DialogEvent.OPEN_RESULT, result);
		});
	}
}

export default new ApplicationDialog();
