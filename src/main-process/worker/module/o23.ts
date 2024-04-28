import dotenv from 'dotenv';
import {
	F1ModuleType,
	F1Project,
	isBlank,
	isNotBlank,
	ModuleCommand,
	ModuleFile,
	ModuleFileType,
	O23EnvConfigurationFile,
	O23ModuleSettings,
	O23ModuleStructure
} from '../../../shared';
import {FileSystemWorker} from '../file-system';
import {PathWorker} from '../path';
import {AbstractModuleProcessor, ModuleCreated} from './abstract';

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

	protected readCommands(structure: O23ModuleStructure, packageJson: NodeJsPackageJson) {
		console.log(packageJson.scripts);
		Object.entries(packageJson.scripts ?? {}).forEach(([key, value]) => {
			console.log(key, value);
			if (isBlank(value)) {
				structure.commands[key] = {name: key, cli: value, args: {}, envFiles: []};
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
					})()
				};
			}
		});
	}

	protected readEnvFiles(project: F1Project, module: O23ModuleSettings, structure: O23ModuleStructure) {
		// key is env file, value is items
		// const loaded: Record<string, Mo> = {};
		const allEnvFiles = Object.values(structure.commands).map(({envFiles}) => envFiles ?? []).flat();
		structure.envs = Array.from(new Set(allEnvFiles)).map<O23EnvConfigurationFile>(file => {
			const envs: Record<string, string> = {};
			dotenv.config({processEnv: envs, path: PathWorker.resolve(project.directory, module.name, file)});
			return {
				basename: PathWorker.basename(file),
				path: file,
				type: ModuleFileType.ENV,
				items: Object.entries(envs)
					.map(([key, value]) => ({name: key, value}))
			};
		}).reduce((envs, file) => {
			envs[file.path] = file;
			return envs;
		}, {} as O23ModuleStructure['envs']);
	}

	public async read(project: F1Project, module: O23ModuleSettings): Promise<O23ModuleStructure> {
		const structure: O23ModuleStructure = {
			name: module.name, type: F1ModuleType.O23,
			files: [], nodeFiles: [], sourceFiles: [],
			commands: {},
			server: {files: []}, scripts: {files: []}, dbScripts: {files: []},
			envs: {},
			success: false
		};
		const filesScanned = FileSystemWorker.dir(PathWorker.resolve(project.directory, module.name), {
			file: true, recursive: true
		});
		if (!filesScanned.success) {
			return {success: false, message: filesScanned.message, ...structure};
		}
		// read package.json
		const packageJsonFile = filesScanned.ret.find(file => file === 'package.json');
		if (packageJsonFile == null) {
			return {success: false, message: 'Project file[package.json] not found.', ...structure};
		}
		const packageJson: NodeJsPackageJson = FileSystemWorker.readJSON(PathWorker.resolve(project.directory, module.name, 'package.json'));
		if (packageJson == null) {
			return {success: false, message: 'Failed to read content of package.json.', ...structure};
		}
		// read commands, find build, test, start. o23 has more commands, find build and start standalone commands as well.
		// typically, all following commands are defined for development.
		this.readCommands(structure, packageJson);
		this.readEnvFiles(project, module, structure);
		// find server pipeline files according to env
		this.readServerPipelineFiles(project, module, structure);
		// find scripts pipeline and db scripts files according to env
		this.readScriptsPipelineFiles(project, module, structure);
		// find db scripts path from envs, load recursively
		// default value from const of O23, APP_SCRIPTS_DEFAULT_DIR = 'db-scripts'
		// load src folder, recursively
		const srcFiles = filesScanned.ret.filter(file => file.startsWith(`src${PathWorker.separator()}`));
		structure.sourceFiles = srcFiles.map(file => {
			return {basename: PathWorker.basename(file), path: file, type: this.guessFileType(file)};
		});
		// all files
		structure.files = filesScanned.ret.map(file => {
			return {basename: PathWorker.basename(file), path: file, type: this.guessFileType(file)};
		});

		structure.success = true;
		return structure;
	}

	protected scanFiles(project: F1Project, module: O23ModuleSettings, directories: Array<string>): Array<ModuleFile> {
		return Array.from(new Set(directories)).map(directory => {
			const scanned = FileSystemWorker.dir(PathWorker.resolve(project.directory, module.name, directory), {
				dir: false, file: true, recursive: true
			});
			if (scanned.success) {
				return (scanned.ret ?? []).map(file => {
					return {basename: PathWorker.basename(file), path: file, type: this.guessFileType(file)};
				});
			} else {
				// ignore errors if there is any error occurred during server pipelines files scanning
				return [];
			}
		}).flat();
	}

	protected readServerPipelineFiles(project: F1Project, module: O23ModuleSettings, structure: Omit<O23ModuleStructure, 'success' | 'message'>) {
		// find server env files, command should be one of "start", "*:start" or "*-start"
		const envFiles = Object.values(structure.commands)
			.filter(({name}) => name === 'start' || name.endsWith(':start') || name.endsWith('-start'))
			.map(({envFiles}) => envFiles)
			.flat();
		const directories = Array.from(new Set(envFiles)).map(envFile => {
			const {items} = structure.envs[envFile] ?? {};
			const found = items?.find(({name}) => name === 'CFG_APP_INIT_PIPELINES_DIR');
			return (found?.value ?? 'server').trim();
		});
		structure.server.files = this.scanFiles(project, module, directories);
	}

	protected readScriptsPipelineFiles(project: F1Project, module: O23ModuleSettings, structure: Omit<O23ModuleStructure, 'success' | 'message'>) {
		// find server env files, command should be one of "scripts", "*:scripts" or "*-scripts"
		const envFiles = Object.values(structure.commands)
			.filter(({name}) => name === 'scripts' || name.endsWith(':scripts') || name.endsWith('-scripts'))
			.map(({envFiles}) => envFiles)
			.flat();
		const directories = Array.from(new Set(envFiles)).map(envFile => {
			const {items} = structure.envs[envFile] ?? {};
			const found = items?.find(({name}) => name === 'CFG_APP_INIT_PIPELINES_DIR');
			return (found?.value ?? 'scripts').trim();
		});
		structure.scripts.files = this.scanFiles(project, module, directories);
		const dbScriptsDirectories = Array.from(new Set(envFiles)).map(envFile => {
			const {items} = structure.envs[envFile] ?? {};
			const found = items?.find(({name}) => name === 'CFG_APP_DB_SCRIPTS_DIR');
			return (found?.value ?? 'db-scripts').trim();
		});
		structure.dbScripts.files = this.scanFiles(project, module, dbScriptsDirectories);
	}
}

const reader = new O23ModuleProcessor();
export {reader as O23ModuleProcessor};