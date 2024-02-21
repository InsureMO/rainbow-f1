import {BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import {
	CommandLine,
	CommandLines,
	F1_PROJECT_FILE,
	F1_PROJECT_WORKSPACE_FILE,
	F1ModuleSettings,
	F1ProjectCreated,
	F1ProjectEnvs,
	F1ProjectEvent,
	F1ProjectSettings,
	isBlank,
	isNodeVersionValid,
	isNpmVersionValid,
	MIN_NODE_VERSION,
	MIN_NPM_VERSION
} from '../../shared';
import {createMainWindow} from '../main-window';
import WindowManager, {WindowType} from '../window-manager';
import cli from './command-lines';
import fs from './fs';

class ApplicationF1Project {
	constructor() {
		ipcMain.handle(F1ProjectEvent.CREATE, async (_, settings: F1ProjectSettings): Promise<F1ProjectCreated> => this.create(settings));
		ipcMain.on(F1ProjectEvent.OPEN, (event, settings: F1ProjectSettings) => this.open(settings, BrowserWindow.fromWebContents(event.sender)));
	}

	protected async checkCliNode(node?: CommandLine): Promise<string | undefined> {
		if (isBlank(node?.command)) {
			return 'Please select the node command.';
		}
		const version = await cli.nodeVersion(node.command);
		if (version == null) {
			return 'Invalid executive file for node, no version information detected.';
		} else if (!isNodeVersionValid(version)) {
			return `Invalid executive file for node, please use a version above ${MIN_NODE_VERSION}.`;
		}
		node.version = version;
		node.exists = true;

		return (void 0);
	}

	protected async checkCliNpm(npm?: CommandLine): Promise<string | undefined> {
		if (isBlank(npm?.command)) {
			return 'Please select the node command.';
		}
		const version = await cli.npmVersion(npm.command);
		if (version == null) {
			return 'Invalid executive file for npm, no version information detected.';
		} else if (!isNpmVersionValid(version)) {
			return `Invalid executive file for npm, please use a version above ${MIN_NPM_VERSION}.`;
		}
		npm.version = version;
		npm.exists = true;

		return (void 0);
	}

	protected async checkCliYarn(yarn?: CommandLine): Promise<string | undefined> {
		if (isBlank(yarn?.command)) {
			if (yarn != null) {
				yarn.exists = false;
			}
		} else {
			const version = await cli.yarnVersion(yarn.command);
			if (version == null) {
				delete yarn.version;
				yarn.exists = false;
			} else {
				yarn.version = version;
				yarn.exists = true;
			}
			return (void 0);
		}
	}

	protected async checkCliVolta(volta?: CommandLine): Promise<string | undefined> {
		if (isBlank(volta?.command)) {
			if (volta != null) {
				volta.exists = false;
			}
		} else {
			const version = await cli.voltaVersion(volta.command);
			if (version == null) {
				delete volta.version;
				volta.exists = false;
			} else {
				volta.version = version;
				volta.exists = true;
			}
			return (void 0);
		}
	}

	protected async checkCli(envs?: F1ProjectEnvs): Promise<string | undefined> {
		const {node, npm, yarn, volta} = envs?.cli ?? {};
		const nodeMessage = await this.checkCliNode(node);
		if (nodeMessage != null) {
			return nodeMessage;
		}
		const npmMessage = await this.checkCliNpm(npm);
		if (npmMessage != null) {
			return npmMessage;
		}
		await this.checkCliYarn(yarn);
		await this.checkCliVolta(volta);

		return (void 0);
	}

	protected checkModuleName(module: F1ModuleSettings): string | undefined {
		if (isBlank(module.name)) {
			return 'Module name cannot be blank.';
		} else if (/[\\\/\s<>:"'`|?*]/.test(module.name)) {
			return 'Module name cannot cannot contain any of /, \\, <, >, :, ", \', `, |, ?, * or whitespace.';
		} else {
			module.name = module.name.trim();
		}
	}

	protected createF1ProjectFileContent(settings: F1ProjectSettings): string {
		const json: F1ProjectSettings = JSON.parse(JSON.stringify(settings));
		// absolute directory of this project is not needed
		delete json.directory;
		// cli version and existence is not needed
		Object.keys(json.envs?.cli ?? {}).forEach(k => {
			const key = k as keyof CommandLines;
			delete json.envs?.cli?.[key]?.version;
			delete json.envs?.cli?.[key]?.exists;
		});
		// modules are not needed
		delete json.d9;
		delete json.o23;
		return JSON.stringify(json, (_, value) => value == null ? (void 0) : value, '\t');
	}

	protected createF1ProjectFile(directory: string, settings: F1ProjectSettings) {
		const f1JsonFile = path.resolve(directory, F1_PROJECT_FILE);
		fs.createFile(f1JsonFile, this.createF1ProjectFileContent(settings));
	}

	protected createF1ProjectWorkspaceFileContent(settings: F1ProjectSettings): string {
		const hasYarn = settings.envs?.cli?.yarn?.exists;
		const run = hasYarn ? 'yarn' : 'npm run';
		return JSON.stringify({
			private: true,
			workspaces: [...(settings.d9 || []), ...(settings.o23 || [])].map(module => module.name),
			scripts: {
				...(settings.d9 || []).reduce((scripts, module) => {
					scripts[`${module.name}:start`] = `cd ./${module.name} && ${run} start`;
					return scripts;
				}, {} as Record<string, string>),
				...(settings.o23 || []).reduce((scripts, module) => {
					scripts[`${module.name}:start`] = `cd ./${module.name} && ${run} start`;
					return scripts;
				}, {} as Record<string, string>)
			},
			volta: {
				node: settings.envs?.cli?.node?.version,
				yarn: settings.envs?.cli?.yarn?.version
			}
		}, (_, value) => value == null ? (void 0) : value, '\t');
	}

	protected createF1ProjectWorkspaceFile(directory: string, settings: F1ProjectSettings) {
		const f1JsonFile = path.resolve(directory, F1_PROJECT_WORKSPACE_FILE);
		fs.createFile(f1JsonFile, this.createF1ProjectWorkspaceFileContent(settings));
	}

	public async create(settings: F1ProjectSettings): Promise<F1ProjectCreated> {
		const {name, directory, envs, d9, o23} = settings;
		// check name, cannot be empty, and must be a valid name
		if (isBlank(name)) {
			return {success: false, project: settings, message: 'Project name cannot be blank.'};
		}
		// check directory, must be empty
		if (isBlank(directory)) {
			return {success: false, project: settings, message: 'Project directory cannot be blank.'};
		}
		const directoryExists = fs.exists(directory);
		if (!directoryExists) {
		} else if (!fs.empty(directory)) {
			return {success: false, project: settings, message: 'Project directory is not empty.'};
		}
		// check volta, node, npm, yarn versions
		const cliMessage = await this.checkCli(envs);
		if (cliMessage != null) {
			return {success: false, project: settings, message: cliMessage};
		}

		// check module names
		for (let module of d9) {
			const nameMessage = this.checkModuleName(module);
			if (nameMessage != null) {
				return {success: false, project: settings, message: nameMessage};
			}
		}
		for (let module of o23) {
			const nameMessage = this.checkModuleName(module);
			if (nameMessage != null) {
				return {success: false, project: settings, message: nameMessage};
			}
		}

		// create directory if not exists
		if (!directoryExists) {
			// directory does not exist, try to create it
			const {success, ret, message} = fs.mkdir(directory);
			if (!success || !ret) {
				return {success: false, project: settings, message};
			}
		}

		// create module folders
		for (let module of [...d9, ...o23]) {
			const moduleDirectory = path.resolve(directory, module.name);
			const {success, ret, message} = fs.mkdir(moduleDirectory);
			if (!success || !ret) {
				return {success, project: settings, message};
			}
		}
		// create f1 json
		this.createF1ProjectFile(directory, settings);
		// create workspace json
		this.createF1ProjectWorkspaceFile(directory, settings);

		// TODO create modules by cli

		return {success: true, project: settings, message: (void 0)};
	}

	public open(settings: F1ProjectSettings, window?: BrowserWindow) {
		const main = createMainWindow(settings, true);
		main.once('show', () => {
			if (window != null && WindowManager.type(window) !== WindowType.MAIN) {
				// close it
				window.close();
			}
		});
	}
}

export default new ApplicationF1Project();
