import {D9ModuleSettings} from '../../shared/project-settings';
import {Component} from './component';
import {ModuleSettings} from './module-settings';
import {ProjectModuleBase} from './types';
import {ComponentsTitle} from './widgets';

export const D9Settings = (props: { settings: D9ModuleSettings; index: number }) => {
	const {settings, index} = props;

	return <ModuleSettings settings={settings} base={ProjectModuleBase.D9} index={index}
	                       title="D9 Module Settings">
		<ComponentsTitle>Official components</ComponentsTitle>
		<Component name="@rainbow-d9/n1"
		           description="Basic module, including high-level component definitions and standard behavior implementations."
		           fixed={true}/>
		<Component name="@rainbow-d9/n2"
		           description="Widgets module, including a set of standard basic widgets, such as input, dropdown, calendar, and so on."
		           fixed={true}/>
		<Component name="@rainbow-d9/n3" description="Markdown page configuration parsing module."
		           fixed={false} defaultUse={false}/>
		<Component name="@rainbow-d9/n5" description="YAML page configuration parsing module."
		           fixed={false} defaultUse={true}/>
		<Component name="@rainbow-d9/echarts" description="Widgets module based on ECharts"
		           fixed={false} defaultUse={false}/>
		<ComponentsTitle>Community components</ComponentsTitle>
		<Component name="@rainbow-d9/thai-plan-selection" description="Insurance product plan comparison widget."
		           fixed={false} defaultUse={false}/>
	</ModuleSettings>;
};
