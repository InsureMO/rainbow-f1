import {useState} from 'react';
import {D9ModuleDependencies, F1ProjectSettings, O23ModuleSettings} from '../../shared';
import {Component} from './component';
import {ModuleSettings} from './module-settings';
import {ModuleSettingsState, ProjectModuleBase} from './types';
import {useModuleValidate} from './use-module-validate';
import {validateModuleName, validateModuleNameDuplication} from './utils';
import {ComponentsTitle} from './widgets';

export const O23Settings = (props: { project: F1ProjectSettings; module: O23ModuleSettings; index: number }) => {
	const {project, module, index} = props;
	const {dependencies} = module;

	const [state, setState] = useState<ModuleSettingsState>({});
	useModuleValidate({
		base: ProjectModuleBase.MODULE, index, validate: async () => {
			let nameMessage = validateModuleName(module.name);
			if (nameMessage == null) {
				nameMessage = validateModuleNameDuplication({settings: project, base: ProjectModuleBase.O23, index});
			}
			setState(state => ({...state, nameMessage}));
		}
	});

	const onComponentSelectionChanged = (key: keyof D9ModuleDependencies) => (selected: boolean) => {
		dependencies[key] = selected;
	};

	return <ModuleSettings project={project} module={module} base={ProjectModuleBase.MODULE} index={index}
	                       title="O23 Module Settings"
	                       state={state} setState={setState}>
		<ComponentsTitle>Plugins</ComponentsTitle>
		<Component name="@rainbow-o23/n91"
		           description={<>
			           Printing package, include docx, csv, xlsx, pdf (puppeteer). <span
			           data-name="">@rainbow-o23/n5</span>, <span data-name="">@rainbow-o23/n6</span>, <span
			           data-name="">@rainbow-o23/n7</span> have been included in this plugin component.
		           </>}
		           fixed={onComponentSelectionChanged('@rainbow-o32/n91')}
		           defaultUse={dependencies['@rainbow-o32/n91'] ?? false}/>
		<Component name="@rainbow-o23/n92"
		           description={<>
			           AWS package, include S3. <span
			           data-name="">@rainbow-o23/n8</span> have been included in this plugin component.
		           </>}
		           fixed={onComponentSelectionChanged('@rainbow-o32/n92')}
		           defaultUse={dependencies['@rainbow-o32/n92'] ?? false}/>
		<ComponentsTitle>Mandatory components</ComponentsTitle>
		<Component name="@rainbow-o23/n90"
		           description={<>
			           Application basic package, which includes all the fundamental settings for building O23
			           applications. <span data-name="">@rainbow-o23/n1</span>, <span
			           data-name="">@rainbow-o23/n2</span>, <span data-name="">@rainbow-o23/n3</span>, <span
			           data-name="">@rainbow-o23/n4</span> have been included in this component.</>}
		           fixed={true}/>
	</ModuleSettings>;
};
