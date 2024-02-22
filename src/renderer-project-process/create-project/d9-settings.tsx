import {useState} from 'react';
import {InvalidMessage} from '../../renderer-common/widgets';
import {D9ModuleDependencies, D9ModuleSettings, F1ProjectSettings} from '../../shared';
import {Component} from './component';
import {ModuleSettings} from './module-settings';
import {ModuleSettingsState, ProjectModuleBase} from './types';
import {useModuleValidate} from './use-module-validate';
import {validateD9N3N5, validateModuleName, validateModuleNameDuplication} from './utils';
import {ComponentsTitle} from './widgets';

interface D9SettingsState extends ModuleSettingsState {
	n3n5Message?: string;
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
			const n3n5Message = validateD9N3N5(dependencies['@rainbow-d9/n3'], dependencies['@rainbow-d9/n5']);
			setState(state => ({...state, nameMessage, n3n5Message}));
		}
	});

	const onComponentSelectionChanged = (key: keyof D9ModuleDependencies) => (selected: boolean) => {
		dependencies[key] = selected;
		if (key === '@rainbow-d9/n3' || key === '@rainbow-d9/n5') {
			const message = validateD9N3N5(dependencies['@rainbow-d9/n3'], dependencies['@rainbow-d9/n5']);
			setState(state => ({...state, n3n5Message: message}));
		}
	};

	return <ModuleSettings project={project} module={module} base={ProjectModuleBase.MODULE} index={index}
	                       title="D9 Module Settings"
	                       state={state} setState={setState}>
		<ComponentsTitle>Official components</ComponentsTitle>
		<Component name="@rainbow-d9/n3" description="Markdown page configuration parsing module."
		           fixed={onComponentSelectionChanged('@rainbow-d9/n3')}
		           defaultUse={dependencies['@rainbow-d9/n3'] ?? false}/>
		<Component name="@rainbow-d9/n5" description="YAML page configuration parsing module."
		           fixed={onComponentSelectionChanged('@rainbow-d9/n5')}
		           defaultUse={dependencies['@rainbow-d9/n5'] ?? true}/>
		{state.n3n5Message != null
			? <InvalidMessage data-columns-12>{state.n3n5Message}</InvalidMessage>
			: null}
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
	</ModuleSettings>;
};
