import {PropValue, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, UnwrappedCaption, UnwrappedDropdown} from '@rainbow-d9/n2';
import {Fragment, useState} from 'react';
import {F1ModuleStructure, ModuleCommand} from '../../../../shared';
import {ModuleCommandResource} from '../../opened/types';
import {isD9Module, isO23Module} from '../../utils';
import {EnvVariableCategory, EnvVariableDef, O23ScriptsVariables, O23ServerVariables} from './variable-constants';
import {EnvCommandVariable} from './widgets';

export interface VariableSectionProps {
	resource: ModuleCommandResource;
}

const AllVariableCategory = '';

interface CategoryFilterState {
	category: EnvVariableCategory | typeof AllVariableCategory;
}

const askVariablesBase = (module: F1ModuleStructure, command: ModuleCommand): Array<EnvVariableDef> => {
	switch (true) {
		case isO23Module(module):
			return command.name.endsWith('start') ? [...O23ServerVariables] : [...O23ScriptsVariables];
		case isD9Module(module):
		// TODO GET D9 MODULE VARIABLE BASE
		default:
			return [];
	}
};

export const VariableSection = (props: VariableSectionProps) => {
	const {resource} = props;
	const {module: getModule, env, command} = resource;
	const [categoryFilter, setCategoryFilter] = useState<CategoryFilterState>({category: AllVariableCategory});

	if (env == null) {
		return null;
	}

	const module = getModule();
	const allVariables = askVariablesBase(module, command);
	const variables = allVariables.filter(({category}) => {
		return VUtils.isEmpty(categoryFilter.category) || category === categoryFilter.category;
	});

	const categoryFilterOptions: DropdownOptions = [
		{value: AllVariableCategory, label: 'All Category'},
		...[...new Set(allVariables.map(variable => variable.category))]
			.sort((c1, c2) => c1.localeCompare(c2, (void 0), {sensitivity: 'base'}))
			.map(category => ({value: category, label: category.replace(/-/g, ' ').replace('o23 ', '')}))
	];
	const onCategoryChanged = (value: PropValue) => {
		setCategoryFilter({category: value as unknown as CategoryFilterState['category']});
	};

	return <EnvCommandVariable>
		<UnwrappedCaption data-role="command-variable-title">Environment Variables</UnwrappedCaption>
		<UnwrappedCaption data-role="command-variable-column-header"/>
		<UnwrappedCaption data-role="command-variable-column-header">Name</UnwrappedCaption>
		<UnwrappedCaption data-role="command-variable-column-header">Value</UnwrappedCaption>
		<UnwrappedCaption data-role="command-variable-column-header">
			<UnwrappedDropdown value={categoryFilter.category as unknown as PropValue} options={categoryFilterOptions}
			                   onValueChange={onCategoryChanged}
			                   clearable={false}/>
		</UnwrappedCaption>
		{variables.map((variable, index) => {
			return <Fragment key={variable.name}>
				<UnwrappedCaption data-role="command-variable-column-cell"
				                  data-cell-role="command-variable-cell-row-index">
					{index + 1}.
				</UnwrappedCaption>
				<UnwrappedCaption data-role="command-variable-column-cell">
					{variable.name}
				</UnwrappedCaption>
				<UnwrappedCaption data-role="command-variable-column-cell">
				</UnwrappedCaption>
				<UnwrappedCaption data-role="command-variable-column-cell"
				                  data-cell-role="command-variable-cell-category">
					{variable.category.replace(/-/g, ' ')
						.replace('o23 ', '')}
				</UnwrappedCaption>
			</Fragment>;
		})}
	</EnvCommandVariable>;
};
