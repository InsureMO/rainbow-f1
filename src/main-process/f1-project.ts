import {ipcMain} from 'electron';
import {CreateF1ProjectOptions, F1ProjectEvent} from '../shared/types';

class ApplicationF1Project {
	constructor() {
		ipcMain.on(F1ProjectEvent.CREATE, async (event, options: CreateF1ProjectOptions) => {
			const {name, directory} = options;
			// check directory, must be empty
		});
	}
}

export default new ApplicationF1Project();
