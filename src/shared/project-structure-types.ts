import {F1ModuleType} from './project-types';

export interface ModuleCommands {
	build?: string;
	test?: string;
	start?: string;
}

export enum ModuleFileType {
	TS = 'ts',
	JS = 'js',
	JSON = 'json',
	HTML = 'html',
	CSS = 'css',
	YAML = 'yaml',
	ENV = 'env',
	SQL = 'sql',
	README = 'readme',
	WEBPACK_CONFIG = 'webpack.config',
	VITE_CONFIG = 'vite.config',
	NEST_CONFIG = 'nest.config',
	BABEL_CONFIG = 'babel.config',
	TS_CONFIG = 'tsconfig',
	ESLINT_CONFIG = 'eslint.config',
	YARN_LOCK = 'yarn.lock',
	NPM_LOCK = 'package-lock',
	PACKAGE_JSON = 'package.json',

	O23_PIPELINE = 'o23-pipeline',

	UNKNOWN = 'unknown',
}

/**
 * module file also might be directory, type should be {@code ModuleFileType#UNKNOWN}
 */
export interface ModuleFile {
	name: string;
	type: ModuleFileType;
}

export interface F1ModuleStructure<Commands extends ModuleCommands = ModuleCommands> {
	name: string;
	type: F1ModuleType;
	/** files in root folder */
	files: Array<ModuleFile>;
	/** concerned module commands */
	commands?: Commands;
	/** module structure is read successfully or not */
	success: boolean;
	/** error message when failed to read module structure */
	message?: ErrorMessage;
}

export interface F1NodeModuleStructure<Commands extends ModuleCommands = ModuleCommands> extends F1ModuleStructure<Commands> {
	/** files in root folder, which used by Node.js */
	nodeFiles?: Array<ModuleFile>;
	sourceFiles?: Array<ModuleFile>;
}

export interface D9ModuleCommands extends ModuleCommands {
}

export interface D9ModuleStructure extends F1NodeModuleStructure<D9ModuleCommands> {
}

export interface O23Configurations {
	directory?: string;
	files: Array<ModuleFile>;
}

export interface O23DBScriptsConfigurations extends O23Configurations {
}

export interface O23ScriptsConfigurations extends O23Configurations {
}

export interface O23ServerConfigurations extends O23Configurations {
}

export interface O23SettingValue {
	value?: string;
	/** file path to root */
	path?: string;
}

export interface O23SettingItem {
	name: string;
	value?: O23SettingValue;
}

export interface O23EnvLogSettings {
	error?: Array<O23SettingItem>;
	combined?: Array<O23SettingItem>;
	console?: Array<O23SettingItem>;
}

export interface O23ServerSettings {
	app: Array<O23SettingItem>;
	log: O23EnvLogSettings;
	pipeline: Array<O23SettingItem>;
	datasources: Array<O23SettingItem>;
	endpoints: Array<O23SettingItem>;
}

export interface O23ScriptsSettings {
	app: Array<O23SettingItem>;
	/**
	 * only one datasource is allowed for scripts, but there might be multiple datasources from envs because of some mistakes.
	 */
	datasources: Array<O23SettingItem>;
}

export interface O23EnvConfigurations {
	server: O23ServerSettings;
	scripts: O23ScriptsSettings;
}

export interface O23ModuleCommands extends ModuleCommands {
	scripts?: string;
	buildStandalone?: string;
	startStandalone?: string;
}

export interface O23ModuleStructure extends F1NodeModuleStructure<O23ModuleCommands> {
	dbScripts?: O23DBScriptsConfigurations;
	server: O23ServerConfigurations;
	scripts: O23ScriptsConfigurations;
	envs: O23EnvConfigurations;
}

export interface UnknownModuleStructure extends F1ModuleStructure {
}

export interface F1ProjectStructure {
	modules: Array<F1ModuleStructure>;
}
