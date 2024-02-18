import {ipcMain} from 'electron';
import {F1ProjectSettings} from '../../shared/project-settings';
import {F1ProjectEvent} from '../../shared/types';

class ApplicationF1Project {
	constructor() {
		ipcMain.on(F1ProjectEvent.CREATE, (event, options: F1ProjectSettings) => {
			const {name, directory, d9, o23} = options;
			//TODO
			// 1. CHECK DIRECTORY, MUST BE EMPTY
			// 2. CHECK VOLTA, NODE, NPM, YARN VERSIONS
			// 3. TRY TO CREATE PROJECT FOLDER
			// 4. CREATE MODULES BY CLI

			// { success: boolean; project: F1Project; message?: string }
		});
	}
}

export default new ApplicationF1Project();
