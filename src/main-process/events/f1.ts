import {ipcMain} from 'electron';
import {F1ProjectSettings} from '../../shared/project-settings';
import {F1ProjectCreated, F1ProjectEvent} from '../../shared/types';

class ApplicationF1Project {
	constructor() {
		ipcMain.handle(F1ProjectEvent.CREATE, async (_, options: F1ProjectSettings): Promise<F1ProjectCreated> => this.create(options));
	}

	public async create(settings: F1ProjectSettings): Promise<F1ProjectCreated> {
		const {name, directory, envs, d9, o23} = settings;
		//TODO
		// 1. CHECK DIRECTORY, MUST BE EMPTY
		// 2. CHECK VOLTA, NODE, NPM, YARN VERSIONS
		// 3. TRY TO CREATE PROJECT FOLDER
		// 4. CREATE MODULES BY CLI

		return {success: true, project: settings, message: (void 0)};
	}
}

export default new ApplicationF1Project();
