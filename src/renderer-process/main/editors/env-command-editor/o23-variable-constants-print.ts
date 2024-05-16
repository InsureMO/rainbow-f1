import {EnvVariableCategory, EnvVariableDef, EnvVariableValueType} from './variable-types';

export const O23ServerPluginPrint: Array<EnvVariableDef> = [
	{
		name: 'CFG_APP_PLUGINS_PRINT', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT,
		type: EnvVariableValueType.BOOLEAN
	}
];
