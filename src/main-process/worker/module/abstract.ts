import {spawnSync} from 'child_process';
import log from 'electron-log/main';
import {ProjectCliCommand} from '../../../shared';

export interface ModuleCreated {
	success: boolean;
	ret: boolean;
	message?: ErrorMessage;
}

export abstract class AbstractModuleProcessor {
	protected executeModuleCreateCli(command: ProjectCliCommand, args: Array<string>, directory: string, moduleName: string): ModuleCreated {
		const cli = [command, ...args].join(' ');
		log.info(`Create module[${directory}/${moduleName}] by command [${cli}].`);
		const result = spawnSync(command, args, {encoding: 'utf-8', cwd: directory});
		if (result.error == null && result.stdout != null && result.stdout.trim().length !== 0) {
			return {success: true, ret: true};
		} else {
			log.error(`Failed to create module[${moduleName}] by command [${cli}].`, result.error, result.stderr);
			return {
				success: true, ret: false,
				message: `Failed to create module[${moduleName}] by command [${cli}].`
			};
		}
	}
}