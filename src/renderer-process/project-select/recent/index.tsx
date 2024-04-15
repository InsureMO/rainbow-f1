import {GlobalRoot, UnwrappedCaption} from '@rainbow-d9/n2';
import React from 'react';
import {Logo} from '../../common/icons';
import {Bar} from './bar';
import {RecentProjectsEventBusProvider} from './event-bus';
import {RecentProjectsSection} from './recent-projects';
import {RecentContainer, RecentContent} from './widgets';

export const CreateOrRecentPage = () => {
	return <RecentProjectsEventBusProvider>
		<GlobalRoot avoidDefaultRemoteRequest={true}>
			<RecentContainer>
				<RecentContent>
					<UnwrappedCaption data-page-title>Recent projects...</UnwrappedCaption>
					<Logo/>
					<RecentProjectsSection/>
					<Bar/>
				</RecentContent>
			</RecentContainer>
		</GlobalRoot>
	</RecentProjectsEventBusProvider>;
};
