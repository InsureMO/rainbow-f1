import {F1ModuleStructure, F1Project, ModuleCommand, ModuleEnv, ModuleFile, ModuleFileType} from '../../../shared';

export const ADD_MODULE = Symbol();

export const ROOT_MARKER = '$$root$$';
export const ADD_MODULE_MARKER_PREFIX = '$$add-module$$';
export const MODULE_MARKER_PREFIX = '$$module$$';
export const MODULE_COMMANDS_MARKER_PREFIX = '$$module-commands$$';
export const MODULE_COMMAND_MARKER_PREFIX = '$$module-command$$';
export const MODULE_ENVS_MARKER_PREFIX = '$$module-envs$$';
export const MODULE_ENV_MARKER_PREFIX = '$$module-env$$';
export const MODULE_ENV_COMMAND_MARKER_PREFIX = '$$module-env-command$$';
export const MODULE_O23_SERVER_PIPELINES_MARKER_PREFIX = '$$module-o23-pipelines-server$$';
export const MODULE_O23_SERVER_PIPELINE_DIR_MARKER_PREFIX = '$$module-o23-pipelines-server-dir$$';
export const MODULE_O23_SERVER_PIPELINE_FILE_MARKER_PREFIX = '$$module-o23-pipelines-server-file$$';
export const MODULE_O23_SCRIPTS_PIPELINES_MARKER_PREFIX = '$$module-o23-pipelines-scripts$$';
export const MODULE_O23_SCRIPTS_PIPELINE_DIR_MARKER_PREFIX = '$$module-o23-pipelines-scripts-dir$$';
export const MODULE_O23_SCRIPTS_PIPELINE_FILE_MARKER_PREFIX = '$$module-o23-pipelines-scripts-file$$';
export const MODULE_O23_DB_SCRIPTS_MARKER_PREFIX = '$$module-db-scripts$$';
export const MODULE_O23_DB_SCRIPTS_DIR_MARKER_PREFIX = '$$module-db-scripts-dir$$';
export const MODULE_O23_DB_SCRIPTS_FILE_MARKER_PREFIX = '$$module-db-scripts-file$$';
export const MODULE_NODE_FILES_MARKER_PREFIX = '$$module-node-files$$';
export const MODULE_NODE_DIR_MARKER_PREFIX = '$$module-node-files-dir$$';
export const MODULE_NODE_FILE_MARKER_PREFIX = '$$module-node-files-file$$';
export const MODULE_SOURCE_FILES_MARKER_PREFIX = '$$module-source-files$$';
export const MODULE_SOURCE_DIR_MARKER_PREFIX = '$$module-source-files-dir$$';
export const MODULE_SOURCE_FILE_MARKER_PREFIX = '$$module-source-files-file$$';

export const ADD_MODULE_MARKER = (project: F1Project) => `${ADD_MODULE_MARKER_PREFIX}-${project.directory}`;
export const MODULE_MARKER = (module: F1ModuleStructure) => `${MODULE_MARKER_PREFIX}-${module.name}`;
export const MODULE_COMMANDS_MARKER = (module: F1ModuleStructure) => `${MODULE_COMMANDS_MARKER_PREFIX}-${module.name}`;
export const MODULE_COMMAND_MARKER = (module: F1ModuleStructure, command: ModuleCommand) => `${MODULE_COMMAND_MARKER_PREFIX}-${module.name}-${command.name}`;
export const MODULE_ENVS_MARKER = (module: F1ModuleStructure) => `${MODULE_ENVS_MARKER_PREFIX}-${module.name}`;
export const MODULE_ENV_MARKER = (module: F1ModuleStructure, env: ModuleEnv) => `${MODULE_ENV_MARKER_PREFIX}-${module.name}-${env.name}`;
export const MODULE_ENV_COMMAND_MARKER = (module: F1ModuleStructure, env: ModuleEnv, command: ModuleCommand) => `${MODULE_ENV_COMMAND_MARKER_PREFIX}-${module.name}-${env.name}-${command.name}`;
export const MODULE_O23_SERVER_PIPELINES_MARKER = (module: F1ModuleStructure) => `${MODULE_O23_SERVER_PIPELINES_MARKER_PREFIX}-${module.name}`;
export const MODULE_O23_SERVER_PIPELINE_DIR_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `${MODULE_O23_SERVER_PIPELINE_DIR_MARKER_PREFIX}-${module.name}-${file.path}`;
export const MODULE_O23_SERVER_PIPELINE_FILE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `${MODULE_O23_SERVER_PIPELINE_FILE_MARKER_PREFIX}-${module.name}-${file.path}`;
export const MODULE_O23_SCRIPTS_PIPELINES_MARKER = (module: F1ModuleStructure) => `${MODULE_O23_SCRIPTS_PIPELINES_MARKER_PREFIX}-${module.name}`;
export const MODULE_O23_SCRIPTS_PIPELINE_DIR_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `${MODULE_O23_SCRIPTS_PIPELINE_DIR_MARKER_PREFIX}-${module.name}-${file.path}`;
export const MODULE_O23_SCRIPTS_PIPELINE_FILE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `${MODULE_O23_SCRIPTS_PIPELINE_FILE_MARKER_PREFIX}-${module.name}-${file.path}`;
export const MODULE_O23_DB_SCRIPTS_MARKER = (module: F1ModuleStructure) => `${MODULE_O23_DB_SCRIPTS_MARKER_PREFIX}-${module.name}`;
export const MODULE_O23_DB_SCRIPTS_DIR_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `${MODULE_O23_DB_SCRIPTS_DIR_MARKER_PREFIX}-${module.name}-${file.path}`;
export const MODULE_O23_DB_SCRIPTS_FILE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `${MODULE_O23_DB_SCRIPTS_FILE_MARKER_PREFIX}-${module.name}-${file.path}`;
export const MODULE_NODE_FILES_MARKER = (module: F1ModuleStructure) => `${MODULE_NODE_FILES_MARKER_PREFIX}-${module.name}`;
export const MODULE_NODE_FILES_DIR_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `${MODULE_NODE_DIR_MARKER_PREFIX}-${module.name}-${file.path}`;
export const MODULE_NODE_FILES_FILE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `${MODULE_NODE_FILE_MARKER_PREFIX}-${module.name}-${file.path}`;
export const MODULE_SOURCE_FILES_MARKER = (module: F1ModuleStructure) => `${MODULE_SOURCE_FILES_MARKER_PREFIX}-${module.name}`;
export const MODULE_SOURCE_FILES_DIR_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `${MODULE_SOURCE_DIR_MARKER_PREFIX}-${module.name}-${file.path}`;
export const MODULE_SOURCE_FILES_FILE_MARKER = (module: F1ModuleStructure, file: ModuleFile) => `${MODULE_SOURCE_FILE_MARKER_PREFIX}-${module.name}-${file.path}`;

export const isJsonFile = (file: ModuleFile) => {
	return [ModuleFileType.JSON, ModuleFileType.PACKAGE_JSON].includes(file.type) || file.basename.endsWith('.json');
};
export const isJavascriptFile = (file: ModuleFile) => {
	return [ModuleFileType.JAVASCRIPT, ModuleFileType.COMMON_JAVASCRIPT, ModuleFileType.ECMA_MODULE_JAVASCRIPT].includes(file.type)
		|| file.basename.endsWith('.js') || file.basename.endsWith('.cjs') || file.basename.endsWith('.mjs');
};