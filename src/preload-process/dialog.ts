import {ipcRenderer} from 'electron';
import {DialogEvent, OpenDialogOptions, OpenDialogResult} from '../shared';

export const DialogBridge: WindowElectronDialog = {
	open: (options: OpenDialogOptions): OpenDialogResult => {
		return ipcRenderer.sendSync(DialogEvent.SHOW_OPEN_DIALOG, options);
	}
};
