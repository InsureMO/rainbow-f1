export enum EnvVariableCategory {
	APP_BASIC = 'app-basic',
	APP_SERVER = 'app-server',
	APP_ERROR_LOG = 'app-error-log', APP_COMBINED_LOG = 'app-combined-log', APP_CONSOLE_LOG = 'app-console-log'
}

export enum EnvVariableValueType {
	TEXT = 'text', NUMBER = 'number', BOOLEAN = 'boolean', JSON = 'json'
}

export type EnvVariableValueValidationResult = { success: boolean; message?: string };
export type EnvVariableValueValidator = (value: any) => EnvVariableValueValidationResult;

export interface EnvVariableValue {
	type: EnvVariableValueType;
	validate?: EnvVariableValueValidator;
}

export interface EnvVariableDef extends EnvVariableValue {
	name: string;
	category: EnvVariableCategory;
}

export const AnyValueAccepted: EnvVariableValueValidator = () => ({success: true});
export const O23AppServerBasicVariables: Array<EnvVariableDef> = [
	{name: 'CFG_APP_NAME', category: EnvVariableCategory.APP_BASIC, type: EnvVariableValueType.TEXT},
	{name: 'CFG_APP_VERSION', category: EnvVariableCategory.APP_BASIC, type: EnvVariableValueType.TEXT},
	{name: 'CFG_APP_PROVIDER', category: EnvVariableCategory.APP_BASIC, type: EnvVariableValueType.TEXT},
	{name: 'CFG_APP_BUILT_AT', category: EnvVariableCategory.APP_BASIC, type: EnvVariableValueType.TEXT},
	{name: 'CFG_APP_PORT', category: EnvVariableCategory.APP_SERVER, type: EnvVariableValueType.NUMBER},
	{name: 'CFG_APP_CONTEXT', category: EnvVariableCategory.APP_SERVER, type: EnvVariableValueType.TEXT},
	{name: 'CFG_APP_BODY_JSON_MAX_SIZE', category: EnvVariableCategory.APP_SERVER, type: EnvVariableValueType.TEXT},
	{
		name: 'CFG_APP_BODY_URLENCODED_MAX_SIZE', category: EnvVariableCategory.APP_SERVER,
		type: EnvVariableValueType.TEXT
	},
	{name: 'CFG_APP_CORS_ENABLED', category: EnvVariableCategory.APP_SERVER, type: EnvVariableValueType.BOOLEAN},
	{name: 'CFG_APP_CORS_OPTIONS', category: EnvVariableCategory.APP_SERVER, type: EnvVariableValueType.JSON}
];
export const O23AppServerErrorLogVariables: Array<EnvVariableDef> = [
	{name: 'CFG_LOGGER_ERROR_FILE', category: EnvVariableCategory.APP_ERROR_LOG, type: EnvVariableValueType.TEXT},
	{
		name: 'CFG_LOGGER_ERROR_LEVEL', category: EnvVariableCategory.APP_ERROR_LOG, type: EnvVariableValueType.TEXT
	},
	{name: 'CFG_LOGGER_ERROR_JSON', category: EnvVariableCategory.APP_ERROR_LOG, type: EnvVariableValueType.TEXT},
	{
		name: 'CFG_LOGGER_ERROR_DATE_PATTERN', category: EnvVariableCategory.APP_ERROR_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_ERROR_ZIPPED_ARCHIVE', category: EnvVariableCategory.APP_ERROR_LOG,
		type: EnvVariableValueType.BOOLEAN
	},
	{name: 'CFG_LOGGER_ERROR_MAX_FILES', category: EnvVariableCategory.APP_ERROR_LOG, type: EnvVariableValueType.TEXT},
	{name: 'CFG_LOGGER_ERROR_MAX_SIZE', category: EnvVariableCategory.APP_ERROR_LOG, type: EnvVariableValueType.TEXT}
];
export const O23AppServerCombineLogVariables: Array<EnvVariableDef> = [
	{name: 'CFG_LOGGER_COMBINED_FILE', category: EnvVariableCategory.APP_COMBINED_LOG, type: EnvVariableValueType.TEXT},
	{
		name: 'CFG_LOGGER_COMBINED_LEVEL', category: EnvVariableCategory.APP_COMBINED_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_COMBINED_JSON', category: EnvVariableCategory.APP_COMBINED_LOG,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_LOGGER_COMBINED_DATE_PATTERN', category: EnvVariableCategory.APP_COMBINED_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_COMBINED_ZIPPED_ARCHIVE', category: EnvVariableCategory.APP_COMBINED_LOG,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_LOGGER_COMBINED_MAX_FILES', category: EnvVariableCategory.APP_COMBINED_LOG,
		type: EnvVariableValueType.TEXT
	},
	{
		name: 'CFG_LOGGER_COMBINED_MAX_SIZE', category: EnvVariableCategory.APP_COMBINED_LOG,
		type: EnvVariableValueType.TEXT
	}
];
export const O23AppServerConsoleLogVariables: Array<EnvVariableDef> = [
	{
		name: 'CFG_LOGGER_CONSOLE_ENABLED', category: EnvVariableCategory.APP_CONSOLE_LOG,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_LOGGER_CONSOLE_LEVEL', category: EnvVariableCategory.APP_CONSOLE_LOG,
		type: EnvVariableValueType.TEXT
	}
];
export const O23AppServerLogVariables: Array<EnvVariableDef> = [
	...O23AppServerErrorLogVariables,
	...O23AppServerCombineLogVariables,
	...O23AppServerConsoleLogVariables
];
export const O23AppServerVariables: Array<EnvVariableDef> = [
	...O23AppServerBasicVariables,
	...O23AppServerLogVariables

];
