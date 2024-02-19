import {spawnSync} from 'child_process';
import {ipcMain} from 'electron';
import {CommandLine, CommandLines, CommandLinesEvent} from '../../shared/types';
import {isNotBlank, isWin} from '../utils';

class ApplicationCommandLines {
	constructor() {
		ipcMain.on(CommandLinesEvent.COMMANDS, (event, commandLines?: CommandLines) => event.returnValue = this.commands(commandLines));
	}

	protected getVersion(command: string, ...args: Array<string>): string | undefined {
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
			return (void 0);
		}
	}

	protected getCommand(command: string): string | undefined {
		if (isWin()) {
			if (command.includes('\\')) {
				// absolute path
				const result = spawnSync('type', [`"${command}"`], {encoding: 'utf-8'});
				if (result.error == null && result.stdout != null && result.stdout.trim().length !== 0 && !result.stdout.includes(' cannot find ')) {
					return command;
				} else {
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
				return (void 0);
			}
		}
	}

	protected getCommandLine(options: {
		commandLine?: CommandLine,
		command: string, versionArgs?: Array<string>
	}): CommandLine | undefined {
		const defined = isNotBlank(options.commandLine?.command) || isNotBlank(options.commandLine?.version);
		// use defined first
		const command = isNotBlank(options.commandLine?.command) ? options.commandLine.command : options.command;
		const path = this.getCommand(command);
		if (path == null) {
			// not found, either given or default
			return defined ? {command: options.commandLine.command, exists: false} : (void 0);
		}
		const version = this.getVersion(path, ...(options.versionArgs ?? ['-v']));
		if (version == null) {
			return defined ? {command: options.commandLine.command, exists: false} : (void 0);
		}
		return {command: path, version, exists: true};
	}

	public volta(def?: CommandLine): CommandLine | undefined {
		return this.getCommandLine({commandLine: def, command: 'volta'});
	}

	public commands(commandLines?: CommandLines): CommandLines {
		commandLines = commandLines ?? {};
		commandLines.volta = this.volta(commandLines.volta);
		const hasVolta = commandLines.volta?.exists ?? false;
		const volta = hasVolta ? commandLines.volta.command : (void 0);
		['node', 'npm', 'yarn'].forEach(key => {
			const name = key as keyof CommandLines;
			const def = commandLines[name];
			commandLines[name] = this.getCommandLine({commandLine: def, command: key});
		});
		return commandLines;
	}
}

export default new ApplicationCommandLines();
