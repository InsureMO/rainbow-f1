import {UnwrappedCaption} from '@rainbow-d9/n2';
import {Fragment} from 'react';
import {ModuleCommandResource} from '../../opened/types';
import {O23AppServerVariables} from './variable-constants';
import {EnvCommandVariable} from './widgets';

export interface VariableSectionProps {
	resource: ModuleCommandResource;
}

export const VariableSection = (props: VariableSectionProps) => {
	const {resource} = props;
	const {env, command} = resource;

	if (env == null) {
		return null;
	}

	return <EnvCommandVariable>
		<UnwrappedCaption data-role="command-variable-title">Environment Variables</UnwrappedCaption>
		<UnwrappedCaption data-role="command-variable-column-header"/>
		<UnwrappedCaption data-role="command-variable-column-header">Name</UnwrappedCaption>
		<UnwrappedCaption data-role="command-variable-column-header">Value</UnwrappedCaption>
		<UnwrappedCaption data-role="command-variable-column-header">Category</UnwrappedCaption>
		{O23AppServerVariables.map((variable, index) => {
			return <Fragment key={variable.name}>
				<UnwrappedCaption data-role="command-variable-column-cell">
					{index + 1}.
				</UnwrappedCaption>
				<UnwrappedCaption data-role="command-variable-column-cell">
					{variable.name}
				</UnwrappedCaption>
				<UnwrappedCaption data-role="command-variable-column-cell">
				</UnwrappedCaption>
				<UnwrappedCaption data-role="command-variable-column-cell"
				                  data-cell-role="command-variable-cell-category">
					{variable.category.replace(/-/g, ' ')}
				</UnwrappedCaption>
			</Fragment>;
		})}
	</EnvCommandVariable>;
};
