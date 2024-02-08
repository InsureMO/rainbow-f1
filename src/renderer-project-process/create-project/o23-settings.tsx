import {O23ModuleSettings} from '../../shared/project-settings';
import {Component} from './component';
import {ModuleSettings} from './module-settings';
import {ProjectModuleBase} from './types';
import {ComponentsTitle} from './widgets';

export const O23Settings = (props: { settings: O23ModuleSettings; index: number }) => {
	const {settings, index} = props;

	return <ModuleSettings settings={settings} base={ProjectModuleBase.D9} index={index}
	                       title="O23 Module Settings">
		<ComponentsTitle>Plugins</ComponentsTitle>
		<Component name="@rainbow-o23/n91"
		           description={<>
			           Printing package, include docx, csv, xlsx, pdf (puppeteer). <span
			           data-name="">@rainbow-o23/n5</span>, <span data-name="">@rainbow-o23/n6</span>, <span
			           data-name="">@rainbow-o23/n7</span> have been included in this plugin component.
		           </>}
		           fixed={false} defaultUse={false}/>
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
