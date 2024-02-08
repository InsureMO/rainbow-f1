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
import {InvalidMessage} from '../../renderer-common/widgets';
import {F1ProjectSettings} from '../../shared/project-settings';
import {ProjectModuleBase} from './types';
import {useModuleValidate} from './use-module-validate';
import {ModuleSettingsContainer, ModuleSettingsTitle} from './widgets';

interface BasicSettingsState {
	nameMessage?: string;
	directoryMessage?: string;
}

const validateName = (name?: string) => {
	if (VUtils.isBlank(name)) {
		return 'Please fill in the project name.';
	} else if (/[\\\/]/.test(value)) {
		return 'Project name cannot contain / or \\.';
	} else {
		return (void 0);
	}
};
const validateDirectory = (directory?: string) => {
	if (VUtils.isBlank(directory)) {
		return 'Please select the project directory.';
	}
	if (window.electron.fs.exists(directory).ret && !window.electron.fs.empty(directory).ret) {
		return 'The directory is not empty.';
	} else {
		return (void 0);
	}
};
export const BasicSettings = (props: { settings: F1ProjectSettings }) => {
	const {settings} = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<BasicSettingsState>({});
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useModuleValidate({
		base: ProjectModuleBase.BASIC, index: 0, validate: async () => {
			const nameMessage = validateName(settings.name);
			const directoryMessage = validateDirectory(settings.directory);
			setState(state => ({...state, nameMessage, directoryMessage}));
		}
	});

	const onNameChanged = (value: string) => {
		settings.name = value;
		const message = validateName(settings.name);
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

		settings.directory = result.filePaths[0];
		const message = validateDirectory(settings.directory);
		setState(state => ({...state, directoryMessage: message}));
		if (VUtils.isEmpty(settings.name) && message != null) {
			settings.name = window.electron.path.basename(directory);
		}
	};

	return <ModuleSettingsContainer>
		<ModuleSettingsTitle>Basic Settings</ModuleSettingsTitle>
		<UnwrappedCaption data-columns-2>Name:</UnwrappedCaption>
		<UnwrappedInput onValueChange={onNameChanged} value={settings.name ?? ''} data-columns-10 ref={inputRef}/>
		{state.nameMessage != null
			? <InvalidMessage data-column-3 data-columns-10>{state.nameMessage}</InvalidMessage>
			: null}
		<UnwrappedCaption data-columns-2>Directory:</UnwrappedCaption>
		<UnwrappedDecorateInput onValueChange={VUtils.noop} value={settings.directory ?? ''}
		                        data-di-columns-10 data-di-dir readOnly
		                        tails={[<UnwrappedButton onClick={onDirClicked} fill={ButtonFill.PLAIN}
		                                                 ink={ButtonInk.PRIMARY}
		                                                 tails={['$icons.f1FolderClosedEmpty']}/>]}/>
		{state.directoryMessage != null
			? <InvalidMessage data-column-3 data-columns-10>{state.directoryMessage}</InvalidMessage>
			: null}
	</ModuleSettingsContainer>;
};
