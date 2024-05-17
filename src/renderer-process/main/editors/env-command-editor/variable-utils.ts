import {F1ModuleStructure, ModuleCommand} from '../../../../shared';
import {EnvItemValue, EnvValues, ModuleDependencies} from './env-values-wrapper';
import {EnvVariableDef, EnvVariableValueValidator} from './variable-types';

export const AnyValueAccepted: EnvVariableValueValidator = () => ({success: true});
export const getVariableValue = (values: Array<EnvItemValue>, defaultValue?: string): Undefinable<string> => {
	return (values ?? []).find(value => !value.commented)?.value ?? defaultValue;
};

interface EndpointApi {
	code: string;
	variables: Array<EnvVariableDef>;
}

interface EndpointSystem {
	code: string;
	variables: Array<EnvVariableDef>;
	apis: Record<string, EndpointApi>;
}

export const arrangeAsVariables = (module: F1ModuleStructure, command: ModuleCommand, dependencies: ModuleDependencies, values: EnvValues): Array<EnvVariableDef> => {
	const groups: Record<string, Array<EnvVariableDef>> = {};
	/** key is datasource name */
	const typeormGroups: Record<string, Array<EnvVariableDef>> = {};
	/** key is system code */
	const endpointGroups: Record<string, EndpointSystem> = {};

	return [];
};
