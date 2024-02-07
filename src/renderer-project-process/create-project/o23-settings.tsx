import {O23ModuleSettings} from '../../shared/project-settings';
import {Component} from './component';
import {ModuleSettings} from './module-settings';
import {ProjectModuleBase} from './types';
import {ComponentsTitle} from './widgets';

export const O23Settings = (props: { settings: O23ModuleSettings; index: number }) => {
	const {settings, index} = props;

	return <ModuleSettings settings={settings} base={ProjectModuleBase.D9} index={index}
	                       title="O23 Module Settings">
		<ComponentsTitle>Standard components</ComponentsTitle>
		<Component name="@rainbow-o23/n90"
		           description="Application basic package, which includes all the fundamental settings for building O23 applications."
		           fixed={true}/>
		<ComponentsTitle>Plugin components</ComponentsTitle>
		<Component name="@rainbow-o23/n91"
		           description="Printing package, include docx, csv, xlsx, pdf (puppeteer)."
		           fixed={false} defaultUse={false}/>
	</ModuleSettings>;
};
