import {VUtils} from '@rainbow-d9/n1';
import {D9ModuleSettings} from '../../shared/project-settings';
import {ModuleSettings} from './module-settings';
import {ProjectModuleBase} from './types';

export const D9Settings = (props: { settings: D9ModuleSettings; index: number }) => {
	const {settings, index} = props;

	if (VUtils.isEmpty(settings.name)) {
		settings.name = `awesome-d9`;
	}

	return <ModuleSettings settings={settings} base={ProjectModuleBase.D9} index={index}
	                       title="D9 Module Settings">
	</ModuleSettings>;
};
