import {TreeNodeDef} from '@rainbow-d9/n2';
import {
	F1ModuleStructure,
	F1Project,
	F1ProjectStructure,
	ModuleCommand,
	ModuleEnv,
	ModuleFile,
	O23ModuleStructure
} from '../../../../shared';

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

export interface ModuleEnvCommandNodeDef extends Omit<ProjectTreeNodeDef, 'value'> {
	value: ProjectRoot & { module: F1ModuleStructure; env: ModuleEnv; command: ModuleCommand };
}