import {ipcMain} from 'electron';
import {F1ProjectSettings} from '../../shared/project-settings';
import {F1ProjectCreated, F1ProjectEvent} from '../../shared/types';

class ApplicationF1Project {
	constructor() {
		ipcMain.handle(F1ProjectEvent.CREATE, async (event, options: F1ProjectSettings): Promise<F1ProjectCreated> => {
			const {name, directory, d9, o23} = options;
			//TODO
			// 1. CHECK DIRECTORY, MUST BE EMPTY
			// 2. CHECK VOLTA, NODE, NPM, YARN VERSIONS
			// 3. TRY TO CREATE PROJECT FOLDER
			// 4. CREATE MODULES BY CLI

			return {success: true, project: options, message: (void 0)};
		});
	}
}

export default new ApplicationF1Project();
