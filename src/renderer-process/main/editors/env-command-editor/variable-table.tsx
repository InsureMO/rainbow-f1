import {PropValue, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, UnwrappedCaption, UnwrappedDropdown} from '@rainbow-d9/n2';
import {Fragment, useState} from 'react';
import {F1ModuleStructure} from '../../../../shared';
import {ModuleCommandResource} from '../../opened/types';
import {EnvValues, ModuleDependencies} from './env-values-wrapper';
import {EnvVariableCategory, EnvVariableCategoryExt} from './variable-types';
import {arrangeAsVariables, getVariableValue} from './variable-utils';
import {EnvCommandVariable} from './widgets';

const AllVariableCategory = '';

interface CategoryFilterState {
	category: EnvVariableCategory | EnvVariableCategoryExt;
}

export interface VariableTableProps {
	module: F1ModuleStructure;
	resource: ModuleCommandResource;
	values: EnvValues;
	dependencies: ModuleDependencies;
}

export const VariableTable = (props: VariableTableProps) => {
	const {module, resource, values, dependencies} = props;
	const {command} = resource;

	const [categoryFilter, setCategoryFilter] = useState<CategoryFilterState>({category: AllVariableCategory});

	const allVariables = arrangeAsVariables(module, command, dependencies, values);
	const displayVariables = allVariables.filter(({category}) => {
		return VUtils.isEmpty(categoryFilter.category) || category === categoryFilter.category;
	});

	const categoryFilterOptions: DropdownOptions = [
		{value: AllVariableCategory, label: 'All Category'},
		...[...new Set(allVariables.map(variable => variable.category))]
			.sort((c1, c2) => c1.localeCompare(c2, (void 0), {sensitivity: 'base'}))
			.map(category => ({value: category, label: category.replace(/-/g, ' ').replace(/^o23\s/, '')}))
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
		{displayVariables.map((variable, index) => {
			const value = getVariableValue(values[variable.name], '');
			return <Fragment key={variable.name}>
				<UnwrappedCaption data-role="command-variable-column-cell"
				                  data-cell-role="command-variable-cell-row-index">
					{index + 1}.
				</UnwrappedCaption>
				<UnwrappedCaption data-role="command-variable-column-cell">
					{variable.name}
				</UnwrappedCaption>
				<UnwrappedCaption data-role="command-variable-column-cell">
					{value}
				</UnwrappedCaption>
				<UnwrappedCaption data-role="command-variable-column-cell"
				                  data-cell-role="command-variable-cell-category">
					{variable.category.replace(/-/g, ' ')
						.replace(/^o23\s/, '')}
				</UnwrappedCaption>
			</Fragment>;
		})}
	</EnvCommandVariable>;
};