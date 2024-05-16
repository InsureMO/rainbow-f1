import {
	F1ModuleType,
	F1Project,
	FileSystemFoldersResult,
	isBlank,
	isNotBlank,
	ModuleCommand,
	ModuleFile,
	ModuleFileType,
	O23ModuleSettings,
	O23ModuleStructure,
	ScannedFile
} from '../../../shared';
import {FileSystemWorker} from '../file-system';
import {PathWorker} from '../path';
import {AbstractModuleProcessor, ModuleCreated, ModuleEnvValues} from './abstract';

class O23ModuleProcessor extends AbstractModuleProcessor {
	protected computePluginArgs(module: O23ModuleSettings): Array<string> {
		const print = module.dependencies?.['@rainbow-o23/n91'] ? '--plugin-print' : '';
		const s3 = module.dependencies?.['@rainbow-o23/n92'] ? '--plugin-aws-s3' : '';
		const args = [print, s3].filter(isNotBlank);
		if (args.length === 0) {
			args.push('--plugin-free');
		}
		return args;
	}

	public async create(project: F1Project, module: O23ModuleSettings, directory: string): Promise<ModuleCreated> {
		const cliArgs = [
			'--fix-name', '--default-desc', '--package-manager=yarn', '--use-ds-defaults',
			...this.computePluginArgs(module),
			'--ignore-install'
		].filter(isNotBlank);
		if (project.envs?.cli?.yarn?.exists) {
			return this.executeModuleCreateCli(project.envs.cli.yarn.command, ['create', 'rainbow-o23-app', module.name, ...cliArgs], directory, module.name);
		} else if (project.envs?.cli?.npm?.exists) {
			const npx = project.envs.cli.npm.command.replace(/\\npm(\.exe)?/, '\\npx');
			return this.executeModuleCreateCli(npx, ['create-rainbow-o23-app', module.name, ...cliArgs], directory, module.name);
		} else {
			return {
				success: false, ret: false,
				message: 'No package manager available for module creation. Please ensure that at least npm is installed and accessible. Meanwhile, yarn is recommended as an alternative.'
			};
		}
	}

	protected readCommands(projectPath: string, modulePath: string, structure: O23ModuleStructure, packageFile: string, packageJson: NodeJsPackageJson) {
		const file: ModuleFile = {
			basename: PathWorker.basename(packageFile), dir: false, type: ModuleFileType.COMMAND,
			path: packageFile,
			pathRelativeToRoot: packageFile.substring(PathWorker.dirname(projectPath).length + 1),
			pathRelativeToProjectRoot: packageFile.substring(projectPath.length + 1),
			pathRelativeToModuleRoot: packageFile.substring(modulePath.length + 1)
		};
		Object.entries(packageJson.scripts ?? {}).forEach(([key, value]) => {
			if (isBlank(value)) {
				structure.commands[key] = {name: key, cli: value, args: {}, envFiles: [], ...file};
			} else {
				const parts = value.split(' ').filter(isNotBlank);
				structure.commands[key] = {
					name: key, cli: value,
					args: parts.reduce((args, arg) => {
						const [key, value] = arg.split('=', 2);
						args[key] = value;
						return args;
					}, {} as ModuleCommand['args']),
					envFiles: (() => {
						const envs = parts.filter(arg => arg.startsWith('CFG_ENV_FILE='))?.[0];
						if (envs != null) {
							return envs.split('=', 2)[1].split(',').map(file => file.trim());
						} else {
							return [];
						}
					})(),
					...file
				};
			}
		});
	}

	public async read(project: F1Project, module: O23ModuleSettings): Promise<O23ModuleStructure> {
		const structure: O23ModuleStructure = {
			name: module.name, type: F1ModuleType.O23,
			files: [], nodeFiles: [], sourceFiles: [],
			commands: {},
			server: {files: []}, scripts: {files: []}, dbScripts: {files: []},
			success: false
		};
		const projectPath = project.directory;
		const modulePath = PathWorker.resolve(projectPath, module.name);
		const filesScanned = FileSystemWorker.dir(modulePath, {recursive: true, relative: false});
		if (!filesScanned.success) {
			return {success: false, message: filesScanned.message, ...structure};
		}
		// read package.json
		const packageFile = PathWorker.resolve(modulePath, 'package.json');
		const packageJsonFile = filesScanned.ret.find(({path}) => path === packageFile);
		if (packageJsonFile == null) {
			return {success: false, message: 'Project file[package.json] not found.', ...structure};
		}
		const packageJson: NodeJsPackageJson = FileSystemWorker.readJSON(packageFile);
		if (packageJson == null) {
			return {success: false, message: 'Failed to read content of package.json.', ...structure};
		}
		// read commands, find build, test, start. o23 has more commands, find build and start standalone commands as well.
		// typically, all following commands are defined for development.
		this.readCommands(projectPath, modulePath, structure, packageFile, packageJson);
		const envValues = this.readEnvFiles(modulePath, structure);
		// find server pipeline files according to env
		this.readServerPipelineFiles(projectPath, modulePath, envValues, structure);
		// find scripts pipeline and db scripts files according to env
		this.readScriptsPipelineFiles(projectPath, modulePath, envValues, structure);
		// load source files
		this.readSourceFiles(projectPath, modulePath, structure, filesScanned, (() => {
			const sourcePath = PathWorker.resolve(modulePath, 'src');
			const prefix = `${sourcePath}${PathWorker.separator()}`;
			return (file: ScannedFile) => file.path.startsWith(prefix);
		})());
		// load node files
		this.readNodeFiles(projectPath, modulePath, structure, filesScanned, (() => {
			const prefix = `${modulePath}${PathWorker.separator()}`;
			const prefixLength = prefix.length;
			return (file: ScannedFile) => {
				return !file.dir && file.path.substring(prefixLength).indexOf(PathWorker.separator()) === -1;
			};
		})());
		// all files
		this.readAllFiles(projectPath, modulePath, structure, filesScanned);

		structure.success = true;
		return structure;
	}

	protected readAllFiles(projectPath: string, modulePath: string, structure: O23ModuleStructure, filesScanned: FileSystemFoldersResult) {
		structure.files = filesScanned.ret.map(({path, dir}) => {
			return {
				basename: PathWorker.basename(path), dir,
				path,
				pathRelativeToRoot: path.substring(PathWorker.dirname(projectPath).length + 1),
				pathRelativeToProjectRoot: path.substring(projectPath.length + 1),
				pathRelativeToModuleRoot: path.substring(modulePath.length + 1),
				type: dir ? ModuleFileType.DIRECTORY : this.guessFileType(path)
			};
		});
	}

	protected readNodeFiles(projectPath: string, modulePath: string, structure: O23ModuleStructure, filesScanned: FileSystemFoldersResult, accept: (file: ScannedFile) => boolean) {
		structure.nodeFiles = filesScanned.ret
			.filter(accept)
			.map(({path, dir}) => {
				return {
					basename: PathWorker.basename(path), dir,
					path,
					pathRelativeToRoot: path.substring(PathWorker.dirname(projectPath).length + 1),
					pathRelativeToProjectRoot: path.substring(projectPath.length + 1),
					pathRelativeToModuleRoot: path.substring(modulePath.length + 1),
					type: dir ? ModuleFileType.DIRECTORY : this.guessFileType(path)
				};
			});
	}

	protected readSourceFiles(projectPath: string, modulePath: string, structure: O23ModuleStructure, filesScanned: FileSystemFoldersResult, accept: (file: ScannedFile) => boolean) {
		structure.sourceFiles = filesScanned.ret
			.filter(accept)
			.map(({path, dir}) => {
				return {
					basename: PathWorker.basename(path), dir,
					path,
					pathRelativeToRoot: path.substring(PathWorker.dirname(projectPath).length + 1),
					pathRelativeToProjectRoot: path.substring(projectPath.length + 1),
					pathRelativeToModuleRoot: path.substring(modulePath.length + 1),
					type: dir ? ModuleFileType.DIRECTORY : this.guessFileType(path)
				};
			});
	}

	protected scanFiles(projectPath: string, modulePath: string, directories: Array<string>): Array<ModuleFile> {
		return directories.map(directory => {
			const scanned = FileSystemWorker.dir(PathWorker.resolve(modulePath, directory), {
				recursive: true, relative: false
			});
			if (scanned.success) {
				return (scanned.ret ?? []).map(({path, dir}) => {
					return {
						basename: PathWorker.basename(path), dir,
						path,
						pathRelativeToRoot: path.substring(PathWorker.dirname(projectPath).length + 1),
						pathRelativeToProjectRoot: path.substring(projectPath.length + 1),
						pathRelativeToModuleRoot: path.substring(modulePath.length + 1),
						type: dir ? ModuleFileType.DIRECTORY : this.guessFileType(path)
					};
				});
			} else {
				// ignore errors if there is any error occurred during server pipelines files scanning
				return [];
			}
		}).flat();
	}

	protected readServerPipelineFiles(projectPath: string, modulePath: string, envValues: ModuleEnvValues, structure: Omit<O23ModuleStructure, 'success' | 'message'>) {
		// find server env files, command should be one of "start", "*:start" or "*-start"
		const envFiles = Object.values(structure.commands)
			.filter(({name}) => name === 'start' || name.endsWith(':start') || name.endsWith('-start'))
			.map(({envFiles}) => envFiles)
			.flat();
		const directories = Array.from(new Set(Array.from(new Set(envFiles)).map(envFile => {
			const found = (envValues[envFile] ?? []).find(({name}) => name === 'CFG_APP_INIT_PIPELINES_DIR');
			return (found?.value ?? 'server').trim();
		})));
		structure.server.files = [
			...directories.map(directory => {
				const path = PathWorker.resolve(modulePath, directory);
				return {
					basename: PathWorker.basename(directory),
					path,
					pathRelativeToRoot: path.substring(PathWorker.dirname(projectPath).length + 1),
					pathRelativeToProjectRoot: path.substring(projectPath.length + 1),
					pathRelativeToModuleRoot: path.substring(modulePath.length + 1),
					dir: true, type: ModuleFileType.DIRECTORY
				};
			}),
			...this.scanFiles(projectPath, modulePath, directories).map(file => {
				if (file.type === ModuleFileType.YAML) {
					file.type = ModuleFileType.O23_PIPELINE;
				}
				return file;
			})];
	}

	protected readScriptsPipelineFiles(projectPath: string, modulePath: string, envValues: ModuleEnvValues, structure: Omit<O23ModuleStructure, 'success' | 'message'>) {
		// find server env files, command should be one of "scripts", "*:scripts" or "*-scripts"
		const envFiles = Object.values(structure.commands)
			.filter(({name}) => name === 'scripts' || name.endsWith(':scripts') || name.endsWith('-scripts'))
			.map(({envFiles}) => envFiles)
			.flat();
		const directories = Array.from(new Set(Array.from(new Set(envFiles)).map(envFile => {
			const found = (envValues[envFile] ?? []).find(({name}) => name === 'CFG_APP_INIT_PIPELINES_DIR');
			return (found?.value ?? 'scripts').trim();
		})));
		structure.scripts.files = [
			...directories.map(directory => {
				const path = PathWorker.resolve(modulePath, directory);
				return {
					basename: PathWorker.basename(directory),
					path,
					pathRelativeToRoot: path.substring(PathWorker.dirname(projectPath).length + 1),
					pathRelativeToProjectRoot: path.substring(projectPath.length + 1),
					pathRelativeToModuleRoot: path.substring(modulePath.length + 1),
					dir: true, type: ModuleFileType.DIRECTORY
				};
			}),
			...this.scanFiles(projectPath, modulePath, directories).map(file => {
				if (file.type === ModuleFileType.YAML) {
					file.type = ModuleFileType.O23_PIPELINE;
				}
				return file;
			})
		];
		const dbScriptsDirectories = Array.from(new Set(Array.from(new Set(envFiles)).map(envFile => {
			const found = (envValues[envFile] ?? []).find(({name}) => name === 'CFG_APP_DB_SCRIPTS_DIR');
			return (found?.value ?? 'db-scripts').trim();
		})));
		structure.dbScripts.files = [
			...dbScriptsDirectories.map(directory => {
				const path = PathWorker.resolve(modulePath, directory);
				return {
					basename: PathWorker.basename(directory),
					path,
					pathRelativeToRoot: path.substring(PathWorker.dirname(projectPath).length + 1),
					pathRelativeToProjectRoot: path.substring(projectPath.length + 1),
					pathRelativeToModuleRoot: path.substring(modulePath.length + 1),
					dir: true, type: ModuleFileType.DIRECTORY
				};
			}),
			...this.scanFiles(projectPath, modulePath, dbScriptsDirectories)
		];
	}
}

const reader = new O23ModuleProcessor();
export {reader as O23ModuleProcessor};