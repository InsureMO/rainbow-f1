
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