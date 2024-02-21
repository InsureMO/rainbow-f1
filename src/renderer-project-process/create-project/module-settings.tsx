import {UnwrappedCaption, UnwrappedInput} from '@rainbow-d9/n2';
import {Dispatch, ReactNode, SetStateAction, useEffect, useRef} from 'react';
import {InvalidMessage} from '../../renderer-common/widgets';
import {F1ModuleSettings, F1ProjectSettings} from '../../shared';
import {CreateProjectEventTypes, useCreateProjectEventBus} from './event-bus';
import {ModuleSettingsState, ProjectModuleBase} from './types';
import {validateModuleName, validateModuleNameDuplication} from './utils';
import {ModuleSettingsContainer, ModuleSettingsTitle} from './widgets';

export const ModuleSettings = (props: {
	project: F1ProjectSettings; module: F1ModuleSettings; base: ProjectModuleBase; index: number;
	title: string; children?: ReactNode;
	state: ModuleSettingsState; setState: Dispatch<SetStateAction<ModuleSettingsState>>;
}) => {
	const {
		project, module, base, index,
		title, children, state, setState
	} = props;

	const {fire} = useCreateProjectEventBus();
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const onNameChanged = (value: string) => {
		module.name = value;
		let message = validateModuleName(module.name);
		if (message == null) {
			message = validateModuleNameDuplication({settings: project, base, index});
		}
		setState(state => ({...state, nameMessage: message}));
		fire(CreateProjectEventTypes.MODULE_NAME_CHANGED, base, index, module);
	};

	return <ModuleSettingsContainer>
		<ModuleSettingsTitle>{title}</ModuleSettingsTitle>
		<UnwrappedCaption data-columns-2>Name:</UnwrappedCaption>
		<UnwrappedInput onValueChange={onNameChanged} value={module.name ?? ''} data-columns-10 ref={inputRef}/>
		{state.nameMessage != null
			? <InvalidMessage data-column-3 data-columns-10>{state.nameMessage}</InvalidMessage>
			: null}
		{children}
	</ModuleSettingsContainer>;
};
