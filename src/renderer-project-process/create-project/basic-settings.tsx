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
import {ModuleSettingsContainer, ModuleSettingsTitle} from './widgets';

interface BasicSettingsState {
	nameMessage?: string;
	directoryMessage?: string;
}

export const BasicSettings = (props: { settings: F1ProjectSettings }) => {
	const {settings} = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<BasicSettingsState>({});
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const onNameChanged = (value: string) => {
		settings.name = value;
		if (VUtils.isBlank(value)) {
			setState(state => ({...state, nameMessage: 'Please fill in the project name.'}));
		} else if (/[\\\/]/.test(value)) {
			setState(state => ({...state, nameMessage: 'Project name cannot contain / or \\.'}));
		} else {
			setState(state => ({...state, nameMessage: (void 0)}));
		}
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

		const directory = result.filePaths[0];
		settings.directory = directory;
		if (window.electron.fs.exists(directory).ret && !window.electron.fs.empty(directory).ret) {
			setState(state => ({...state, directoryMessage: 'The directory is not empty.'}));
		} else {
			if (VUtils.isEmpty(settings.name)) {
				settings.name = window.electron.path.basename(directory);
			}
			setState(state => ({...state, directoryMessage: (void 0)}));
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
