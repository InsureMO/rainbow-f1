import {useState} from 'react';
import {D9ModuleDependencies, D9ModuleSettings, F1ProjectSettings} from '../../shared';
import {Component} from './component';
import {ModuleSettings} from './module-settings';
import {ModuleSettingsState, ProjectModuleBase} from './types';
import {useModuleValidate} from './use-module-validate';
import {validateModuleName, validateModuleNameDuplication} from './utils';
import {ComponentsTitle} from './widgets';

interface D9SettingsState extends ModuleSettingsState {
}

export const D9Settings = (props: { project: F1ProjectSettings; module: D9ModuleSettings; index: number }) => {
	const {project, module, index} = props;
	const {dependencies} = module;

	const [state, setState] = useState<D9SettingsState>({});
	useModuleValidate({
		base: ProjectModuleBase.MODULE, index, validate: async () => {
			let nameMessage = validateModuleName(module.name);
			if (nameMessage == null) {
				nameMessage = validateModuleNameDuplication({settings: project, base: ProjectModuleBase.MODULE, index});
			}
			setState(state => ({...state, nameMessage}));
		}
	});

	const onComponentSelectionChanged = (key: keyof D9ModuleDependencies) => (selected: boolean) => {
		dependencies[key] = selected;
	};

	return <ModuleSettings project={project} module={module} base={ProjectModuleBase.MODULE} index={index}
	                       title="D9 Module Settings"
	                       state={state} setState={setState}>
		<ComponentsTitle>Official components</ComponentsTitle>
		<Component name="@rainbow-d9/echarts" description="Widgets module based on ECharts"
		           fixed={onComponentSelectionChanged('@rainbow-d9/echarts')}
		           defaultUse={dependencies['@rainbow-d9/echarts'] ?? false}/>
		<ComponentsTitle>Community components</ComponentsTitle>
		<Component name="@rainbow-d9/thai-plan-selection" description="Insurance product plan comparison widget."
		           fixed={onComponentSelectionChanged('@rainbow-d9/thai-plan-selection')}
		           defaultUse={dependencies['@rainbow-d9/thai-plan-selection'] ?? false}/>
		<ComponentsTitle>Mandatory components</ComponentsTitle>
		<Component name="@rainbow-d9/n1"
		           description="Basic module, including high-level component definitions and standard behavior implementations."
		           fixed={true}/>
		<Component name="@rainbow-d9/n2"
		           description="Widgets module, including a set of standard basic widgets, such as input, dropdown, calendar, and so on."
		           fixed={true}/>
		<Component name="@rainbow-d9/n3"
		           description="Markdown page configuration parsing module."
		           fixed={true}/>
	</ModuleSettings>;
};
