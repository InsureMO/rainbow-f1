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
	O23_UNKNOWN = 'o23-unknown'
}

export type EnvVariableCategoryExt = string;

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
	category: EnvVariableCategory | EnvVariableCategoryExt;
}