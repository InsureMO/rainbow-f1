import {O23BasicVariables} from './o23-variable-constants-basic';
import {EnvVariableCategory, EnvVariableDef, EnvVariableValueType} from './variable-types';

export const O23ServerBasicVariables: Array<EnvVariableDef> = [
	{name: 'CFG_APP_NAME', category: EnvVariableCategory.O23_SERVER_BASIC, type: EnvVariableValueType.TEXT},
	{name: 'CFG_APP_VERSION', category: EnvVariableCategory.O23_SERVER_BASIC, type: EnvVariableValueType.TEXT},
	{name: 'CFG_APP_PROVIDER', category: EnvVariableCategory.O23_SERVER_BASIC, type: EnvVariableValueType.TEXT},
	{name: 'CFG_APP_BUILT_AT', category: EnvVariableCategory.O23_SERVER_BASIC, type: EnvVariableValueType.TEXT},
	{name: 'CFG_APP_PORT', category: EnvVariableCategory.O23_SERVER_BASIC, type: EnvVariableValueType.NUMBER},
	{name: 'CFG_APP_CONTEXT', category: EnvVariableCategory.O23_SERVER_BASIC, type: EnvVariableValueType.TEXT},
	{
		name: 'CFG_APP_BODY_JSON_MAX_SIZE', category: EnvVariableCategory.O23_SERVER_BASIC,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_APP_BODY_URLENCODED_MAX_SIZE', category: EnvVariableCategory.O23_SERVER_BASIC,
		type: EnvVariableValueType.TEXT
	},
	{name: 'CFG_APP_CORS_ENABLED', category: EnvVariableCategory.O23_SERVER_BASIC, type: EnvVariableValueType.BOOLEAN},
	{name: 'CFG_APP_CORS_OPTIONS', category: EnvVariableCategory.O23_SERVER_BASIC, type: EnvVariableValueType.JSON}
];
export const O23ServerErrorLogVariables: Array<EnvVariableDef> = [
	{
		name: 'CFG_LOGGER_ERROR_FILE',
		category: EnvVariableCategory.O23_SERVER_ERROR_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_ERROR_LEVEL',
		category: EnvVariableCategory.O23_SERVER_ERROR_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_ERROR_JSON',
		category: EnvVariableCategory.O23_SERVER_ERROR_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_ERROR_DATE_PATTERN', category: EnvVariableCategory.O23_SERVER_ERROR_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_ERROR_ZIPPED_ARCHIVE', category: EnvVariableCategory.O23_SERVER_ERROR_LOG,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_LOGGER_ERROR_MAX_FILES',
		category: EnvVariableCategory.O23_SERVER_ERROR_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_ERROR_MAX_SIZE',
		category: EnvVariableCategory.O23_SERVER_ERROR_LOG,
		type: EnvVariableValueType.TEXT
	}
];
export const O23ServerCombineLogVariables: Array<EnvVariableDef> = [
	{
		name: 'CFG_LOGGER_COMBINED_FILE',
		category: EnvVariableCategory.O23_SERVER_COMBINED_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_COMBINED_LEVEL', category: EnvVariableCategory.O23_SERVER_COMBINED_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_COMBINED_JSON', category: EnvVariableCategory.O23_SERVER_COMBINED_LOG,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_LOGGER_COMBINED_DATE_PATTERN', category: EnvVariableCategory.O23_SERVER_COMBINED_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_COMBINED_ZIPPED_ARCHIVE', category: EnvVariableCategory.O23_SERVER_COMBINED_LOG,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_LOGGER_COMBINED_MAX_FILES', category: EnvVariableCategory.O23_SERVER_COMBINED_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_COMBINED_MAX_SIZE', category: EnvVariableCategory.O23_SERVER_COMBINED_LOG,
		type: EnvVariableValueType.TEXT
	}
];
export const O23ServerConsoleLogVariables: Array<EnvVariableDef> = [
	{
		name: 'CFG_LOGGER_CONSOLE_ENABLED', category: EnvVariableCategory.O23_SERVER_CONSOLE_LOG,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_LOGGER_CONSOLE_LEVEL', category: EnvVariableCategory.O23_SERVER_CONSOLE_LOG,
		type: EnvVariableValueType.TEXT
	}
];
export const O23ServerLogVariables: Array<EnvVariableDef> = [
	...O23ServerErrorLogVariables,
	...O23ServerCombineLogVariables,
	...O23ServerConsoleLogVariables
];
export const O23ServerPipelineVariables: Array<EnvVariableDef> = [
	{
		name: 'CFG_APP_INIT_PIPELINES_DIR', category: EnvVariableCategory.O23_SERVER_PIPELINE,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_APP_EXCLUDED_PIPELINES_DIRS', category: EnvVariableCategory.O23_SERVER_PIPELINE,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_PIPELINE_DEBUG_LOG_ENABLED', category: EnvVariableCategory.O23_SERVER_PIPELINE,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_PIPELINE_PERFORMANCE_LOG_ENABLED', category: EnvVariableCategory.O23_SERVER_PIPELINE,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_APP_EXAMPLES_ENABLED', category: EnvVariableCategory.O23_SERVER_PIPELINE,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_APP_API_TEST', category: EnvVariableCategory.O23_SERVER_PIPELINE,
		type: EnvVariableValueType.BOOLEAN
	}
];
export const O23ServerVariables: Array<EnvVariableDef> = [
	...O23BasicVariables,
	...O23ServerBasicVariables,
	...O23ServerLogVariables,
	...O23ServerPipelineVariables
];
export const O23ScriptsPipelineVariables: Array<EnvVariableDef> = [
	{
		name: 'CFG_APP_DB_SCRIPTS_DIR', category: EnvVariableCategory.O23_SCRIPTS_BASIC,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_APP_INIT_PIPELINES_DIR', category: EnvVariableCategory.O23_SCRIPTS_PIPELINE,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_APP_EXCLUDED_PIPELINES_DIRS', category: EnvVariableCategory.O23_SCRIPTS_PIPELINE,
		type: EnvVariableValueType.TEXT
	}
];
export const O23ScriptsVariables: Array<EnvVariableDef> = [
	...O23ScriptsPipelineVariables
];