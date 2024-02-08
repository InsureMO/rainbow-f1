import {VUtils} from '@rainbow-d9/n1';
import {ButtonFill, ButtonInk, UnwrappedButton, UnwrappedCaption, UnwrappedDecorateInput} from '@rainbow-d9/n2';
import {useState} from 'react';
import {F1ProjectSettings} from '../../shared/project-settings';
import {ProjectModuleBase} from './types';
import {useModuleValidate} from './use-module-validate';
import {ModuleSettingsContainer, ModuleSettingsTitle} from './widgets';

interface EnvsSettingsState {
}

export const EnvsSettings = (props: { project: F1ProjectSettings }) => {
	const {project} = props;

	const [state, setState] = useState<EnvsSettingsState>({});

	useModuleValidate({
		base: ProjectModuleBase.BASIC, index: 0, validate: async () => {
		}
	});

	const onDirClicked = () => {
		// const result = window.electron.dialog.open({
		// 	title: 'Select project directory',
		// 	properties: ['openDirectory', 'dontAddToRecent', 'createDirectory'],
		// 	buttonLabel: 'Select'
		// });
		// if (result.canceled) {
		// 	return;
		// }
		//
		// project.directory = result.filePaths[0];
		// const message = validateProjectDirectory(project.directory);
		// setState(state => ({...state, directoryMessage: message}));
		// if (VUtils.isEmpty(project.name) && message == null) {
		// 	project.name = window.electron.path.basename(project.directory);
		// }
	};

	return <ModuleSettingsContainer>
		<ModuleSettingsTitle>Environment Settings</ModuleSettingsTitle>
		<UnwrappedCaption data-columns-2>Node:</UnwrappedCaption>
		<UnwrappedDecorateInput onValueChange={VUtils.noop} value={project.directory ?? ''}
		                        data-di-columns-10 data-di-dir readOnly
		                        tails={[<UnwrappedButton onClick={onDirClicked} fill={ButtonFill.PLAIN}
		                                                 ink={ButtonInk.PRIMARY}
		                                                 tails={['$icons.f1FolderClosedEmpty']}/>]}/>
		{/*{state.nameMessage != null*/}
		{/*	? <InvalidMessage data-column-3 data-columns-10>{state.nameMessage}</InvalidMessage>*/}
		{/*	: null}*/}
		<UnwrappedCaption data-columns-2>Npm:</UnwrappedCaption>
		<UnwrappedDecorateInput onValueChange={VUtils.noop} value={project.directory ?? ''}
		                        data-di-columns-10 data-di-dir readOnly
		                        tails={[<UnwrappedButton onClick={onDirClicked} fill={ButtonFill.PLAIN}
		                                                 ink={ButtonInk.PRIMARY}
		                                                 tails={['$icons.f1FolderClosedEmpty']}/>]}/>
		<UnwrappedCaption data-columns-2>Yarn:</UnwrappedCaption>
		<UnwrappedDecorateInput onValueChange={VUtils.noop} value={project.directory ?? ''}
		                        data-di-columns-10 data-di-dir readOnly
		                        tails={[<UnwrappedButton onClick={onDirClicked} fill={ButtonFill.PLAIN}
		                                                 ink={ButtonInk.PRIMARY}
		                                                 tails={['$icons.f1FolderClosedEmpty']}/>]}/>
		<UnwrappedCaption data-columns-2>Volta:</UnwrappedCaption>
		<UnwrappedDecorateInput onValueChange={VUtils.noop} value={project.directory ?? ''}
		                        data-di-columns-10 data-di-dir readOnly
		                        tails={[<UnwrappedButton onClick={onDirClicked} fill={ButtonFill.PLAIN}
		                                                 ink={ButtonInk.PRIMARY}
		                                                 tails={['$icons.f1FolderClosedEmpty']}/>]}/>
	</ModuleSettingsContainer>;
};
