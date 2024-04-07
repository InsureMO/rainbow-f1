import {Dialog, GlobalEventBusProvider, UnwrappedCaption, YesNoDialog} from '@rainbow-d9/n2';
import {Logo} from '../../common/icons';
import {Bar} from './bar';
import {RecentProjectsEventBusProvider} from './event-bus';
import {RecentProjectsSection} from './recent-projects';
import {RecentContainer, RecentContent} from './widgets';

export const CreateOrRecentPage = () => {
	return <GlobalEventBusProvider>
		<RecentProjectsEventBusProvider>
			<Dialog/>
			<YesNoDialog/>
			<RecentContainer>
				<RecentContent>
					<UnwrappedCaption data-page-title>Recent projects...</UnwrappedCaption>
					<Logo/>
					<RecentProjectsSection/>
					<Bar/>
				</RecentContent>
			</RecentContainer>
		</RecentProjectsEventBusProvider>
	</GlobalEventBusProvider>;
};
