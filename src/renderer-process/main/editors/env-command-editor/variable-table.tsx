import {PropValue, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, UnwrappedCaption, UnwrappedDropdown} from '@rainbow-d9/n2';
import {Fragment, useState} from 'react';
import {F1ModuleStructure, ModuleCommand} from '../../../../shared';
import {ModuleCommandResource} from '../../opened/types';
import {isD9Module, isO23Module} from '../../utils';
import {EnvValues} from './env-values-wrapper';
import {
	EnvTypeOrmVariableDialect,
	EnvVariableCategory,
	EnvVariableDef,
	EnvVariableValueType,
	O23ScriptsVariables,
	O23ServerVariables,
	O23TypeOrmTypeVariableSuffix,
	O23TypeOrmVariablePrefix,
	O23TypeOrmVariables
} from './variable-constants';
import {EnvCommandVariable} from './widgets';

const AllVariableCategory = '';

interface CategoryFilterState {
	category: EnvVariableCategory | typeof AllVariableCategory;
}

const askVariablesBase = (module: F1ModuleStructure, command: ModuleCommand): Array<EnvVariableDef> => {
	switch (true) {
		case isO23Module(module):
			return command.name.endsWith('start') ? [...O23ServerVariables] : [...O23ScriptsVariables];
		case isD9Module(module):
		default:
			return [];
	}
};

const findTypeOrmDataSourcesVariables = (values: EnvValues): Array<EnvVariableDef> => {
	const datasources = Object.entries(values)
		.filter(([key]) => key.startsWith(O23TypeOrmVariablePrefix) && key.endsWith(O23TypeOrmTypeVariableSuffix))
		.map(([key, value]) => {
			return {
				name: key.substring(O23TypeOrmVariablePrefix.length).slice(0, 0 - O23TypeOrmTypeVariableSuffix.length),
				type: (value?.[0]?.value) as unknown as EnvTypeOrmVariableDialect,
				variables: []
			};
		});
	// sort by name length, so that the longer name will be processed first
	const used: Record<string, boolean> = {};
	[...datasources]
		.sort((ds1, ds2) => ds2.name.length - ds1.name.length)
		.forEach(datasource => {
			const {name, type: datasourceType} = datasource;
			const predefined = O23TypeOrmVariables
				.filter(({dialects}) => {
					// predefined variable which for all dialects or for given type
					return dialects.includes(EnvTypeOrmVariableDialect.ALL) || dialects.includes(datasourceType);
				})
				.map(({name: suffix, type, validate}) => {
					const key = `${O23TypeOrmVariablePrefix}${name}_${suffix}`;
					used[key] = true;
					return {
						name: key, category: `${EnvVariableCategory.O23_TYPEORM}-${datasourceType}-[${name}]`,
						type, validate
					} as EnvVariableDef;
				});
			// and not predefined, also need to be discovered
			const extended = Object.keys(values)
				.filter(key => key.startsWith(`${O23TypeOrmVariablePrefix}${name}_`))
				.filter(key => used[key] == null)
				.sort((k1, k2) => k1.localeCompare(k2, (void 0), {sensitivity: 'base'}))
				.map(key => {
					used[key] = true;
					return {
						name: key, category: `${EnvVariableCategory.O23_TYPEORM}-${datasourceType}-[${name}]`,
						// always treated as text, and no validate available
						type: EnvVariableValueType.TEXT
					} as EnvVariableDef;
				});

			datasource.variables = [...predefined, ...extended];
		});
	return datasources.map(({variables}) => variables).flat();
};

export interface VariableTableProps {
	module: F1ModuleStructure;
	resource: ModuleCommandResource;
	values: EnvValues;
}

export const VariableTable = (props: VariableTableProps) => {
	const {module, resource, values} = props;
	const {command} = resource;

	const [categoryFilter, setCategoryFilter] = useState<CategoryFilterState>({category: AllVariableCategory});

	const allVariables = askVariablesBase(module, command);
	const variables = [
		...allVariables,
		...findTypeOrmDataSourcesVariables(values)
	];
	const displayVariables = variables.filter(({category}) => {
		return VUtils.isEmpty(categoryFilter.category) || category === categoryFilter.category;
	});

	const categoryFilterOptions: DropdownOptions = [
		{value: AllVariableCategory, label: 'All Category'},
		...[...new Set(variables.map(variable => variable.category))]
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
		{displayVariables.map((variable, index) => {
			const value = (values[variable.name] ?? [])[0]?.value ?? '';
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
						.replace('o23 ', '')}
				</UnwrappedCaption>
			</Fragment>;
		})}
	</EnvCommandVariable>;
};