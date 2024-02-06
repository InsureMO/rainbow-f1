import {Dialog, GlobalEventBusProvider, YesNoDialog} from '@rainbow-d9/n2';
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
					<RecentProjects/>
					<Bar/>
				</CreateOrRecentContent>
			</CreateOrRecentContainer>
		</RecentProjectsEventBusProvider>
	</GlobalEventBusProvider>;
};
