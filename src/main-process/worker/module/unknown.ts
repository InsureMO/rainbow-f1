import {
	F1ModuleSettings,
	F1ModuleType,
	F1Project,
	UnknownModuleSettings,
	UnknownModuleStructure
} from '../../../shared';
import {FileSystemWorker} from '../file-system';
import {PathWorker} from '../path';
import {AbstractModuleProcessor, ModuleCreated} from './abstract';

class UnknownModuleProcessor extends AbstractModuleProcessor {
	public async create(module: F1ModuleSettings, directory: string): Promise<ModuleCreated> {
		const moduleDirectory = PathWorker.resolve(directory, module.name);
		const {success, ret, message} = FileSystemWorker.mkdir(moduleDirectory);
		if (!success || !ret) {
			return {success: true, ret: false, message};
		} else {
			return {success: true, ret: true};
		}
	}

	public async read(_project: F1Project, module: UnknownModuleSettings): Promise<UnknownModuleStructure> {
		const structure: Omit<UnknownModuleStructure, 'success' | 'message'> = {
			name: module.name, type: F1ModuleType.UNKNOWN,
			files: [],
			commands: {}
		};
		return {success: true, ...structure};
	}
}

const reader = new UnknownModuleProcessor();
export {reader as UnknownModuleProcessor};