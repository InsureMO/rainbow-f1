import {GlobalEventBusProvider, UnwrappedCaption} from '@rainbow-d9/n2';
import {Logo} from '../../renderer-common/icons';
import {Bar} from './bar';
import {Content} from './context';
import {CreateProjectEventBusProvider} from './event-bus';
import {SideBar} from './side-bar';
import {CreateProjectContainer} from './widgets';

export const CreateProjectPage = () => {
	return <GlobalEventBusProvider>
		<CreateProjectEventBusProvider>
			<CreateProjectContainer>
				<UnwrappedCaption data-page-title={true}>Project settings</UnwrappedCaption>
				<Logo/>
				<SideBar/>
				<Content/>
				<Bar/>
			</CreateProjectContainer>
		</CreateProjectEventBusProvider>
	</GlobalEventBusProvider>;
};
