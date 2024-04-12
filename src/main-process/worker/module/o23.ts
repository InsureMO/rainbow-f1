import {F1ModuleType, F1Project, isNotBlank, O23ModuleSettings, O23ModuleStructure} from '../../../shared';
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
			folders: [], files: [],
			nodeFolders: [], nodeFiles: [],
			commands: {},
			server: {folders: [], files: []}, scripts: {folders: [], files: []}, dbScripts: {folders: [], files: []},
			envs: {
				server: {app: [], log: {}, datasources: []},
				scripts: {datasource: {}}
			}
		};
		const {
			success, ret: files, message
		} = FileSystemWorker.dir(PathWorker.resolve(project.directory, module.name), {file: true, recursive: true});
		if (!success) {
			return {success: false, message, ...structure};
		}
		// 1. read package.json
		const packageJsonFile = files.find(file => file === 'package.json');
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
		const serverEnvFiles = this.findO23EnvFiles(structure, ['start', 'startStandalone']);
		// 4. find scripts path from envs, load recursively, parse each yaml
		// find env files from commands, parse it
		const scriptsEnvFiles = this.findO23EnvFiles(structure, ['scripts']);
		// 5. find db scripts path from envs, load recursively
		// 6. load src folder, recursively
		// 7. find all configuration file in root folder
		return {success: true, ...structure};
	}
}

const reader = new O23ModuleProcessor();
export {reader as O23ModuleProcessor};