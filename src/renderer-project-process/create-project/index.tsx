import {Alert, GlobalEventBusProvider, UnwrappedCaption} from '@rainbow-d9/n2';
import {Logo} from '../../renderer-common/icons';
import {F1ProjectSettings} from '../../shared/project-settings';
import {Bar} from './bar';
import {Content} from './content';
import {CreateProjectEventBusProvider} from './event-bus';
import {SideBar} from './side-bar';
import {createF1ProjectSettings} from './utils';
import {CreateProjectContainer} from './widgets';

export const CreateProjectPage = () => {
	const settings: F1ProjectSettings = createF1ProjectSettings();

	return <GlobalEventBusProvider>
		<CreateProjectEventBusProvider>
			<Alert/>
			<CreateProjectContainer>
				<UnwrappedCaption data-page-title>Project settings</UnwrappedCaption>
				<Logo/>
				<SideBar settings={settings}/>
				<Content settings={settings}/>
				<Bar settings={settings}/>
			</CreateProjectContainer>
		</CreateProjectEventBusProvider>
	</GlobalEventBusProvider>;
};
