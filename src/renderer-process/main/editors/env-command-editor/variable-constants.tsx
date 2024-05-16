export enum EnvVariableCategory {
	O23_BASIC = 'o23-basic',
	O23_TYPEORM = 'o23-typeorm',
	O23_SERVER_BASIC = 'o23-server-basic',
	O23_SERVER_ERROR_LOG = 'o23-server-error-log',
	O23_SERVER_COMBINED_LOG = 'o23-server-combined-log',
	O23_SERVER_CONSOLE_LOG = 'o23-server-console-log',
	O23_SERVER_PIPELINE = 'o23-server-pipeline',
	O23_SERVER_PLUGIN_PRINT = 'o23-server-plugin-print',
	O23_SERVER_PLUGIN_AWS_S3 = 'o23-server-plugin-aws-s3',
	O23_SCRIPTS_BASIC = 'o23-scripts-basic',
	O23_SCRIPTS_PIPELINE = 'o23-scripts-pipeline',
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

export enum EnvTypeOrmVariableDialect {
	ALL = 'all', MYSQL = 'mysql', MSSQL = 'mssql', PGSQL = 'pgsql', ORACLE = 'oracle'
}

export interface EnvTypeOrmVariableDef extends EnvVariableDef {
	dialects: Array<EnvTypeOrmVariableDialect>;
}

export const AnyValueAccepted: EnvVariableValueValidator = () => ({success: true});
export const O23BasicVariables: Array<EnvVariableDef> = [
	{name: 'CFG_APP_ENV_STRICT', category: EnvVariableCategory.O23_BASIC, type: EnvVariableValueType.BOOLEAN},
	{
		name: 'CFG_APP_ENV_REDRESS_TYPEORM_DATASOURCE', category: EnvVariableCategory.O23_BASIC,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_APP_ENV_REDRESS_TYPEORM_TRANSACTION', category: EnvVariableCategory.O23_BASIC,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_APP_DATASOURCE_DEFAULT', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_APP_DATASOURCE_CONFIG', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_TYPEORM_SQL_CACHE_ENABLED', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN
	}
];
export const O23TypeOrmVariablePrefix = 'CFG_TYPEORM_';
export const O23TypeOrmVariables: Array<EnvTypeOrmVariableDef> = [
	{
		name: 'TYPE', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.ALL]
	},
	{
		name: 'HOST', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.ALL]
	},
	{
		name: 'PORT', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.NUMBER,
		dialects: [EnvTypeOrmVariableDialect.ALL]
	},
	{
		name: 'USERNAME', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.ALL]
	},
	{
		name: 'PASSWORD', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.ALL]
	},
	{
		name: 'INSTANCE', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL, EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'DATABASE', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MYSQL, EnvTypeOrmVariableDialect.MSSQL, EnvTypeOrmVariableDialect.PGSQL]
	},
	{
		name: 'SID', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.ORACLE]
	},
	{
		name: 'SERVICE_NAME', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.ORACLE]
	},
	{
		name: 'CONNECT_STRING', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.ORACLE]
	},
	{
		name: 'SCHEMA', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL, EnvTypeOrmVariableDialect.PGSQL, EnvTypeOrmVariableDialect.ORACLE]
	},
	{
		name: 'AUTHENTICATION_TYPE', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'DOMAIN', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'AZURE_AD_ACCESS_TOKEN', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'AZURE_AD_MSI_APP_SERVICE_CLIENT_ID', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'AZURE_AD_MSI_APP_SERVICE_ENDPOINT', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'AZURE_AD_MSI_APP_SERVICE_SECRET', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'AZURE_AD_MSI_VM_CLIENT_ID', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'AZURE_AD_MSI_VM_ENDPOINT', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'AZURE_AD_MSI_VM_CLIENT_SECRET', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'AZURE_AD_MSI_VM_TENANT_ID', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'CHARSET', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MYSQL]
	},
	{
		name: 'TIMEZONE', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MYSQL, EnvTypeOrmVariableDialect.PGSQL, EnvTypeOrmVariableDialect.ORACLE]
	},
	{
		name: 'POOL_SIZE', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT,
		dialects: [EnvTypeOrmVariableDialect.MYSQL, EnvTypeOrmVariableDialect.PGSQL, EnvTypeOrmVariableDialect.ORACLE]
	},
	{
		name: 'SYNCHRONIZE', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.ALL]
	},
	{
		name: 'LOGGING', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.ALL]
	},
	{
		name: 'CONNECT_TIMEOUT', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.NUMBER,
		dialects: [EnvTypeOrmVariableDialect.ALL]
	},
	{
		name: 'ACQUIRE_TIMEOUT', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.NUMBER,
		dialects: [EnvTypeOrmVariableDialect.MYSQL]
	},
	{
		name: 'INSECURE_AUTH', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MYSQL]
	},
	{
		name: 'SUPPORT_BIG_NUMBERS', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MYSQL]
	},
	{
		name: 'BIG_NUMBER_STRINGS', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MYSQL]
	},
	{
		name: 'DATE_STRINGS', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MYSQL]
	},
	{
		name: 'DEBUG', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MYSQL]
	},
	{
		name: 'TRACE', category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MYSQL]
	},
	{
		name: 'MULTIPLE_STATEMENTS', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MYSQL]
	},
	{
		name: 'LEGACY_SPATIAL_SUPPORT', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MYSQL]
	},
	{
		name: 'REQUEST_TIMEOUT', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.NUMBER,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'POOL_MAX', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.NUMBER,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'POOL_MIN', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.NUMBER,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'POOL_ACQUIRE_TIMEOUT', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.NUMBER,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'POOL_IDLE_TIMEOUT', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.NUMBER,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'ANSI_NULL_ENABLED', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'CANCEL_TIMEOUT', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.NUMBER,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'USE_UTC', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'ENCRYPT', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'CRYPTO_CREDENTIALS', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'TDS_VERSION', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'ARITHMETIC_ABORT', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'TRUST_SERVER_CERTIFICATE', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.MSSQL]
	},
	{
		name: 'KEPT_ON_GLOBAL', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.ALL]
	},
	{
		name: 'TIMESTAMP_FORMAT_READ', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.ALL]
	},
	{
		name: 'TIMESTAMP_FORMAT_WRITE', category: EnvVariableCategory.O23_TYPEORM,
		type: EnvVariableValueType.BOOLEAN,
		dialects: [EnvTypeOrmVariableDialect.ALL]
	}
];
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
export const O23ServerPluginPrint: Array<EnvVariableDef> = [
	{
		name: 'CFG_APP_PLUGINS_PRINT', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT,
		type: EnvVariableValueType.BOOLEAN
	}
];
export const O23ServerPluginAWSS3: Array<EnvVariableDef> = [
	{
		name: 'CFG_APP_PLUGINS_AWS_S3', category: EnvVariableCategory.O23_SERVER_PLUGIN_AWS_S3,
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
