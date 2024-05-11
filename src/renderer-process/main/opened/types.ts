import {ReactNode} from 'react';
import {F1ModuleStructure, ModuleCommand, ModuleEnv, ModuleFile} from '../../../shared';

export enum ResourceType {
	MODULE_O23 = 'module-o23',
	MODULE_D9 = 'module-d9',
	MODULE_UNKNOWN = 'module-unknown',
	VIRTUAL_COMMANDS = 'virtual-commands',
	VIRTUAL_ENVS = 'virtual-envs',
	VIRTUAL_SERVER_PIPELINES = 'virtual-server-pipelines',
	VIRTUAL_SCRIPTS_PIPELINES = 'virtual-scripts-pipelines',
	VIRTUAL_DB_SCRIPTS = 'virtual-db-scripts',
	VIRTUAL_SOURCE_FILES = 'virtual-source-files',
	VIRTUAL_NODE_FILES = 'virtual-node-files',
	COMMAND = 'command',
	ENV = 'env',
	ENV_COMMAND = 'env-command',
	O23_SERVER_PIPELINES_DIR = 'o23-server-pipelines-dir',
	O23_SERVER_PIPELINES_FILE = 'o23-server-pipelines-file',
	O23_SCRIPTS_PIPELINES_DIR = 'o23-scripts-pipelines-dir',
	O23_SCRIPTS_PIPELINES_FILE = 'o23-scripts-pipelines-file',
	O23_DB_SCRIPTS_DIR = 'o23-db-scripts-dir',
	O23_DB_SCRIPTS_FILE = 'o23-db-scripts-file',
	SOURCE_FILES_DIR = 'source-files-dir',
	SOURCE_FILES_FILE = 'source-files-file',
	NODE_FILES_DIR = 'node-files-dir',
	NODE_FILES_FILE = 'node-files-file',
}

export interface PresentResourceSegment {
	label: string;
	icon?: ReactNode;
}

export interface Resource {
	marker: string;
	type: ResourceType;
	segments: Array<PresentResourceSegment>;
	renamable?: boolean;
}

export interface ModuleResource extends Resource {
	module: <M extends F1ModuleStructure>() => M;
}

export interface VirtualNodeResource extends ModuleResource {
	type: ResourceType.VIRTUAL_COMMANDS | ResourceType.VIRTUAL_ENVS
		| ResourceType.VIRTUAL_SERVER_PIPELINES | ResourceType.VIRTUAL_SCRIPTS_PIPELINES
		| ResourceType.VIRTUAL_DB_SCRIPTS
		| ResourceType.VIRTUAL_SOURCE_FILES | ResourceType.VIRTUAL_NODE_FILES;
}

export interface ModuleFileResource extends ModuleResource {
	file: ModuleFile;
	absolutePath: () => string;
	/** includes project and module */
	relativePathToRoot: () => string;
	/** include module */
	relativePathToProjectRoot: () => string;
	relativePathToModuleRoot: () => string;
}

export interface ModuleCommandResource extends ModuleFileResource {
	type: ResourceType.COMMAND | ResourceType.ENV_COMMAND;
	// env will be existed when this resource is constructed under an env
	env?: ModuleEnv;
	command: ModuleCommand;
}

export interface ModuleEnvResource extends ModuleFileResource {
	env: ModuleEnv;
}
