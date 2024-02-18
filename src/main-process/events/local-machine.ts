import {spawnSync} from 'child_process';
import {ipcMain} from 'electron';
import {LocalMachineCommands, LocalMachineEvent, LocalMachineVersions} from '../../shared/types';
import {isWin} from '../utils';

class ApplicationLocalMachine {
	constructor() {
		ipcMain.on(LocalMachineEvent.VERSIONS, (event) => event.returnValue = this.versions());
		ipcMain.on(LocalMachineEvent.COMMANDS, (event) => event.returnValue = this.commands());

		this.versions();
	}

	protected getVersion(command: string, ...args: Array<string>): string | undefined {
		const result = spawnSync(command, args, {encoding: 'utf-8'});
		if (result.error == null && result.stdout != null && result.stdout.trim().length !== 0) {
			return result.stdout.trim();
		} else {
			return (void 0);
		}
	}

	public versionOfVolta(): string | undefined {
		return this.getVersion('volta', '-v');
	}

	public versionOfNode(): string | undefined {
		return this.getVersion('node', '-v');
	}

	public versionOfNpm(): string | undefined {
		return this.getVersion('npm', '-v');
	}

	public versionOfYarn(): string | undefined {
		return this.getVersion('yarn', '-v');
	}

	public versions(): LocalMachineVersions {
		return {
			volta: this.versionOfVolta(),
			node: this.versionOfNode(), npm: this.versionOfNpm(), yarn: this.versionOfYarn()
		};
	}

	protected getCommand(command: string): string | undefined {
		const result = spawnSync(isWin() ? 'where' : 'which', [command], {encoding: 'utf-8'});
		if (result.error == null && result.stdout != null && result.stdout.trim().length !== 0) {
			return result.stdout.trim();
		} else {
			return (void 0);
		}
	}

	public commandOfVolta(): string | undefined {
		return this.getCommand('volta');
	}

	public commandOfNode(): string | undefined {
		return this.getCommand('node');
	}

	public commandOfNpm(): string | undefined {
		return this.getCommand('npm');
	}

	public commandOfYarn(): string | undefined {
		return this.getCommand('yarn');
	}

	public commands(): LocalMachineCommands {
		const {volta, node, npm, yarn} = this.versions();
		return {
			volta: {exists: volta != null, command: this.commandOfVolta(), version: volta},
			node: {exists: node != null, command: this.commandOfNode(), version: node},
			npm: {exists: npm != null, command: this.commandOfNpm(), version: npm},
			yarn: {exists: yarn != null, command: this.commandOfYarn(), version: yarn}
		};
	}
}

export default new ApplicationLocalMachine();
