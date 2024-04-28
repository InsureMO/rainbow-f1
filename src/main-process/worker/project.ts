import {BrowserWindow, ipcMain} from 'electron';
import {
	D9ModuleSettings,
	F1_PROJECT_FILE,
	F1_PROJECT_WORKSPACE_FILE,
	F1ModuleSettings,
	F1ModuleType,
	F1Project,
	F1ProjectCreated,
	F1ProjectEnvs,
	F1ProjectEvent,
	F1ProjectExisted,
	F1ProjectLoaded,
	F1ProjectSettings,
	F1ProjectStructure,
	F1ProjectStructureLoaded,
	isBlank,
	isNodeVersionValid,
	isNotBlank,
	isNpmVersionValid,
	MIN_NODE_VERSION,
	MIN_NPM_VERSION,
	O23ModuleSettings,
	ProjectCli,
	ProjectCliSet,
	UnknownModuleSettings
} from '../../shared';
import {createMainWindow, WindowManager, WindowType} from '../window';
import {FileSystemWorker} from './file-system';
import {D9ModuleProcessor, O23ModuleProcessor, UnknownModuleProcessor} from './module';
import {PathWorker} from './path';
import {ProjectCliWorker} from './project-cli';
import {RecentProjectsWorker} from './recent-projects';

class ProjectWorker {
	/**
	 * returns given node or create one if not given
	 */
	protected async checkCliNode(node?: ProjectCli): Promise<MightBeError<ProjectCli>> {
		node = node == null ? {} : node;
		if (isBlank(node.command)) {
			return [node, 'Please select the node command.'];
		}
		const version = await ProjectCliWorker.detectNodeVersion(node.command);
		if (version == null) {
			return [node, 'Invalid executive file for node, no version information detected.'];
		} else if (!isNodeVersionValid(version)) {
			return [node, `Invalid executive file for node, please use a version above ${MIN_NODE_VERSION}.`];
		}
		node.version = version;
		node.exists = true;

		return [node];
	}

	/**
	 * returns given npm or create one if not given
	 */
	protected async checkCliNpm(npm?: ProjectCli): Promise<MightBeError<ProjectCli>> {
		npm = npm == null ? {} : npm;
		if (isBlank(npm.command)) {
			return [npm, 'Please select the node command.'];
		}
		const version = await ProjectCliWorker.detectNpmVersion(npm.command);
		if (version == null) {
			return [npm, 'Invalid executive file for npm, no version information detected.'];
		} else if (!isNpmVersionValid(version)) {
			return [npm, `Invalid executive file for npm, please use a version above ${MIN_NPM_VERSION}.`];
		}
		npm.version = version;
		npm.exists = true;

		return [npm];
	}

	/**
	 * returns given yarn or create one if not given
	 */
	protected async checkCliYarn(yarn?: ProjectCli): Promise<ProjectCli> {
		yarn = yarn == null ? {} : yarn;
		if (isBlank(yarn.command)) {
			yarn.exists = false;
		} else {
			const version = await ProjectCliWorker.detectYarnVersion(yarn.command);
			if (version == null) {
				delete yarn.version;
				yarn.exists = false;
			} else {
				yarn.version = version;
				yarn.exists = true;
			}
		}
		return yarn;
	}

	/**
	 * returns given volta or create one if not given
	 */
	protected async checkCliVolta(volta?: ProjectCli): Promise<ProjectCli> {
		volta = volta == null ? {} : volta;
		if (isBlank(volta.command)) {
			volta.exists = false;
		} else {
			const version = await ProjectCliWorker.detectVoltaVersion(volta.command);
			if (version == null) {
				delete volta.version;
				volta.exists = false;
			} else {
				volta.version = version;
				volta.exists = true;
			}
		}
		return volta;
	}

	/**
	 * returns given envs or create one if not given
	 */
	protected async checkCli(envs?: F1ProjectEnvs): Promise<MightBeError<F1ProjectEnvs>> {
		envs = envs == null ? {} : envs;
		envs.cli = envs.cli == null ? {} : envs.cli;
		const [node, nodeMessage] = await this.checkCliNode(envs.cli.node);
		if (nodeMessage != null) {
			return [envs, nodeMessage];
		}
		envs.cli.node = node;
		const [npm, npmMessage] = await this.checkCliNpm(envs.cli.npm);
		if (npmMessage != null) {
			return [envs, npmMessage];
		}
		envs.cli.npm = npm;
		envs.cli.yarn = await this.checkCliYarn(envs.cli.yarn);
		envs.cli.volta = await this.checkCliVolta(envs.cli.volta);

		return [envs];
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
		const {name, directory, modules = []} = project;
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
			// directory not exists, will create it later. pass the check.
		} else if (!FileSystemWorker.empty(directory)) {
			return {success: false, project, message: 'Project directory is not empty.'};
		}
		// check volta, node, npm, yarn versions
		const [envs, cliMessage] = await this.checkCli(project.envs);
		if (cliMessage != null) {
			return {success: false, project, message: cliMessage};
		}
		project.envs = envs;

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

		// create modules
		for (let module of modules) {
			let created;
			switch (module.type) {
				case F1ModuleType.D9:
					created = await D9ModuleProcessor.create(project, module as D9ModuleSettings, directory);
					break;
				case F1ModuleType.O23:
					created = await O23ModuleProcessor.create(project, module as O23ModuleSettings, directory);
					break;
				default:
					created = await UnknownModuleProcessor.create(module, directory);
					break;
			}
			if (!created.success || !created.ret) {
				return {success: false, project, message: created.message};
			}
		}
		// create f1 json
		this.createF1ProjectFile(directory, project);
		// create workspace json
		this.createF1ProjectWorkspaceFile(directory, project);

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
			return {success: false, message: 'Project directory cannot be blank.', exists: false, broken: true};
		}

		const directoryExists = FileSystemWorker.exists(directory).ret;
		if (!directoryExists) {
			return {success: false, message: 'Project directory does not exist.', exists: false, broken: true};
		}

		const f1JsonFile = PathWorker.resolve(directory, F1_PROJECT_FILE);
		const f1JsonFileExists = FileSystemWorker.exists(f1JsonFile).ret;
		if (!f1JsonFileExists) {
			return {
				success: false,
				message: `Project file[${F1_PROJECT_FILE}] does not exist.`,
				exists: true,
				broken: true
			};
		}
		const project = FileSystemWorker.readJSON<F1Project>(f1JsonFile);
		if (project == null) {
			return {
				success: false,
				message: `Failed to read project file[${F1_PROJECT_FILE}].`,
				exists: true,
				broken: true
			};
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

	protected detectModuleType(packageJson: NodeJsPackageJson) {
		return [
			...Object.keys(packageJson.dependencies ?? {}),
			...Object.keys(packageJson.devDependencies ?? {})
		].reduce((detected, keys) => {
			if (!detected[F1ModuleType.D9] && keys.startsWith('@rainbow-d9/')) {
				detected[F1ModuleType.D9] = true;
			}
			if (!detected[F1ModuleType.O23] && keys.startsWith('@rainbow-o23/')) {
				detected[F1ModuleType.O23] = true;
			}
			return detected;
		}, {[F1ModuleType.D9]: false, [F1ModuleType.O23]: false});
	}

	/**
	 * given main window is opened, now load the attached project
	 */
	public async loadAttached(window: BrowserWindow): Promise<F1ProjectLoaded> {
		const project = WindowManager.project(window);
		if (project == null) {
			return {success: false, message: 'Project attached in this window not found.'};
		}

		const directory = project.directory;
		if (isBlank(directory)) {
			return {success: false, message: `Project folder not defined in settings.`};
		} else if (!FileSystemWorker.exists(directory).ret) {
			return {success: false, message: `Project folder [${directory}] not exists.`};
		}
		// scan direct sub folders only
		const {success, ret: folders, message} = FileSystemWorker.dir(directory, {file: false});
		if (!success) {
			return {success, message};
		}
		const folderMap: Record<string, boolean> = folders.reduce((map, {path: folder}) => {
			map[folder] = true;
			return map;
		}, {} as Record<string, true>);
		// compare folders with settings modules, remove those not exists
		project.modules = (project.modules ?? []).filter(module => {
			if (folderMap[module.name] === true) {
				folderMap[module.name] = false;
				return true;
			} else {
				return false;
			}
		});
		// compare folders with existing, add not exists and detect module type
		Object.keys(folderMap)
			.filter(folder => folderMap[folder] === true)
			.forEach(folder => {
				const module: F1ModuleSettings = {name: folder, type: F1ModuleType.UNKNOWN, dependencies: {}};
				// assume it is nodejs module
				const packageJsonFile = PathWorker.resolve(directory, folder, 'package.json');
				const packageJson: NodeJsPackageJson = FileSystemWorker.readJSON(packageJsonFile);
				if (packageJson != null) {
					const detected = this.detectModuleType(packageJson);
					if (detected[F1ModuleType.O23]) {
						module.type = F1ModuleType.O23;
					} else if (detected[F1ModuleType.D9]) {
						module.type = F1ModuleType.D9;
					}
					// otherwise keep unknown, do nothing
				}
				project.modules.push(module);
			});
		// save it again
		this.replaceF1ProjectFile(directory, project);

		// read module structure

		return {success: true, project};
	}

	public onProjectOpened(project: F1Project) {
		RecentProjectsWorker.addLastProject(project);
	}

	public async loadAttachedStructure(window: BrowserWindow): Promise<F1ProjectStructureLoaded> {
		const {success, project, message} = await this.loadAttached(window);
		if (!success) {
			return {success: false, message};
		}

		const structure: F1ProjectStructure = {
			// for each module, read its structure
			modules: await Promise.all((project.modules ?? []).map(module => {
				switch (module.type) {
					case F1ModuleType.D9:
						return D9ModuleProcessor.read(project, module as D9ModuleSettings);
					case F1ModuleType.O23:
						return O23ModuleProcessor.read(project, module as O23ModuleSettings);
					case F1ModuleType.UNKNOWN:
					default:
						return UnknownModuleProcessor.read(project, module as UnknownModuleSettings);
				}
			}))
		};
		return {success: true, project: structure};
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
	ipcMain.handle(F1ProjectEvent.LOAD_ATTACHED, async (event: Electron.IpcMainEvent): Promise<ReturnType<ProjectWorker['loadAttached']>> => {
		return await worker.loadAttached(BrowserWindow.fromWebContents(event.sender));
	});
	ipcMain.on(F1ProjectEvent.ON_OPENED, (_: Electron.IpcMainEvent, project: F1Project): void => {
		worker.onProjectOpened(project);
	});
	ipcMain.handle(F1ProjectEvent.LOAD_ATTACHED_STRUCTURE, async (event: Electron.IpcMainEvent): Promise<ReturnType<ProjectWorker['loadAttachedStructure']>> => {
		return await worker.loadAttachedStructure(BrowserWindow.fromWebContents(event.sender));
	});
	return worker;
})();
export {INSTANCE as ProjectWorker};
