import {GlobalEventBusProvider, UnwrappedCaption} from '@rainbow-d9/n2';
import {Logo} from '../../renderer-common/icons';
import {Bar} from './bar';
import {CreateProjectContainer, CreateProjectContent, CreateProjectSidebar} from './widgets';

export const CreateProjectPage = () => {
	return <GlobalEventBusProvider>
		<CreateProjectContainer>
			<UnwrappedCaption data-page-title={true}>Project settings</UnwrappedCaption>
			<Logo/>
			<CreateProjectSidebar>
			</CreateProjectSidebar>
			<CreateProjectContent>
			</CreateProjectContent>
			<Bar/>
		</CreateProjectContainer>
	</GlobalEventBusProvider>;
};
