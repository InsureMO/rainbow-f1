import {VUtils} from '@rainbow-d9/n1';
import {O23ModuleSettings} from '../../shared/project-settings';
import {ModuleSettings} from './module-settings';
import {ProjectModuleBase} from './types';

export const O23Settings = (props: { settings: O23ModuleSettings; index: number }) => {
	const {settings, index} = props;

	if (VUtils.isEmpty(settings.name)) {
		settings.name = `awesome-o23`;
	}

	return <ModuleSettings settings={settings} base={ProjectModuleBase.D9} index={index}
	                       title="O23 Module Settings">
	</ModuleSettings>;
};
