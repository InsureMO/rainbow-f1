import {TreeNodeDef} from '@rainbow-d9/n2';
import {
	F1ModuleStructure,
	F1Project,
	F1ProjectStructure,
	ModuleCommand,
	ModuleEnv,
	ModuleFile,
	O23ModuleStructure
} from '../../../shared';

export interface ProjectRoot {
	project: F1Project;
	structure: F1ProjectStructure;
}

export enum ProjectTreeNodeType {
	ROOT = 'root',
	ADD_MODULE = 'add-module',
	MODULE = 'module',
	MODULE_COMMANDS = 'module-commands',
	MODULE_COMMAND = 'module-command',
	MODULE_ENVS = 'module-envs',
	MODULE_ENV = 'module-env',
	MODULE_ENV_COMMAND = 'module-env-command',
	MODULE_O23_SERVER_PIPELINES = 'module-o23-pipelines-server',
	MODULE_O23_SERVER_PIPELINE_DIR = 'module-o23-pipelines-server-dir',
	MODULE_O23_SERVER_PIPELINE_FILE = 'module-o23-pipelines-server-file',
	MODULE_O23_SCRIPTS_PIPELINES = 'module-scripts',
	MODULE_O23_SCRIPTS_PIPELINE_DIR = 'module-o23-pipelines-scripts-dir',
	MODULE_O23_SCRIPTS_PIPELINE_FILE = 'module-o23-pipelines-scripts-file',
	MODULE_DB_SCRIPTS = 'module-db-scripts',
	MODULE_DB_SCRIPTS_DIR = 'module-db-scripts-dir',
	MODULE_DB_SCRIPTS_FILE = 'module-db-scripts-file',
	MODULE_NODE_FILES = 'module-node-files',
	MODULE_NODE_DIR = 'module-node-dir',
	MODULE_NODE_FILE = 'module-node-file',
	MODULE_SOURCE_FILES = 'module-source-files',
	MODULE_SOURCE_DIR = 'module-source-dir',
	MODULE_SOURCE_FILE = 'module-source-file',
}

export interface ProjectTreeNodeDef extends TreeNodeDef {
	$type: ProjectTreeNodeType;
}

export interface ProjectNodeDef extends Omit<ProjectTreeNodeDef, 'value'> {
	value: ProjectRoot;
}

export interface ModuleNodeDef extends Omit<ProjectTreeNodeDef, 'value'> {
	value: ProjectRoot & { module: F1ModuleStructure };
}

export interface O23ModuleNodeDef extends ModuleNodeDef {
	value: ProjectRoot & { module: O23ModuleStructure };
}

export interface ModuleFileNodeDef extends Omit<ProjectTreeNodeDef, 'value'> {
	value: ProjectRoot & { module: F1ModuleStructure; file: ModuleFile };
}

export interface ModuleEnvNodeDef extends Omit<ProjectTreeNodeDef, 'value'> {
	value: ProjectRoot & { module: F1ModuleStructure; env: ModuleEnv };
}

export const ROOT_NODE_MARKER = '$$root$$';
export const ADD_MODULE = Symbol();
export const ADD_MODULE_NODE_MARKER = (project: F1Project) => `$$add-module$$-${project.directory}`;
export const MODULE_NODE_MARKER = (module: F1ModuleStructure) => `$$module$$-${module.name}`;
export const MODULE_COMMANDS_NODE_MARKER = (module: F1ModuleStructure) => `$$module-commands$$-${module.name}`;
export const MODULE_COMMAND_NODE_MARKER = (module: F1ModuleStructure, command: ModuleCommand) => `$$module-command$$-${module.name}-${command.name}`;
export const MODULE_ENVS_NODE_MARKER = (module: F1ModuleStructure) => `$$module-envs$$-${module.name}`;
export const MODULE_ENV_NODE_MARKER = (module: F1ModuleStructure, env: ModuleEnv) => `$$module-envs$$-${module.name}-${env.name}`;
export const MODULE_ENV_COMMAND_NODE_MARKER = (module: F1ModuleStructure, env: ModuleEnv, command: ModuleCommand) => `$$module-envs$$-${module.name}-${env.name}-${command.name}`;
export const MODULE_O23_SERVER_PIPELINES_NODE_MARKER = (module: F1ModuleStructure) => `$$module-o23-pipelines-server$$-${module.name}`;
export const MODULE_O23_SERVER_PIPELINE_DIR_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-o23-pipelines-server$$-${module.name}-${file.path}`;
export const MODULE_O23_SERVER_PIPELINE_FILE_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-o23-pipelines-server$$-${module.name}-${file.path}`;
export const MODULE_O23_SCRIPTS_PIPELINES_NODE_MARKER = (module: F1ModuleStructure) => `$$module-o23-pipelines-scripts$$-${module.name}`;
export const MODULE_O23_SCRIPTS_PIPELINE_DIR_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-o23-pipelines-scripts$$-${module.name}-${file.path}`;
export const MODULE_O23_SCRIPTS_PIPELINE_FILE_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-o23-pipelines-scripts$$-${module.name}-${file.path}`;
export const MODULE_DB_SCRIPTS_NODE_MARKER = (module: F1ModuleStructure) => `$$module-db-scripts$$-${module.name}`;
export const MODULE_DB_SCRIPTS_DIR_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-db-scripts$$-${module.name}-${file.path}`;
export const MODULE_DB_SCRIPTS_FILE_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-db-scripts$$-${module.name}-${file.path}`;
export const MODULE_NODE_FILES_NODE_MARKER = (module: F1ModuleStructure) => `$$module-node-files$$-${module.name}`;
export const MODULE_NODE_DIR_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-node-files$$-${module.name}-${file.path}`;
export const MODULE_NODE_FILE_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-node-files$$-${module.name}-${file.path}`;
export const MODULE_SOURCE_FILES_NODE_MARKER = (module: F1ModuleStructure) => `$$module-source-files$$-${module.name}`;
export const MODULE_SOURCE_DIR_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-source-files$$-${module.name}-${file.path}`;
export const MODULE_SOURCE_FILE_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-source-files$$-${module.name}-${file.path}`;
