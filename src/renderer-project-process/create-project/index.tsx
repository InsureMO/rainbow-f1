import {GlobalEventBusProvider, UnwrappedCaption} from '@rainbow-d9/n2';
import {Logo} from '../../renderer-common/icons';
import {F1ProjectSettings} from '../../shared/project-settings';
import {Bar} from './bar';
import {Content} from './content';
import {CreateProjectEventBusProvider} from './event-bus';
import {SideBar} from './side-bar';
import {CreateProjectContainer} from './widgets';

export const CreateProjectPage = () => {
	const settings: F1ProjectSettings = {
		name: '', d9: [{name: ''}], o23: [{name: ''}]
	};

	return <GlobalEventBusProvider>
		<CreateProjectEventBusProvider>
			<CreateProjectContainer>
				<UnwrappedCaption data-page-title={true}>Project settings</UnwrappedCaption>
				<Logo/>
				<SideBar settings={settings}/>
				<Content settings={settings}/>
				<Bar/>
			</CreateProjectContainer>
		</CreateProjectEventBusProvider>
	</GlobalEventBusProvider>;
};
