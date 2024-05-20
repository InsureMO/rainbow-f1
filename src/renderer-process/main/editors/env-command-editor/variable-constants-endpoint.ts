import {EnvVariableCategory, EnvVariableDef, EnvVariableValueType} from './variable-types';

export const O23EndpointVariablePrefix = 'CFG_ENDPOINTS_';
export const O23EndpointSystemVariableSuffixes: Array<EnvVariableDef> = [
	{
		name: 'GLOBAL_HEADERS', category: EnvVariableCategory.O23_ENDPOINT, type: EnvVariableValueType.TEXT,
		description: 'Endpoint system global request headers. Format follows "name=value[;name=value[...]]".'
	},
	{
		name: 'GLOBAL_TIMEOUT', category: EnvVariableCategory.O23_ENDPOINT, type: EnvVariableValueType.NUMBER,
		defaultValue: -1, description: 'Endpoint system global timeout, in seconds, `-1` represents no timeout.'
	}
];
export const O23EndpointSystemVariableSuffixNames = O23EndpointSystemVariableSuffixes.map(({name}) => `_${name}`);
export const O23EndpointHttpVariableSuffixes: Array<EnvVariableDef> = [
	{
		name: 'URL', category: EnvVariableCategory.O23_ENDPOINT, type: EnvVariableValueType.TEXT,
		defaultValue: 'Endpoint URL.'
	},
	{
		name: 'HEADERS', category: EnvVariableCategory.O23_ENDPOINT, type: EnvVariableValueType.TEXT,
		description: 'Endpoint request headers, use global headers if this parameter doesn\'t present. Format follows "name=value[;name=value[...]]".'
	},
	{
		name: 'TIMEOUT', category: EnvVariableCategory.O23_ENDPOINT, type: EnvVariableValueType.NUMBER,
		description: 'Endpoint request timeout, in seconds, use global timeout if this parameter doesn\'t present.'
	}
];
export const O23EndpointHttpVariableSuffixNames = O23EndpointHttpVariableSuffixes.map(({name}) => `_${name}`);
