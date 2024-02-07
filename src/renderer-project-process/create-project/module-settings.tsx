import {useForceUpdate, VUtils} from '@rainbow-d9/n1';
import {UnwrappedCaption, UnwrappedInput} from '@rainbow-d9/n2';
import {ReactNode, useEffect, useRef, useState} from 'react';
import {InvalidMessage} from '../../renderer-common/widgets';
import {F1ModuleSettings} from '../../shared/project-settings';
import {CreateProjectEventTypes, useCreateProjectEventBus} from './event-bus';
import {ProjectModuleBase} from './types';
import {ModuleSettingsContainer, ModuleSettingsTitle} from './widgets';

interface ModuleSettingsState {
	nameMessage?: string;
}

export const ModuleSettings = (props: {
	settings: F1ModuleSettings; base: ProjectModuleBase; index: number;
	title: string; children?: ReactNode
}) => {
	const {
		settings, base, index,
		title, children
	} = props;

	const {fire} = useCreateProjectEventBus();
	const inputRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<ModuleSettingsState>({});
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const onNameChanged = (value: string) => {
		settings.name = value;
		fire(CreateProjectEventTypes.MODULE_NAME_CHANGED, base, index, settings);
		if (VUtils.isBlank(value)) {
			setState(state => ({...state, nameMessage: 'Please fill in the module name.'}));
		} else if (/[\\\/]/.test(value)) {
			setState(state => ({...state, nameMessage: 'Module name cannot contain / or \\.'}));
		} else {
			setState(state => ({...state, nameMessage: (void 0)}));
		}
	};

	return <ModuleSettingsContainer>
		<ModuleSettingsTitle>{title}</ModuleSettingsTitle>
		<UnwrappedCaption data-columns-2>Name:</UnwrappedCaption>
		<UnwrappedInput onValueChange={onNameChanged} value={settings.name ?? ''} data-columns-10 ref={inputRef}/>
		{state.nameMessage != null
			? <InvalidMessage data-column-3 data-columns-10>{state.nameMessage}</InvalidMessage>
			: null}
		{children}
	</ModuleSettingsContainer>;
};