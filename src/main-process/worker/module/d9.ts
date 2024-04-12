import {D9ModuleSettings, D9ModuleStructure, F1ModuleType, F1Project} from '../../../shared';
import {AbstractModuleProcessor, ModuleCreated} from './abstract';
import {UnknownModuleProcessor} from './unknown';

class D9ModuleProcessor extends AbstractModuleProcessor {
	public async create(_project: F1Project, module: D9ModuleSettings, directory: string): Promise<ModuleCreated> {
		// TODO temp, currently no d9 creator available
		return await UnknownModuleProcessor.create(module, directory);
	}

	public async read(_project: F1Project, module: D9ModuleSettings): Promise<D9ModuleStructure> {
		const structure: Omit<D9ModuleStructure, 'success' | 'message'> = {
			name: module.name, type: F1ModuleType.D9,
			folders: [], files: [],
			nodeFolders: [], nodeFiles: [],
			commands: {}
		};
		return {success: true, ...structure};
	}
}

const reader = new D9ModuleProcessor();
export {reader as D9ModuleProcessor};