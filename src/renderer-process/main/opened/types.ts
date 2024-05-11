import {ReactNode} from 'react';
import {F1ModuleStructure, ModuleCommand, ModuleEnv, ModuleFile} from '../../../shared';

export enum ResourceType {
	VIRTUAL = 'virtual',
	MODULE_O23 = 'module-o23', MODULE_D9 = 'module-d9', MODULE_UNKNOWN = 'module-unknown',
	COMMAND = 'command', ENV = 'env', ENV_COMMAND = 'env-command',
	O23_SERVER_PIPELINES_DIR = 'o23-server-pipelines-dir', O23_SERVER_PIPELINES_FILE = 'o23-server-pipelines-file',
	O23_SCRIPTS_PIPELINES_DIR = 'o23-scripts-pipelines-dir', O23_SCRIPTS_PIPELINES_FILE = 'o23-scripts-pipelines-file',
	O23_DB_SCRIPTS_DIR = 'o23-db-scripts-dir', O23_DB_SCRIPTS_FILE = 'o23-db-scripts-file',
	SOURCE_FILES_DIR = 'source-files-dir', SOURCE_FILES_FILE = 'source-files-file',
	NODE_FILES_DIR = 'node-files-dir', NODE_FILES_FILE = 'node-files-file',
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
	type: ResourceType.VIRTUAL;
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
