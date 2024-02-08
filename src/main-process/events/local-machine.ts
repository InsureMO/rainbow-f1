import {spawnSync} from 'child_process';
import {ipcMain} from 'electron';
import {LocalMachineEvent, LocalMachineVersions} from '../../shared/types';

class ApplicationLocalMachine {
	constructor() {
		ipcMain.on(LocalMachineEvent.VERSIONS, (event) => event.returnValue = this.versions());

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
}

export default new ApplicationLocalMachine();
