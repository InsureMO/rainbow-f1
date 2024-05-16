import {EnvVariableCategory, EnvVariableDef, EnvVariableValueType} from './variable-types';

export enum EnvTypeOrmVariableDialect {
	ALL = 'all', MYSQL = 'mysql', MSSQL = 'mssql', PGSQL = 'pgsql', ORACLE = 'oracle'
}

export interface EnvTypeOrmVariableDef extends EnvVariableDef {
	dialects: Array<EnvTypeOrmVariableDialect>;
}

export const O23TypeOrmVariablePrefix = 'CFG_TYPEORM_';
export const O23TypeOrmTypeVariableSuffix = '_TYPE';
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