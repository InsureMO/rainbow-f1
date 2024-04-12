import dotenv from 'dotenv';
import {
	F1ModuleType,
	F1Project,
	isNotBlank,
	O23ModuleSettings,
	O23ModuleStructure,
	O23SettingItem
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

	protected readO23Commands(structure: Omit<O23ModuleStructure, 'success' | 'message'>, packageJson: NodeJsPackageJson) {
		structure.commands.build = packageJson.scripts?.build;
		structure.commands.buildStandalone = packageJson.scripts?.['build:standalone'];
		structure.commands.start = packageJson.scripts?.start ?? packageJson.scripts?.['dev:start'];
		structure.commands.startStandalone = packageJson.scripts?.['start:standalone'] ?? packageJson.scripts?.['dev:standalone:start'];
		structure.commands.scripts = packageJson.scripts?.scripts;
		structure.commands.test = packageJson.scripts?.test;
	}

	protected findO23EnvFiles(structure: Pick<O23ModuleStructure, 'commands'>, commandNames: Array<'start' | 'startStandalone' | 'scripts'>) {
		return commandNames.map(name => structure.commands[name]).filter(isNotBlank)
			.map(command => {
				const setEnv = command.split(' ')
					.filter(isNotBlank)
					.map(arg => arg.trim())
					.filter(arg => arg.startsWith('CFG_ENV_FILE='));
				return setEnv.length > 0 ? setEnv[setEnv.length - 1] : (void 0);
			})
			.filter(isNotBlank)
			.map(args => args.split('='))
			.map(([, envFiles]) => envFiles.split(','))
			.flat();
	}

	public async read(project: F1Project, module: O23ModuleSettings): Promise<O23ModuleStructure> {
		const structure: Omit<O23ModuleStructure, 'success' | 'message'> = {
			name: module.name, type: F1ModuleType.O23,
			files: [], nodeFiles: [],
			commands: {},
			server: {files: []}, scripts: {files: []}, dbScripts: {files: []},
			envs: {
				server: {
					app: [],
					log: {error: [], combined: [], console: []},
					pipeline: [], datasources: [], endpoints: []
				},
				scripts: {app: [], datasources: []}
			}
		};
		const filesScanned = FileSystemWorker.dir(PathWorker.resolve(project.directory, module.name), {
			file: true, recursive: true
		});
		if (!filesScanned.success) {
			return {success: false, message: filesScanned.message, ...structure};
		}
		// 1. read package.json
		const packageJsonFile = filesScanned.ret.find(file => file === 'package.json');
		if (packageJsonFile == null) {
			return {success: false, message: 'Project file[package.json] not found.', ...structure};
		}
		const packageJson: NodeJsPackageJson = FileSystemWorker.readJSON(packageJsonFile);
		if (packageJson == null) {
			return {success: false, message: 'Failed to read content of package.json.', ...structure};
		}
		// 2. read commands, find build, test, start. o23 has more commands, find build and start standalone commands as well.
		// typically, all following commands are defined for development.
		this.readO23Commands(structure, packageJson);
		// 3. find server path from envs, load recursively, parse each yaml
		// find env files from commands, parse it
		this.findO23EnvFiles(structure, ['start', 'startStandalone']).map(file => {
			this.readEnvsForServer(project, module, file, structure);
		});
		// 4. find scripts path from envs, load recursively, parse each yaml
		// find env files from commands, parse it
		this.findO23EnvFiles(structure, ['scripts']).map(file => {
			this.readEnvsForScripts(project, module, file, structure);
		});
		// 5. find db scripts path from envs, load recursively
		// default value from const of O23, APP_SCRIPTS_DEFAULT_DIR = 'db-scripts'
		const dbScriptsPath = structure.envs.scripts.app
			.find(item => item.name === 'CFG_APP_DB_SCRIPTS_DIR')?.value?.value ?? 'db-scripts';
		const dbScriptsScanned = FileSystemWorker.dir(PathWorker.resolve(project.directory, module.name, dbScriptsPath), {
			dir: false, file: true, recursive: true
		});
		// ignore errors if there is any error occurred during db scripts files scanning
		if (dbScriptsScanned.success) {
			structure.dbScripts.files = (dbScriptsScanned.ret ?? []).map(file => {
				return {name: file, type: this.guessFileType(file)};
			});
		}
		// 6. load src folder, recursively
		// 7. find all configuration file in root folder
		return {success: true, ...structure};
	}

	protected readEnvsForServer(project: F1Project, module: O23ModuleSettings, file: string, structure: Omit<O23ModuleStructure, 'success' | 'message'>) {
		const envs: Record<string, string> = {};
		dotenv.config({processEnv: envs, path: PathWorker.resolve(project.directory, module.name, file)});
		Object.keys(envs).forEach(key => {
			const item: O23SettingItem = {name: key, value: {value: envs[key], path: file}};
			switch (true) {
				case key.startsWith('CFG_LOGGER_ERROR_'):
					structure.envs.server.log.error.push(item);
					break;
				case key.startsWith('CFG_LOGGER_COMBINED_'):
					structure.envs.server.log.combined.push(item);
					break;
				case key.startsWith('CFG_LOGGER_CONSOLE_'):
					structure.envs.server.log.console.push(item);
					break;
				case key.startsWith('CFG_PIPELINE_'):
					structure.envs.server.pipeline.push(item);
					break;
				case key.startsWith('CFG_ENDPOINTS_'):
					structure.envs.server.endpoints.push(item);
					break;
				case key.startsWith('CFG_APP_DATASOURCE_'):
				case key.startsWith('CFG_TYPEORM_'):
					structure.envs.server.datasources.push(item);
					break;
				case key.startsWith('CFG_APP_'):
				default:
					structure.envs.server.app.push(item);
					break;
			}
		});
	}

	protected readEnvsForScripts(project: F1Project, module: O23ModuleSettings, file: string, structure: Omit<O23ModuleStructure, 'success' | 'message'>) {
		const envs: Record<string, string> = {};
		dotenv.config({processEnv: envs, path: PathWorker.resolve(project.directory, module.name, file)});
		Object.keys(envs).forEach(key => {
			const item: O23SettingItem = {name: key, value: {value: envs[key], path: file}};
			switch (true) {
				case key.startsWith('CFG_TYPEORM_'):
					structure.envs.scripts.datasources.push(item);
					break;
				case key.startsWith('CFG_APP_'):
				default:
					structure.envs.scripts.app.push(item);
					break;
			}
		});
	}
}

const reader = new O23ModuleProcessor();
export {reader as O23ModuleProcessor};