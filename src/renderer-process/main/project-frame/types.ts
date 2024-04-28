import {TreeNodeDef} from '@rainbow-d9/n2';
import {F1ModuleStructure, F1Project, F1ProjectStructure, ModuleCommand, ModuleFile} from '../../../shared';

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
	MODULE_SERVER = 'module-server',
	MODULE_SCRIPTS = 'module-scripts',
	MODULE_DB_SCRIPTS = 'module-db-scripts',
	MODULE_DB = 'module-db',
	MODULE_NODE_FILES = 'module-node-files',
	MODULE_NODE_DIR = 'module-node-dir',
	MODULE_NODE_FILE = 'module-node-file',
	MODULE_SOURCE_FILES = 'module-source-files',
	MODULE_SOURCE_DIR = 'module-source-dir',
	MODULE_SOURCE_FILE = 'module-source-file',
	MODULE_O23_PIPELINES = 'module-o23-pipelines'
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

export interface ModuleFileNodeDef extends Omit<ProjectTreeNodeDef, 'value'> {
	value: ProjectRoot & { module: F1ModuleStructure; file: ModuleFile };
}

export const ROOT_NODE_MARKER = '$$root$$';
export const ADD_MODULE = Symbol();
export const ADD_MODULE_NODE_MARKER = (project: F1Project) => `$$add-module$$-${project.directory}`;
export const MODULE_NODE_MARKER = (module: F1ModuleStructure) => `$$module$$-${module.name}`;
export const MODULE_COMMANDS_NODE_MARKER = (module: F1ModuleStructure) => `$$module-commands$$-${module.name}`;
export const MODULE_COMMAND_NODE_MARKER = (module: F1ModuleStructure, command: ModuleCommand) => `$$module-command$$-${module.name}-${command.name}`;
export const MODULE_ENVS_NODE_MARKER = (module: F1ModuleStructure) => `$$module-envs$$-${module.name}`;
export const MODULE_SERVER_NODE_MARKER = (module: F1ModuleStructure) => `$$module-server$$-${module.name}`;
export const MODULE_SCRIPTS_NODE_MARKER = (module: F1ModuleStructure) => `$$module-scripts$$-${module.name}`;
export const MODULE_DB_SCRIPTS_NODE_MARKER = (module: F1ModuleStructure) => `$$module-db-scripts$$-${module.name}`;
export const MODULE_NODE_FILES_NODE_MARKER = (module: F1ModuleStructure) => `$$module-node-files$$-${module.name}`;
export const MODULE_NODE_DIR_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-node-files$$-${module.name}-${file.path}`;
export const MODULE_NODE_FILE_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-node-files$$-${module.name}-${file.path}`;
export const MODULE_SOURCE_FILES_NODE_MARKER = (module: F1ModuleStructure) => `$$module-source-files$$-${module.name}`;
export const MODULE_SOURCE_DIR_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-source-files$$-${module.name}-${file.path}`;
export const MODULE_SOURCE_FILE_NODE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `$$module-source-files$$-${module.name}-${file.path}`;
export const MODULE_O23_PIPELINES_NODE_MARKER = (module: F1ModuleStructure) => `$$module-o23-pipelines$$-${module.name}`;
