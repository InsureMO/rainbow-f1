import {spawnSync} from 'child_process';
import {ipcMain} from 'electron';
import log from 'electron-log/main';
import {
	CLI_COMMAND_NAMES,
	isNotBlank,
	ProjectCli,
	ProjectCliCommand,
	ProjectCliEvent,
	ProjectCliSet,
	ProjectCliVersion
} from '../../shared';
import {Envs} from '../envs';

type CliCommandVersionArg = string;

interface CliDetectOptions {
	cli?: ProjectCli;
	fallbackCommands: Array<ProjectCliCommand>;
	versionArgs?: Array<CliCommandVersionArg>;
}

class ProjectCliWorker {
	public async detectCliVersion(command: ProjectCliCommand, ...args: Array<CliCommandVersionArg>): Promise<Undefinable<ProjectCliVersion>> {
		if (Envs.win && command.includes(' ')) {
			// for windows, command with space should be quoted
			command = `"${command}"`;
		}
		const result = spawnSync(command, args, {encoding: 'utf-8'});
		if (result.error == null && result.stdout != null && result.stdout.trim().length !== 0) {
			const stdout = result.stdout.trim();
			if (stdout.startsWith('v')) {
				return stdout.substring(1);
			} else {
				return stdout;
			}
		} else {
			log.error(`Failed to get version for [${command}] with args ${args.join(', ')}.`, result.error, result.stderr);
			return (void 0);
		}
	}

	public async detectNodeVersion(command: ProjectCliCommand): Promise<Undefinable<ProjectCliVersion>> {
		return await this.detectCliVersion(command, '-v');
	}

	public async detectNpmVersion(command: ProjectCliCommand): Promise<Undefinable<ProjectCliVersion>> {
		return await this.detectCliVersion(command, '-v');
	}

	public async detectYarnVersion(command: ProjectCliCommand): Promise<Undefinable<ProjectCliVersion>> {
		return await this.detectCliVersion(command, '-v');
	}

	public async detectVoltaVersion(command: ProjectCliCommand): Promise<Undefinable<ProjectCliVersion>> {
		return await this.detectCliVersion(command, '-v');
	}

	protected async locateCliCommand(command: ProjectCliCommand): Promise<Undefinable<ProjectCliCommand>> {
		if (Envs.win) {
			if (command.includes('\\')) {
				// absolute path
				const result = spawnSync('type', [`"${command}"`], {encoding: 'utf-8'});
				if (result.error == null && result.stdout != null && result.stdout.trim().length !== 0 && !result.stdout.includes(' cannot find ')) {
					return command;
				} else {
					log.error(`Failed to locate command [${command}] by "type".`, result.error, result.stderr);
					return (void 0);
				}
			} else {
				// only command name
				const result = spawnSync('where', [`"${command}"`], {encoding: 'utf-8'});
				if (result.error == null && result.stdout != null && result.stdout.trim().length !== 0) {
					const stdout = result.stdout.trim();
					if (stdout.includes(' not find ')) {
						return (void 0);
					} else {
						return stdout;
					}
				} else {
					log.error(`Failed to locate command [${command}] by "where".`, result.error, result.stderr);
					return (void 0);
				}
			}
		} else {
			const result = spawnSync('which', [command], {encoding: 'utf-8'});
			if (result.error == null && result.stdout != null && result.stdout.trim().length !== 0) {
				const stdout = result.stdout.trim();
				if (stdout.endsWith(' not found')) {
					return (void 0);
				} else {
					return stdout;
				}
			} else {
				log.error(`Failed to locate command [${command}] by "which".`, result.error, result.stderr);
				return (void 0);
			}
		}
	}

	protected async detectCli(options: CliDetectOptions): Promise<Undefinable<ProjectCli>> {
		const defined = isNotBlank(options.cli?.command) || isNotBlank(options.cli?.version);
		// use defined first
		const commands = [options.cli?.command, ...options.fallbackCommands].filter(isNotBlank);
		let path = null;
		for (let command of commands) {
			path = await this.locateCliCommand(command);
			if (path != null) {
				break;
			}
		}
		if (path == null) {
			// not found, either given or default
			return defined ? {command: options.cli.command, exists: false} : (void 0);
		}
		const version = await this.detectCliVersion(path, ...(options.versionArgs ?? ['-v']));
		if (version == null) {
			// version not detected, either given or default
			// also treated as command not found
			return defined ? {command: options.cli.command, exists: false} : (void 0);
		}
		return {command: path, version, exists: true};
	}

	public async detectVolta(volta?: ProjectCli): Promise<Undefinable<ProjectCli>> {
		return await this.detectCli({cli: volta, fallbackCommands: ['volta'], versionArgs: ['-v']});
	}

	protected replaceBaseOnVoltaCommand(to: ElementOfArray<typeof CLI_COMMAND_NAMES>, voltaCommand?: ProjectCliCommand): string | undefined {
		if (voltaCommand == null) {
			return null;
		} else if (voltaCommand.endsWith('\\volta.exe')) {
			// windows
			return voltaCommand.replace(/\\volta.exe$/, `\\${to}`);
		} else if (voltaCommand.endsWith('\\volta')) {
			// windows
			return voltaCommand.replace(/\\volta$/, `\\${to}`);
		} else {
			return voltaCommand.replace(/\/volta$/, `/${to}`);
		}
	}

	public async detectCliSet(cliSet?: ProjectCliSet): Promise<ProjectCliSet> {
		cliSet = cliSet ?? {};
		cliSet.volta = await this.detectVolta(cliSet.volta);
		const volta = cliSet.volta?.command;
		await Promise.all(CLI_COMMAND_NAMES.map(async key => {
			const name = key as keyof ProjectCliSet;
			const def = cliSet[name];
			cliSet[name] = await this.detectCli({
				cli: def,
				// fallback to volta first, and key itself
				fallbackCommands: [this.replaceBaseOnVoltaCommand(key, volta), key].filter(c => c != null),
				versionArgs: ['-v']
			});
		}));
		return cliSet;
	}
}

const INSTANCE = (() => {
	const worker = new ProjectCliWorker();
	ipcMain.handle(ProjectCliEvent.DETECT_CLI_SET,
		async (_, cliSet?: ProjectCliSet): Promise<ReturnType<ProjectCliWorker['detectCliSet']>> => {
			return await worker.detectCliSet(cliSet);
		});
	ipcMain.handle(ProjectCliEvent.DETECT_CLI_VERSION,
		async (_, _key: keyof ProjectCliSet, path: string): Promise<ReturnType<ProjectCliWorker['detectCliVersion']>> => {
			return await worker.detectCliVersion(path, '-v');
		});
	return worker;
})();
export {INSTANCE as ProjectCliWorker};
