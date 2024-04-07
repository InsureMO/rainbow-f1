import {BrowserWindow, ipcMain} from 'electron';
import {
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
	isNotBlank,
	isNpmVersionValid,
	MIN_NODE_VERSION,
	MIN_NPM_VERSION,
	ProjectCli,
	ProjectCliSet
} from '../../shared';
import {createMainWindow, WindowManager, WindowType} from '../window';
import {FileSystemWorker} from './file-system';
import {PathWorker} from './path';
import {ProjectCliWorker} from './project-cli';
import {RecentProjectsWorker} from './recent-projects';

class ProjectWorker {
	protected async checkCliNode(node?: ProjectCli): Promise<string | undefined> {
		if (isBlank(node?.command)) {
			return 'Please select the node command.';
		}
		const version = await ProjectCliWorker.nodeVersion(node.command);
		if (version == null) {
			return 'Invalid executive file for node, no version information detected.';
		} else if (!isNodeVersionValid(version)) {
			return `Invalid executive file for node, please use a version above ${MIN_NODE_VERSION}.`;
		}
		node.version = version;
		node.exists = true;

		return (void 0);
	}

	protected async checkCliNpm(npm?: ProjectCli): Promise<string | undefined> {
		if (isBlank(npm?.command)) {
			return 'Please select the node command.';
		}
		const version = await ProjectCliWorker.npmVersion(npm.command);
		if (version == null) {
			return 'Invalid executive file for npm, no version information detected.';
		} else if (!isNpmVersionValid(version)) {
			return `Invalid executive file for npm, please use a version above ${MIN_NPM_VERSION}.`;
		}
		npm.version = version;
		npm.exists = true;

		return (void 0);
	}

	protected async checkCliYarn(yarn?: ProjectCli): Promise<string | undefined> {
		if (isBlank(yarn?.command)) {
			if (yarn != null) {
				yarn.exists = false;
			}
		} else {
			const version = await ProjectCliWorker.yarnVersion(yarn.command);
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

	protected async checkCliVolta(volta?: ProjectCli): Promise<string | undefined> {
		if (isBlank(volta?.command)) {
			if (volta != null) {
				volta.exists = false;
			}
		} else {
			const version = await ProjectCliWorker.voltaVersion(volta.command);
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

	protected copyF1ProjectSettings(settings: F1ProjectSettings): F1Project {
		return JSON.parse(JSON.stringify(settings));
	}

	protected createF1ProjectFileContent(project: F1Project): string {
		const json: F1Project = JSON.parse(JSON.stringify(project));
		// absolute directory of this project is not needed
		delete json.directory;
		// cli version and existence is not needed
		Object.keys(json.envs?.cli ?? {}).forEach(k => {
			const key = k as keyof ProjectCliSet;
			delete json.envs?.cli?.[key]?.version;
			delete json.envs?.cli?.[key]?.exists;
		});
		// module dependencies are not needed, since they are in module package.json
		// @ts-ignore
		(json.modules ?? []).forEach(module => delete module.dependencies);
		return JSON.stringify(json, (_, value) => value == null ? (void 0) : value, '\t');
	}

	protected createF1ProjectFile(directory: string, project: F1Project) {
		const f1JsonFile = PathWorker.resolve(directory, F1_PROJECT_FILE);
		FileSystemWorker.createFile(f1JsonFile, this.createF1ProjectFileContent(project));
	}

	protected replaceF1ProjectFile(directory: string, project: F1Project) {
		const f1JsonFile = PathWorker.resolve(directory, F1_PROJECT_FILE);
		FileSystemWorker.createOrReplaceFile(f1JsonFile, this.createF1ProjectFileContent(project));
	}

	protected createF1ProjectWorkspaceFileContent(project: F1Project): string {
		const hasYarn = project.envs?.cli?.yarn?.exists;
		const run = hasYarn ? 'yarn' : 'npm run';
		return JSON.stringify({
			private: true,
			workspaces: (project.modules || []).map(module => module.name),
			scripts: {
				...(project.modules || []).reduce((scripts, module) => {
					scripts[`${module.name}:start`] = `cd ./${module.name} && ${run} start`;
					return scripts;
				}, {} as Record<string, string>)
			},
			volta: isNotBlank(project.envs?.cli?.node?.version) && isNotBlank(project.envs?.cli?.yarn?.version)
				? {node: project.envs?.cli?.node?.version, yarn: project.envs?.cli?.yarn?.version}
				: (void 0)
		}, (_, value) => value == null ? (void 0) : value, '\t');
	}

	protected createF1ProjectWorkspaceFile(directory: string, project: F1Project) {
		const f1JsonFile = PathWorker.resolve(directory, F1_PROJECT_WORKSPACE_FILE);
		FileSystemWorker.createFile(f1JsonFile, this.createF1ProjectWorkspaceFileContent(project));
	}

	public async create(settings: F1ProjectSettings): Promise<F1ProjectCreated> {
		const project = this.copyF1ProjectSettings(settings);
		const {name, directory, envs, modules = []} = project;
		// check name, cannot be empty, and must be a valid name
		if (isBlank(name)) {
			return {success: false, project, message: 'Project name cannot be blank.'};
		}
		// check directory, must be empty
		if (isBlank(directory)) {
			return {success: false, project, message: 'Project directory cannot be blank.'};
		}
		const directoryExists = FileSystemWorker.exists(directory).ret;
		if (!directoryExists) {
		} else if (!FileSystemWorker.empty(directory)) {
			return {success: false, project, message: 'Project directory is not empty.'};
		}
		// check volta, node, npm, yarn versions
		const cliMessage = await this.checkCli(envs);
		if (cliMessage != null) {
			return {success: false, project, message: cliMessage};
		}

		// check module names
		for (let module of modules) {
			const nameMessage = this.checkModuleName(module);
			if (nameMessage != null) {
				return {success: false, project, message: nameMessage};
			}
		}
		// check name duplication
		const moduleNameMap = modules.reduce((map, {name}) => {
			map[(name ?? '').trim().toLowerCase()] = true;
			return map;
		}, {} as Record<string, boolean>);
		if (Object.keys(moduleNameMap).length !== modules.length) {
			return {success: false, project, message: 'Duplicated names detected on modules.'};
		}

		// create directory if not exists
		if (!directoryExists) {
			// directory does not exist, try to create it
			const {success, ret, message} = FileSystemWorker.mkdir(directory);
			if (!success || !ret) {
				return {success: false, project, message};
			}
		}

		// create module folders
		for (let module of modules) {
			const moduleDirectory = PathWorker.resolve(directory, module.name);
			const {success, ret, message} = FileSystemWorker.mkdir(moduleDirectory);
			if (!success || !ret) {
				return {success, project, message};
			}
		}
		// create f1 json
		this.createF1ProjectFile(directory, project);
		// create workspace json
		this.createF1ProjectWorkspaceFile(directory, project);

		// TODO CREATE MODULES BY CLI

		return {success: true, project, message: (void 0)};
	}

	public open(project: F1Project, window?: BrowserWindow) {
		const main = createMainWindow({project, showImmediate: false});
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

		const directoryExists = FileSystemWorker.exists(directory).ret;
		if (!directoryExists) {
			return {success: false, message: 'Project directory does not exist.'};
		}

		const f1JsonFile = PathWorker.resolve(directory, F1_PROJECT_FILE);
		const f1JsonFileExists = FileSystemWorker.exists(f1JsonFile).ret;
		if (!f1JsonFileExists) {
			return {success: false, message: `Project file[${F1_PROJECT_FILE}] does not exist.`};
		}
		const project = FileSystemWorker.readJSON<F1Project>(f1JsonFile);
		if (project == null) {
			return {success: false, message: `Failed to read project file[${F1_PROJECT_FILE}].`};
		}
		if (isBlank(project.name)) {
			project.name = PathWorker.basename(directory);
		}
		project.directory = directory;
		return {success: true, project};
	}

	public closeOnFailedOpen(window: BrowserWindow) {
		window.close();
	}

	public async loadProject(window: BrowserWindow): Promise<F1ProjectLoaded> {
		const project = WindowManager.project(window);
		if (project == null) {
			return {success: false, message: 'Project settings not found.'};
		}

		const directory = project.directory;
		if (isBlank(directory)) {
			return {success: false, message: `Project folder not defined in settings.`};
		} else if (!FileSystemWorker.exists(directory).ret) {
			return {success: false, message: `Project folder [${directory}] not exists.`};
		}
		// scan direct sub folders
		const {success, ret: folders, message} = FileSystemWorker.dir(directory, {file: false});
		if (!success) {
			return {success, message};
		}
		const folderMap = folders.reduce((map, folder) => {
			map[folder] = true;
			return map;
		}, {} as Record<string, true>);
		// compare folders with settings modules, fix it if needed
		project.modules = (project.modules ?? []).filter(module => folderMap[module.name] === true);
		if (project.modules.length === 0) {
			delete project.modules;
		}
		// save it again
		this.replaceF1ProjectFile(directory, project);
		return {success: true, project};
	}

	public onProjectOpened(project: F1Project) {
		RecentProjectsWorker.addLastProject(project);
	}
}

const INSTANCE = (() => {
	const worker = new ProjectWorker();
	ipcMain.handle(F1ProjectEvent.CREATE, async (_: Electron.IpcMainEvent, settings: F1ProjectSettings): Promise<ReturnType<ProjectWorker['create']>> => {
		return await worker.create(settings);
	});
	ipcMain.on(F1ProjectEvent.OPEN, (event: Electron.IpcMainEvent, project: F1Project): void => {
		worker.open(project, BrowserWindow.fromWebContents(event.sender));
	});
	ipcMain.handle(F1ProjectEvent.TRY_TO_OPEN, async (_: Electron.IpcMainEvent, directory: string): Promise<ReturnType<ProjectWorker['tryToOpen']>> => {
		return await worker.tryToOpen(directory);
	});
	ipcMain.on(F1ProjectEvent.CLOSE_ON_FAILED_OPEN, (event: Electron.IpcMainEvent): void => {
		worker.closeOnFailedOpen(BrowserWindow.fromWebContents(event.sender));
	});
	ipcMain.handle(F1ProjectEvent.ASK, async (event: Electron.IpcMainEvent): Promise<ReturnType<ProjectWorker['loadProject']>> => {
		return await worker.loadProject(BrowserWindow.fromWebContents(event.sender));
	});
	ipcMain.on(F1ProjectEvent.ON_OPENED, (_: Electron.IpcMainEvent, project: F1Project): void => {
		worker.onProjectOpened(project);
	});
	return worker;
})();
export {INSTANCE as ProjectWorker};