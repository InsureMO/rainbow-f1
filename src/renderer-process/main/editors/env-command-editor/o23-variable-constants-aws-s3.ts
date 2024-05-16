
import {EnvVariableCategory, EnvVariableDef, EnvVariableValueType} from './variable-types';

export const O23ServerPluginAWSS3: Array<EnvVariableDef> = [
	{
		name: 'CFG_APP_PLUGINS_AWS_S3', category: EnvVariableCategory.O23_SERVER_PLUGIN_AWS_S3,
		type: EnvVariableValueType.BOOLEAN
	}
];