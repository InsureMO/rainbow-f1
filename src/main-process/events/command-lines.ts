import {spawnSync} from 'child_process';
import {ipcMain} from 'electron';
import log from 'electron-log/main';
import {CommandLine, CommandLines, CommandLinesEvent} from '../../shared/types';
import {isNotBlank, isWin} from '../utils';

class ApplicationCommandLines {
	constructor() {
		ipcMain.handle(CommandLinesEvent.COMMANDS, async (_, commandLines?: CommandLines) => this.commands(commandLines));
		ipcMain.handle(CommandLinesEvent.VERSION, async (_, _key: keyof CommandLines, path: string) => this.getVersion(path, '-v'));
	}

	protected async getVersion(command: string, ...args: Array<string>): Promise<string | undefined> {
		if (isWin() && command.includes(' ')) {
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

	protected async getCommand(command: string): Promise<string | undefined> {
		if (isWin()) {
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
		commandLine?: CommandLine,
		fallbackCommands: Array<string>, versionArgs?: Array<string>
	}): Promise<CommandLine | undefined> {
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

	public async volta(def?: CommandLine): Promise<CommandLine | undefined> {
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

	public async commands(commandLines?: CommandLines): Promise<CommandLines> {
		commandLines = commandLines ?? {};
		commandLines.volta = await this.volta(commandLines.volta);
		const volta = commandLines.volta?.command;
		await Promise.all([
			'node', 'npm', 'yarn'
		].map(async key => {
			const name = key as keyof CommandLines;
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

export default new ApplicationCommandLines();
