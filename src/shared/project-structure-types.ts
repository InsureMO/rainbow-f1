import {F1ModuleType} from './project-types';

export interface ModuleCommands {
	build?: string;
	test?: string;
	start?: string;
}

export interface ModuleFile {
	name: string;
	type: ModuleFileType;
}

export interface ModuleFolder {
	/** relative to parent */
	directory: string;
	folders: Array<ModuleFolder>;
	files: Array<ModuleFile>;
}

export interface F1ModuleStructure<Commands extends ModuleCommands = ModuleCommands> {
	name: string;
	type: F1ModuleType;
	/** folders in root folder */
	folders: Array<ModuleFolder>;
	/** files in root folder */
	files: Array<ModuleFile>;
	commands?: Commands;
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
	BABEL_CONFIG = 'babel.config',
	TS_CONFIG = 'tsconfig',
	ESLINT_CONFIG = 'eslint.config',
	YARN_LOCK = 'yarn.lock',
	NPM_LOCK = 'package-lock',
	PACKAGE_JSON = 'package.json',

	O23_PIPELINE = 'o23-pipeline',
}

export interface D9ModuleCommands extends ModuleCommands {
}

export interface D9ModuleStructure extends F1ModuleStructure<D9ModuleCommands> {
}

export interface O23Configurations extends Omit<ModuleFolder, 'directory'> {
	directory?: string;
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

export type O23EnvAppSettings = Array<O23SettingItem>;

export interface O23EnvLogSettings {
	error?: Array<O23SettingItem>;
	combine?: Array<O23SettingItem>;
	console?: Array<O23SettingItem>;
}

export interface O23DatasourceSettings {
	[key: string]: Array<O23SettingItem>;
}

export interface O23ServerSettings {
	app: O23EnvAppSettings;
	log: O23EnvLogSettings;
	datasources: Array<O23DatasourceSettings>;
}

export interface O23ScriptsSettings {
	datasources: O23DatasourceSettings;
}

export interface O23EnvConfigurations {
	server: O23ServerSettings;
	scripts: O23ScriptsSettings;
}

export interface O23ModuleCommands extends ModuleCommands {
	buildStandalone?: string;
	starStandalone?: string;
}

export interface O23ModuleStructure extends F1ModuleStructure<O23ModuleCommands> {
	dbScripts?: ModuleFolder;
	server: O23ServerConfigurations;
	scripts: O23ScriptsConfigurations;
	envs: O23EnvConfigurations;
}

export interface UnknownModuleStructure extends F1ModuleStructure {
}

export interface F1ProjectStructure {
	modules: Array<F1ModuleStructure>;
}
