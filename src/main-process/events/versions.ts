import {app, ipcMain} from 'electron';
import {VersionsEvent} from '../../shared/types';

class ApplicationVersions {
	constructor() {
		ipcMain.on(VersionsEvent.APP, (event) => event.returnValue = app.getVersion());
	}
}

export default new ApplicationVersions();
