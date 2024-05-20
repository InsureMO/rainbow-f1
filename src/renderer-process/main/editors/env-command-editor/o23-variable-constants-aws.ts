import {EnvVariableCategory, EnvVariableDef, EnvVariableValueType} from './variable-types';

export const O23ServerPluginAWSVariablePrefix = 'CFG_AWS_';
export const O23ServerPluginAWSClientVariablePrefix = 'CFG_AWS_CLIENT_';
export const O23ServerPluginAWSClientVariableSuffixes: Array<EnvVariableDef> = [
	{
		name: 'ACCESS_KEY', category: EnvVariableCategory.O23_SERVER_PLUGIN_AWS_CLIENT,
		type: EnvVariableValueType.TEXT,
		description: 'AWS credential access key.'
	},
	{
		name: 'SECRET_KEY', category: EnvVariableCategory.O23_SERVER_PLUGIN_AWS_CLIENT,
		type: EnvVariableValueType.TEXT,
		description: 'AWS credential secret key.'
	},
	{
		name: 'SESSION_TOKEN', category: EnvVariableCategory.O23_SERVER_PLUGIN_AWS_CLIENT,
		type: EnvVariableValueType.TEXT,
		description: 'AWS credential session token.'
	},
	{
		name: 'CREDENTIAL_SCOPE', category: EnvVariableCategory.O23_SERVER_PLUGIN_AWS_CLIENT,
		type: EnvVariableValueType.TEXT,
		description: 'AWS credential scope.'
	},
	{
		name: 'REGION', category: EnvVariableCategory.O23_SERVER_PLUGIN_AWS_CLIENT,
		type: EnvVariableValueType.TEXT,
		description: 'AWS region.'
	}
];
export const O23ServerPluginAWSClientVariableSuffixNames = O23ServerPluginAWSClientVariableSuffixes.map(({name}) => `_${name}`);
export const O23ServerPluginAWSS3VariablePrefix = 'CFG_AWS_S3_';
export const O23ServerPluginAWSS3VariableSuffixes: Array<EnvVariableDef> = [
	{
		name: 'CLIENT_TYPE', category: EnvVariableCategory.O23_SERVER_PLUGIN_AWS_S3,
		type: EnvVariableValueType.TEXT, defaultValue: 'default',
		description: 'AWS S3 client type.'
	}
];
export const O23ServerPluginAWSS3VariableSuffixNames = O23ServerPluginAWSS3VariableSuffixes.map(({name}) => `_${name}`);
export const O23ServerPluginAWSS3Variables: Array<EnvVariableDef> = [
	{
		name: 'CFG_APP_PLUGINS_AWS_S3', category: EnvVariableCategory.O23_SERVER_PLUGIN_AWS_S3,
		type: EnvVariableValueType.BOOLEAN
	}
];
