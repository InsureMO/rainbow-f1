import {VUtils} from '@rainbow-d9/n1';
import {
	ButtonFill,
	ButtonInk,
	UnwrappedButton,
	UnwrappedCaption,
	UnwrappedDecorateInput,
	UnwrappedInput
} from '@rainbow-d9/n2';
import {useEffect, useRef, useState} from 'react';
import {InvalidMessage} from '../../common/widgets';
import {F1ProjectSettings} from '../../../shared';
import {ProjectModuleBase} from './types';
import {useModuleValidate} from './use-module-validate';
import {validateProjectDirectory, validateProjectName} from './utils';
import {ModuleSettingsContainer, ModuleSettingsTitle} from './widgets';

interface BasicSettingsState {
	nameMessage?: string;
	directoryMessage?: string;
}

export const BasicSettings = (props: { project: F1ProjectSettings }) => {
	const {project} = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<BasicSettingsState>({});
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useModuleValidate({
		base: ProjectModuleBase.BASIC, index: 0, validate: async () => {
			const nameMessage = validateProjectName(project.name);
			const directoryMessage = validateProjectDirectory(project.directory);
			setState(state => ({...state, nameMessage, directoryMessage}));
		}
	});

	const onNameChanged = (value: string) => {
		project.name = value;
		const message = validateProjectName(project.name);
		setState(state => ({...state, nameMessage: message}));
	};
	const onDirClicked = () => {
		const result = window.electron.dialog.open({
			title: 'Select project directory',
			properties: ['openDirectory', 'dontAddToRecent', 'createDirectory'],
			buttonLabel: 'Select'
		});
		if (result.canceled) {
			return;
		}

		project.directory = result.filePaths[0];
		const message = validateProjectDirectory(project.directory);
		if (VUtils.isEmpty(project.name) && message == null) {
			project.name = window.electron.path.basename(project.directory);
			setState(state => ({...state, nameMessage: (void 0), directoryMessage: (void 0)}));
		} else {
			setState(state => ({...state, directoryMessage: message}));
		}
	};

	return <ModuleSettingsContainer>
		<ModuleSettingsTitle>Basic Settings</ModuleSettingsTitle>
		<UnwrappedCaption data-columns-2>Name:</UnwrappedCaption>
		<UnwrappedInput onValueChange={onNameChanged} value={project.name ?? ''} data-columns-10 ref={inputRef}/>
		{state.nameMessage != null
			? <InvalidMessage data-column-3 data-columns-10>{state.nameMessage}</InvalidMessage>
			: null}
		<UnwrappedCaption data-columns-2>Directory:</UnwrappedCaption>
		<UnwrappedDecorateInput onValueChange={VUtils.noop} value={project.directory ?? ''}
		                        data-di-columns-10 data-di-dir readOnly
		                        tails={[<UnwrappedButton onClick={onDirClicked} fill={ButtonFill.PLAIN}
		                                                 ink={ButtonInk.PRIMARY}
		                                                 tails={['$icons.f1FolderClosedEmpty']}/>]}/>
		{state.directoryMessage != null
			? <InvalidMessage data-column-3 data-columns-10>{state.directoryMessage}</InvalidMessage>
			: null}
	</ModuleSettingsContainer>;
};
