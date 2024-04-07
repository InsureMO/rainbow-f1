import {spawnSync} from 'child_process';
import {ipcMain} from 'electron';
import log from 'electron-log/main';
import {isNotBlank, ProjectCli, ProjectCliEvent, ProjectCliSet} from '../../shared';
import {Envs} from '../envs';

class ProjectCliWorker {
	public async getVersion(command: string, ...args: Array<string>): Promise<string | undefined> {
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

	public async nodeVersion(command: string): Promise<string | undefined> {
		return await this.getVersion(command, '-v');
	}

	public async npmVersion(command: string): Promise<string | undefined> {
		return await this.getVersion(command, '-v');
	}

	public async yarnVersion(command: string): Promise<string | undefined> {
		return await this.getVersion(command, '-v');
	}

	public async voltaVersion(command: string): Promise<string | undefined> {
		return await this.getVersion(command, '-v');
	}

	protected async getCommand(command: string): Promise<string | undefined> {
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
				const result = spawnSync('where', [command], {encoding: 'utf-8'});
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

	protected async getCommandLine(options: {
		commandLine?: ProjectCli,
		fallbackCommands: Array<string>, versionArgs?: Array<string>
	}): Promise<ProjectCli | undefined> {
		const defined = isNotBlank(options.commandLine?.command) || isNotBlank(options.commandLine?.version);
		// use defined first
		const commands = [options.commandLine?.command, ...options.fallbackCommands].filter(isNotBlank);
		let path = null;
		for (let command of commands) {
			path = await this.getCommand(command);
			if (path != null) {
				break;
			}
		}
		if (path == null) {
			// not found, either given or default
			return defined ? {command: options.commandLine.command, exists: false} : (void 0);
		}
		const version = await this.getVersion(path, ...(options.versionArgs ?? ['-v']));
		if (version == null) {
			return defined ? {command: options.commandLine.command, exists: false} : (void 0);
		}
		return {command: path, version, exists: true};
	}

	public async volta(def?: ProjectCli): Promise<ProjectCli | undefined> {
		return await this.getCommandLine({commandLine: def, fallbackCommands: ['volta'], versionArgs: ['-v']});
	}

	protected replaceBaseVolta(to: string, volta?: string): string | undefined {
		if (volta == null) {
			return null;
		} else if (volta.endsWith('volta.exe')) {
			return volta.replace('volta.exe', to);
		} else {
			return volta.replace(/\/volta$/, `/${to}`);
		}
	}

	public async commands(commandLines?: ProjectCliSet): Promise<ProjectCliSet> {
		commandLines = commandLines ?? {};
		commandLines.volta = await this.volta(commandLines.volta);
		const volta = commandLines.volta?.command;
		await Promise.all([
			'node', 'npm', 'yarn'
		].map(async key => {
			const name = key as keyof ProjectCliSet;
			const def = commandLines[name];
			commandLines[name] = await this.getCommandLine({
				commandLine: def,
				fallbackCommands: [this.replaceBaseVolta(key, volta), key].filter(c => c != null),
				versionArgs: ['-v']
			});
		}));
		return commandLines;
	}
}

const INSTANCE = (() => {
	const worker = new ProjectCliWorker();
	ipcMain.handle(ProjectCliEvent.COMMANDS,
		async (_, commandLines?: ProjectCliSet): Promise<ReturnType<ProjectCliWorker['commands']>> => {
			return await worker.commands(commandLines);
		});
	ipcMain.handle(ProjectCliEvent.VERSION,
		async (_, _key: keyof ProjectCliSet, path: string): Promise<ReturnType<ProjectCliWorker['getVersion']>> => {
			return await worker.getVersion(path, '-v');
		});
	return worker;
})();
export {INSTANCE as ProjectCliWorker};
