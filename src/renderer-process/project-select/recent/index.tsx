import {Dialog, GlobalEventBusProvider, UnwrappedCaption, YesNoDialog} from '@rainbow-d9/n2';
import {Logo} from '../../common/icons';
import {Bar} from './bar';
import {RecentProjectsEventBusProvider} from './event-bus';
import {RecentProjects} from './recent-projects';
import {CreateOrRecentContainer, CreateOrRecentContent} from './widgets';

export const CreateOrRecentPage = () => {
	return <GlobalEventBusProvider>
		<RecentProjectsEventBusProvider>
			<Dialog/>
			<YesNoDialog/>
			<CreateOrRecentContainer>
				<CreateOrRecentContent>
					<UnwrappedCaption data-page-title>Recent projects...</UnwrappedCaption>
					<Logo/>
					<RecentProjects/>
					<Bar/>
				</CreateOrRecentContent>
			</CreateOrRecentContainer>
		</RecentProjectsEventBusProvider>
	</GlobalEventBusProvider>;
};
