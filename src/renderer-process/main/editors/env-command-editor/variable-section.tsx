import {ModuleCommandResource} from '../../opened/types';
import {EnvValuesWrapper} from './env-values-wrapper';

export interface VariableSectionProps {
	resource: ModuleCommandResource;
}

export const VariableSection = (props: VariableSectionProps) => {
	const {resource} = props;
	const {module: getModule, env} = resource;

	if (env == null) {
		return null;
	}

	const module = getModule();

	return <EnvValuesWrapper module={module} resource={resource}/>;
};
