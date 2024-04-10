import {useForceUpdate} from '@rainbow-d9/n1';
import {GlobalRoot, UnwrappedCaption} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import {Logo} from '../../common/icons';
import {Bar} from './bar';
import {Content} from './content';
import {CreateProjectEventBusProvider} from './event-bus';
import {SideBar} from './side-bar';
import {createF1ProjectSettings, createF1ProjectSettingsEnvs} from './utils';
import {CreateProjectContainer} from './widgets';

export const CreateProjectPage = () => {
	const [settings] = useState(createF1ProjectSettings());

	const forceUpdate = useForceUpdate();
	useEffect(() => {
		(async () => {
			await createF1ProjectSettingsEnvs(settings);
			forceUpdate();
		})();
	}, []);

	return <GlobalRoot avoidDefaultRemoteRequest={true} avoidDefaultDialog={true} avoidDefaultYesNoDialog={true}>
		<CreateProjectEventBusProvider>
			<CreateProjectContainer>
				<UnwrappedCaption data-page-title>Project settings</UnwrappedCaption>
				<Logo/>
				<SideBar settings={settings}/>
				<Content settings={settings}/>
				<Bar settings={settings}/>
			</CreateProjectContainer>
		</CreateProjectEventBusProvider>
	</GlobalRoot>;
};
