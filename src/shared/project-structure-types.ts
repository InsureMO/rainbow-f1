import {F1ModuleType} from './project-types';

export enum ModuleFileType {
	DIRECTORY = 'dir',
	TYPESCRIPT = 'ts',
	JAVASCRIPT = 'js',
	COMMON_JAVASCRIPT = 'cjs',
	ECMA_MODULE_JAVASCRIPT = 'mjs',
	JSON = 'json',
	HTML = 'html',
	CSS = 'css',
	YAML = 'yaml',
	ENV_FILE = 'env.file',
	SQL = 'sql',
	README = 'readme',
	WEBPACK_CONFIG = 'webpack.config',
	VITE_CONFIG = 'vite.config',
	NEST_CONFIG = 'nest.config',
	BABEL_CONFIG = 'babel.config',
	PRETTIER_CONFIG = 'prettier.config',
	TS_CONFIG = 'tsconfig',
	ESLINT_CONFIG = 'eslint.config',
	YARN_LOCK = 'yarn.lock',
	NPM_LOCK = 'package.lock',
	PACKAGE_JSON = 'package.json',

	O23_PIPELINE = 'o23-pipeline',

	/** might not be a file, just a script command in package.json */
	COMMAND = 'command',

	UNKNOWN = 'unknown',
}

/**
 * module file also might be directory, type should be {@code ModuleFileType#UNKNOWN}
 */
export interface ModuleFile {
	basename: string;
	/** absolute path */
	path: string;
	pathRelativeToRoot: string;
	pathRelativeToProjectRoot: string;
	pathRelativeToModuleRoot: string;
	dir: boolean;
	type: ModuleFileType;
}

export interface ModuleCommand extends ModuleFile {
	name: string;
	cli: string;
	args: Record<string, string | undefined>;
	envFiles: Array<string>;
}

export interface ModuleCommands {
	[key: string]: ModuleCommand;
}

/**
 * for now, command matches following rules will be treated as environment command:
 * 1. is "start" or "scripts",
 * 2. ends with ":start", "-start", ":scripts", "-scripts"
 */
export interface ModuleEnv extends ModuleFile {
	name: string;
	commands: Array<ModuleCommand>;
}

export interface F1ModuleStructure {
	name: string;
	type: F1ModuleType;
	/** files in root folder */
	files: Array<ModuleFile>;
	/** module commands, "scripts" in package.json */
	commands: ModuleCommands;
	/** module structure is read successfully or not */
	success: boolean;
	/** error message when failed to read module structure */
	message?: ErrorMessage;
}

export interface F1NodeModuleStructure extends F1ModuleStructure {
	/** files in root folder, which used by Node.js */
	nodeFiles?: Array<ModuleFile>;
	sourceFiles?: Array<ModuleFile>;
}

export interface D9ModuleStructure extends F1NodeModuleStructure {
}

export interface O23Configurations {
	files: Array<ModuleFile>;
}

export interface O23DBScriptsConfigurations extends O23Configurations {
}

export interface O23ScriptsConfigurations extends O23Configurations {
}

export interface O23ServerConfigurations extends O23Configurations {
}

export interface O23SettingItem {
	name: string;
	value?: string;
}

export interface O23ModuleStructure extends F1NodeModuleStructure {
	dbScripts?: O23DBScriptsConfigurations;
	server: O23ServerConfigurations;
	scripts: O23ScriptsConfigurations;
}

export interface UnknownModuleStructure extends F1ModuleStructure {
}

export interface F1ProjectStructure {
	modules: Array<F1ModuleStructure>;
}
