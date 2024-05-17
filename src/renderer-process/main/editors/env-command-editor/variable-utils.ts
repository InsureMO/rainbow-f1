import {F1ModuleStructure, ModuleCommand} from '../../../../shared';
import {EnvItemValue, EnvValues, ModuleDependencies} from './env-values-wrapper';
import {
	O23PipelineVariablePrefix,
	O23PipelineVariables,
	O23ScriptsBasicVariables,
	O23ServerBasicVariables,
	O23ServerCombineLogVariablePrefix,
	O23ServerCombineLogVariables,
	O23ServerConsoleLogVariablePrefix,
	O23ServerConsoleLogVariables,
	O23ServerErrorLogVariablePrefix,
	O23ServerErrorLogVariables,
	O23ServerOrScriptsVariablePrefix,
	O23ServerPipelineVariables
} from './o23-variable-constants';
import {
	O23ServerPluginAWSClientVariablePrefix,
	O23ServerPluginAWSClientVariableSuffixes,
	O23ServerPluginAWSClientVariableSuffixNames,
	O23ServerPluginAWSS3VariablePrefix,
	O23ServerPluginAWSS3Variables,
	O23ServerPluginAWSS3VariableSuffixes,
	O23ServerPluginAWSS3VariableSuffixNames,
	O23ServerPluginAWSVariablePrefix
} from './o23-variable-constants-aws-s3';
import {O23BasicVariablePrefix, O23BasicVariables} from './o23-variable-constants-basic';
import {
	O23ServerPluginPrintCsvVariablePrefix,
	O23ServerPluginPrintCsvVariables,
	O23ServerPluginPrintExcelVariablePrefix,
	O23ServerPluginPrintExcelVariables,
	O23ServerPluginPrintPdfVariablePrefix,
	O23ServerPluginPrintPdfVariables,
	O23ServerPluginPrintVariables,
	O23ServerPluginPrintWordVariablePrefix,
	O23ServerPluginPrintWordVariables
} from './o23-variable-constants-print';
import {
	EnvTypeOrmVariableDialect,
	O23TypeOrmVariablePrefix,
	O23TypeOrmVariables,
	O23TypeOrmVariableSuffixes,
	O23TypeOrmVariableSuffixNames
} from './variable-constants-typeorm';
import {EnvVariableCategory, EnvVariableDef, EnvVariableValueType, EnvVariableValueValidator} from './variable-types';

export const AnyValueAccepted: EnvVariableValueValidator = () => ({success: true});
export const getVariableValue = (values: Array<EnvItemValue>, defaultValue?: string): Undefinable<string> => {
	return (values ?? []).find(value => !value.commented)?.value ?? defaultValue;
};

type UsedKeyMap = Record<string, boolean>;
type VariableGroup = Record<string, Array<EnvVariableDef>>

interface EndpointApi {
	code: string;
	variables: Array<EnvVariableDef>;
}

interface EndpointSystem {
	code: string;
	variables: Array<EnvVariableDef>;
	apis: Record<string, EndpointApi>;
}

const guessCategory = (key: string, command: ModuleCommand): EnvVariableCategory => {
	if (key.startsWith(O23BasicVariablePrefix)) {
		return EnvVariableCategory.O23_BASIC;
	} else if (key.startsWith(O23PipelineVariablePrefix)) {
		return EnvVariableCategory.O23_PIPELINE;
	} else if (key.startsWith(O23ServerOrScriptsVariablePrefix)) {
		if (command.name.endsWith(':start') || command.name.endsWith('-start')) {
			return EnvVariableCategory.O23_SERVER_BASIC;
		} else if (command.name.endsWith(':scripts') || command.name.endsWith('-scripts')) {
			return EnvVariableCategory.O23_SCRIPTS_BASIC;
		} else {
			return EnvVariableCategory.O23_APP;
		}
	} else if (key.startsWith(O23ServerErrorLogVariablePrefix)) {
		return EnvVariableCategory.O23_SERVER_ERROR_LOG;
	} else if (key.startsWith(O23ServerCombineLogVariablePrefix)) {
		return EnvVariableCategory.O23_SERVER_COMBINED_LOG;
	} else if (key.startsWith(O23ServerConsoleLogVariablePrefix)) {
		return EnvVariableCategory.O23_SERVER_CONSOLE_LOG;
	} else if (key.startsWith(O23TypeOrmVariablePrefix)) {
		return EnvVariableCategory.O23_TYPEORM;
	} else if (key.startsWith(O23ServerPluginPrintPdfVariablePrefix)) {
		return EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF;
	} else if (key.startsWith(O23ServerPluginPrintCsvVariablePrefix)) {
		return EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_CSV;
	} else if (key.startsWith(O23ServerPluginPrintExcelVariablePrefix)) {
		return EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_XLSX;
	} else if (key.startsWith(O23ServerPluginPrintWordVariablePrefix)) {
		return EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_DOCX;
	} else if (key.startsWith(O23ServerPluginAWSClientVariablePrefix)) {
		return EnvVariableCategory.O23_SERVER_PLUGIN_AWS_CLIENT;
	} else if (key.startsWith(O23ServerPluginAWSS3VariablePrefix)) {
		return EnvVariableCategory.O23_SERVER_PLUGIN_AWS_S3;
	} else if (key.startsWith(O23ServerPluginAWSVariablePrefix)) {
		return EnvVariableCategory.O23_SERVER_PLUGIN_AWS;
	} else {
		return EnvVariableCategory.OTHERS;
	}
};
const UnknownTypeOrmKey = '$UnknownTypeOrmKey';
const guessTypeOrmDataSourceName = (key: string): string => {
	const afterPrefix = key.substring(O23TypeOrmVariablePrefix.length);
	const index = O23TypeOrmVariableSuffixNames.find(({suffix}) => afterPrefix.endsWith(suffix))?.index;
	if (index === -1) {
		return UnknownTypeOrmKey;
	} else {
		return afterPrefix.slice(0, -O23TypeOrmVariableSuffixNames[index].suffix.length) || UnknownTypeOrmKey;
	}
};
const arrangeAsTypeOrmVariable = (key: string, values: EnvValues, typeormGroups: VariableGroup, used: UsedKeyMap) => {
	const dataSourceName = guessTypeOrmDataSourceName(key);
	if (dataSourceName === UnknownTypeOrmKey) {
		// not predefined datasource keys, push into
		typeormGroups[UnknownTypeOrmKey].push({
			name: key, category: EnvVariableCategory.O23_TYPEORM, type: EnvVariableValueType.TEXT
		});
	} else {
		if (typeormGroups[dataSourceName] == null) {
			typeormGroups[dataSourceName] = [];
		}
		// try to get the datasource type
		const dataSourceType = getVariableValue(values[`${O23TypeOrmVariablePrefix}${dataSourceName}_TYPE`]) ?? '';
		const thisCategory = `${EnvVariableCategory.O23_TYPEORM}-[${dataSourceName}]`;
		typeormGroups[dataSourceName].push(...O23TypeOrmVariableSuffixes.filter(variable => {
			return variable.dialects.includes(EnvTypeOrmVariableDialect.ALL) || variable.dialects.includes(dataSourceType as EnvTypeOrmVariableDialect);
		}).map(variable => {
			const key = `${O23TypeOrmVariablePrefix}${dataSourceName}_${variable.name}`;
			used[key] = true;
			return {...variable, name: key, category: thisCategory};
		}));
		// given key might not be declared in particular datasource type, push into this data source manually
		if (used[key] !== true) {
			const variable = O23TypeOrmVariableSuffixes.find(variable => {
				return key === `${O23TypeOrmVariablePrefix}${dataSourceName}_${variable.name}`;
			});
			typeormGroups[dataSourceName].push({...variable, name: key, category: thisCategory});
		}
	}
};
const UnknownAwsKey = '$UnknownAwsKey';
const guessAwsClientName = (key: string): string => {
	const afterPrefix = key.substring(O23ServerPluginAWSClientVariablePrefix.length);
	const index = O23ServerPluginAWSClientVariableSuffixNames.findIndex(suffix => afterPrefix.endsWith(suffix));
	if (index === -1) {
		return UnknownAwsKey;
	} else {
		return afterPrefix.slice(0, -O23ServerPluginAWSClientVariableSuffixNames[index].length) || UnknownAwsKey;
	}
};
const arrangeAsAwsVariable = (key: string, awsGroups: VariableGroup, used: UsedKeyMap) => {
	const clientName = guessAwsClientName(key);
	if (clientName === UnknownAwsKey) {
		// not predefined aws client keys, push into
		awsGroups[UnknownAwsKey].push({
			name: key, category: EnvVariableCategory.O23_SERVER_PLUGIN_AWS_CLIENT, type: EnvVariableValueType.TEXT
		});
	} else {
		if (awsGroups[clientName] == null) {
			awsGroups[clientName] = [];
		}
		const thisCategory = `${EnvVariableCategory.O23_SERVER_PLUGIN_AWS_CLIENT}-[${clientName}]`;
		awsGroups[clientName].push(...O23ServerPluginAWSClientVariableSuffixes.map(variable => {
			const key = `${O23ServerPluginAWSClientVariablePrefix}${clientName}_${variable.name}`;
			used[key] = true;
			return {...variable, name: key, category: thisCategory};
		}));
	}
};
const UnknownAwsS3Key = '$UnknownAwsS3Key';
const guessAwsS3ClientName = (key: string): string => {
	const afterPrefix = key.substring(O23ServerPluginAWSS3VariablePrefix.length);
	const index = O23ServerPluginAWSS3VariableSuffixNames.findIndex(suffix => afterPrefix.endsWith(suffix));
	if (index === -1) {
		return UnknownAwsS3Key;
	} else {
		return afterPrefix.slice(0, -O23ServerPluginAWSS3VariableSuffixNames[index].length) || UnknownAwsS3Key;
	}
};
const arrangeAsAwsS3Variable = (key: string, awsGroups: VariableGroup, used: UsedKeyMap) => {
	const clientName = guessAwsS3ClientName(key);
	if (clientName === UnknownAwsS3Key) {
		// not predefined aws client keys, push into
		awsGroups[UnknownAwsS3Key].push({
			name: key, category: EnvVariableCategory.O23_SERVER_PLUGIN_AWS_S3, type: EnvVariableValueType.TEXT
		});
	} else {
		if (awsGroups[clientName] == null) {
			awsGroups[clientName] = [];
		}
		const thisCategory = `${EnvVariableCategory.O23_SERVER_PLUGIN_AWS_S3}-[${clientName}]`;
		awsGroups[clientName].push(...O23ServerPluginAWSS3VariableSuffixes.map(variable => {
			const key = `${O23ServerPluginAWSS3VariablePrefix}${clientName}_${variable.name}`;
			used[key] = true;
			return {...variable, name: key, category: thisCategory};
		}));
	}
};
export const arrangeAsVariables = (module: F1ModuleStructure, command: ModuleCommand, dependencies: ModuleDependencies, values: EnvValues): Array<EnvVariableDef> => {
	const groups: VariableGroup = {
		[EnvVariableCategory.O23_BASIC]: [...O23BasicVariables],
		[EnvVariableCategory.O23_APP]: [],
		[EnvVariableCategory.O23_SERVER_BASIC]: [...O23ServerBasicVariables],
		[EnvVariableCategory.O23_SERVER_ERROR_LOG]: [...O23ServerErrorLogVariables],
		[EnvVariableCategory.O23_SERVER_COMBINED_LOG]: [...O23ServerCombineLogVariables],
		[EnvVariableCategory.O23_SERVER_CONSOLE_LOG]: [...O23ServerConsoleLogVariables],
		[EnvVariableCategory.O23_SCRIPTS_BASIC]: [...O23ScriptsBasicVariables],
		[EnvVariableCategory.O23_PIPELINE]: [...O23PipelineVariables],
		[EnvVariableCategory.O23_TYPEORM]: [...O23TypeOrmVariables],
		[EnvVariableCategory.O23_ENDPOINT]: [],
		[EnvVariableCategory.O23_SERVER_PIPELINE]: [...O23ServerPipelineVariables],
		[EnvVariableCategory.O23_SERVER_PLUGIN_PRINT]: [...O23ServerPluginPrintVariables],
		[EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF]: [...O23ServerPluginPrintPdfVariables],
		[EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_CSV]: [...O23ServerPluginPrintCsvVariables],
		[EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_XLSX]: [...O23ServerPluginPrintExcelVariables],
		[EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_DOCX]: [...O23ServerPluginPrintWordVariables],
		[EnvVariableCategory.O23_SERVER_PLUGIN_AWS]: [],
		[EnvVariableCategory.O23_SERVER_PLUGIN_AWS_CLIENT]: [],
		[EnvVariableCategory.O23_SERVER_PLUGIN_AWS_S3]: [...O23ServerPluginAWSS3Variables],
		[EnvVariableCategory.OTHERS]: []
	};
	/** key is datasource name */
	const typeormGroups: VariableGroup = {[UnknownTypeOrmKey]: []};
	/** key is system code */
	const endpointGroups: Record<string, EndpointSystem> = {};
	const awsGroups: VariableGroup = {[UnknownAwsKey]: [], [UnknownAwsS3Key]: []};

	const used: UsedKeyMap = [
		...Object.values(groups).flat()
	].reduce((used, variable) => {
		used[variable.name] = true;
		return used;
	}, {} as UsedKeyMap);

	Object.keys(values).forEach(key => {
		if (used[key] === true) {
			// ignore
			return;
		}
		const category = guessCategory(key, command);
		if (category === EnvVariableCategory.O23_TYPEORM) {
			arrangeAsTypeOrmVariable(key, values, typeormGroups, used);
		} else if (category === EnvVariableCategory.O23_SERVER_PLUGIN_AWS_CLIENT) {
			arrangeAsAwsVariable(key, awsGroups, used);
		} else if (category === EnvVariableCategory.O23_SERVER_PLUGIN_AWS_S3) {
			arrangeAsAwsS3Variable(key, awsGroups, used);
		} else {
			groups[category].push({name: key, category, type: EnvVariableValueType.TEXT});
		}
		used[key] = true;
	});

	// TODO POST WORK ON AWS GROUPS, TYPEORM GROUPS AND ENDPOINT GROUPS
	// POST WORK ON MODULE TYPE, COMMAND TYPE

	return [
		EnvVariableCategory.O23_BASIC,
		EnvVariableCategory.O23_APP,
		EnvVariableCategory.O23_SERVER_BASIC,
		EnvVariableCategory.O23_SERVER_ERROR_LOG,
		EnvVariableCategory.O23_SERVER_COMBINED_LOG,
		EnvVariableCategory.O23_SERVER_CONSOLE_LOG,
		EnvVariableCategory.O23_SCRIPTS_BASIC,
		EnvVariableCategory.O23_PIPELINE,
		EnvVariableCategory.O23_TYPEORM,
		EnvVariableCategory.O23_ENDPOINT,
		EnvVariableCategory.O23_SERVER_PIPELINE,
		EnvVariableCategory.O23_SERVER_PLUGIN_PRINT,
		EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_CSV,
		EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_XLSX,
		EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_DOCX,
		EnvVariableCategory.O23_SERVER_PLUGIN_AWS,
		EnvVariableCategory.O23_SERVER_PLUGIN_AWS_CLIENT,
		EnvVariableCategory.O23_SERVER_PLUGIN_AWS_S3,
		EnvVariableCategory.OTHERS
	].map(category => {
		return groups[category];
	}).flat();
};
