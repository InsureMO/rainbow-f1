import {useForceUpdate, VUtils} from '@rainbow-d9/n1';
import {
	ButtonFill,
	ButtonInk,
	UnwrappedButton,
	UnwrappedCaption,
	UnwrappedDecorateInput,
	UnwrappedInput
} from '@rainbow-d9/n2';
import {useEffect, useRef, useState} from 'react';
import {F1ProjectSettings} from '../../shared/project-settings';
import {ModuleSettingsContainer, ModuleSettingsTitle} from './widgets';

export const BasicSettings = (props: { settings: F1ProjectSettings }) => {
	const {settings} = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const [directory, setDirectory] = useState('');
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const onNameChanged = (value: string) => {
		settings.name = value;
		forceUpdate();
	};
	const onDirClicked = () => {
		const result = window.electron.dialog.open({
			title: 'Select project directory',
			properties: ['openDirectory', 'dontAddToRecent', 'createDirectory'],
			buttonLabel: 'Select'
		});
		console.log(result);
		if (result.canceled) {
			return;
		}

		setDirectory(result.filePaths[0]);
	};



	return <ModuleSettingsContainer>
		<ModuleSettingsTitle>Basic Settings</ModuleSettingsTitle>
		<UnwrappedCaption data-column-2>Name:</UnwrappedCaption>
		<UnwrappedInput onValueChange={onNameChanged} value={settings.name ?? ''} data-column-10 ref={inputRef}/>
		<UnwrappedCaption data-column-2>Directory:</UnwrappedCaption>
		<UnwrappedDecorateInput onValueChange={VUtils.noop} value={directory}
		                        data-di-column-10 data-di-dir readOnly
		                        tails={[<UnwrappedButton onClick={onDirClicked} fill={ButtonFill.PLAIN}
		                                                 ink={ButtonInk.PRIMARY}
		                                                 tails={['$icons.f1FolderClosedEmpty']}/>]}/>
	</ModuleSettingsContainer>;
};
