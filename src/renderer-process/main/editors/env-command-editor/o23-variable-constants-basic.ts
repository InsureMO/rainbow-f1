import {EnvVariableCategory, EnvVariableDef, EnvVariableValueType} from './variable-types';

export const O23BasicVariables: Array<EnvVariableDef> = [
	{name: 'CFG_APP_ENV_STRICT', category: EnvVariableCategory.O23_BASIC, type: EnvVariableValueType.BOOLEAN},
	{
		name: 'CFG_APP_ENV_REDRESS_TYPEORM_DATASOURCE', category: EnvVariableCategory.O23_BASIC,
		type: EnvVariableValueType.BOOLEAN
	},
	{
		name: 'CFG_APP_ENV_REDRESS_TYPEORM_TRANSACTION', category: EnvVariableCategory.O23_BASIC,
		type: EnvVariableValueType.BOOLEAN
	}
];
