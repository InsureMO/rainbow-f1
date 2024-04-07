import {ipcRenderer} from 'electron';
import {DialogEvent, ElectronBridges, OpenDialogOptions, OpenDialogResult} from '../shared';

export const DialogBridge: ElectronBridges.WindowElectronDialog = {
	open: (options: OpenDialogOptions): OpenDialogResult => {
		return ipcRenderer.sendSync(DialogEvent.SHOW_OPEN, options);
	}
};
