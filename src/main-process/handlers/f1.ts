import {BrowserWindow, ipcMain} from 'electron';
import {
	CommandLine,
	CommandLines,
	F1_PROJECT_FILE,
	F1_PROJECT_WORKSPACE_FILE,
	F1ModuleSettings,
	F1Project,
	F1ProjectCreated,
	F1ProjectEnvs,
	F1ProjectEvent,
	F1ProjectExisted,
	F1ProjectLoaded,
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
import path from './path';
import recentProjects from './recent-projects';

class ApplicationF1Project {
	constructor() {
		ipcMain.handle(F1ProjectEvent.CREATE, async (_, settings: F1ProjectSettings): Promise<F1ProjectCreated> => await this.create(settings));
		ipcMain.on(F1ProjectEvent.OPEN, (event, settings: F1ProjectSettings) => this.open(settings, BrowserWindow.fromWebContents(event.sender)));
		ipcMain.handle(F1ProjectEvent.TRY_TO_OPEN, async (_, directory: string) => await this.tryToOpen(directory));
		ipcMain.handle(F1ProjectEvent.ASK, async (event) => await this.loadProject(BrowserWindow.fromWebContents(event.sender)));
		ipcMain.on(F1ProjectEvent.OPENED, (_, project: F1Project) => this.onProjectOpened(project));
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
		// module dependencies are not needed, since they are in module package.json
		// @ts-ignore
		[...(json.d9 ?? []), ...(json.o23 ?? [])].forEach(module => module.dependencies = []);
		return JSON.stringify(json, (_, value) => value == null ? (void 0) : value, '\t');
	}

	protected createF1ProjectFile(directory: string, settings: F1ProjectSettings) {
		const f1JsonFile = path.resolve(directory, F1_PROJECT_FILE);
		fs.createFile(f1JsonFile, this.createF1ProjectFileContent(settings));
	}

	protected replaceF1ProjectFile(directory: string, settings: F1ProjectSettings) {
		const f1JsonFile = path.resolve(directory, F1_PROJECT_FILE);
		fs.createOrReplaceFile(f1JsonFile, this.createF1ProjectFileContent(settings));
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
		const directoryExists = fs.exists(directory).ret;
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

		// TODO CREATE MODULES BY CLI

		return {success: true, project: settings, message: (void 0)};
	}

	public open(settings: F1ProjectSettings, window?: BrowserWindow) {
		const main = createMainWindow(settings, false);
		main.maximize();
		main.show();
		if (window != null && WindowManager.type(window) !== WindowType.MAIN) {
			// close it
			window.close();
		}
	}

	public async tryToOpen(directory: string): Promise<F1ProjectExisted> {
		// check directory, must be empty
		if (isBlank(directory)) {
			return {success: false, message: 'Project directory cannot be blank.'};
		}

		const directoryExists = fs.exists(directory).ret;
		if (!directoryExists) {
			return {success: false, message: 'Project directory does not exist.'};
		}

		const f1JsonFile = path.resolve(directory, F1_PROJECT_FILE);
		const f1JsonFileExists = fs.exists(f1JsonFile).ret;
		if (!f1JsonFileExists) {
			return {success: false, message: `Project file[${F1_PROJECT_FILE}] does not exist.`};
		}
		const settings = fs.readJSON<F1ProjectSettings>(f1JsonFile);
		if (settings == null) {
			return {success: false, message: `Failed to read project file[${F1_PROJECT_FILE}].`};
		}
		if (isBlank(settings.name)) {
			settings.name = path.basename(directory);
		}
		settings.directory = directory;
		return {success: true, project: settings};
	}

	public async loadProject(window: BrowserWindow): Promise<F1ProjectLoaded> {
		const settings = WindowManager.project(window);
		if (settings == null) {
			return {success: false, message: 'Project settings not found.'};
		}

		const directory = settings.directory;
		if (isBlank(directory)) {
			return {success: false, message: `Project folder not defined in settings.`};
		} else if (!fs.exists(directory).ret) {
			return {success: false, message: `Project folder [${directory}] not exists.`};
		}
		// scan direct sub folders
		const {success, ret: folders, message} = fs.dir(directory, {file: false});
		if (!success) {
			return {success, message};
		}
		const folderMap = folders.reduce((map, folder) => {
			map[folder] = true;
			return map;
		}, {} as Record<string, true>);
		// compare folders with settings modules, fix it if needed
		['d9', 'o23'].forEach(k => {
			const key = k as 'd9' | 'o23';
			// @ts-ignore
			settings[key] = (settings[key] ?? []).filter(module => folderMap[module.name] === true);
			if (settings[key].length === 0) {
				delete settings[key];
			}
		});
		// save it again
		this.replaceF1ProjectFile(directory, settings);
		return {success: true, project: settings};
	}

	public onProjectOpened(project: F1Project) {
		recentProjects.addLastProject(project);
	}
}

export default new ApplicationF1Project();
