import {ipcRenderer} from 'electron';
import {DialogEvent, OpenDialogOptions, OpenDialogResult} from '../shared/types';

export const DialogHandlers: WindowElectronDialog = {
	open: (options: OpenDialogOptions): OpenDialogResult => {
		return ipcRenderer.sendSync(DialogEvent.OPEN, options);
	}
};
