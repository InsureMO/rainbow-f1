import {ipcRenderer} from 'electron';
import {DialogEvent, OpenDialogOptions, OpenDialogResult} from '../shared/types';

export const DialogHandlers: WindowElectronDialog = {
	open: (options: OpenDialogOptions): OpenDialogResult => {
		const result = ipcRenderer.sendSync(DialogEvent.OPEN, options);
		console.log(result);
		return result;
	}
};
