import {dialog, ipcMain} from 'electron';
import {DialogEvent, OpenDialogOptions} from '../shared/types';

class ApplicationDialog {
	constructor() {
		ipcMain.on(DialogEvent.OPEN, (event, options: OpenDialogOptions) => {
			const result = dialog.showOpenDialogSync(options);
			if (result == null) {
				event.returnValue = {canceled: true, filePaths: []};
			} else {
				event.returnValue = {canceled: false, filePaths: result};
			}
		});
	}
}

export default new ApplicationDialog();
