import {Alert, Dialog, GlobalEventBusProvider, UnwrappedCaption, YesNoDialog} from '@rainbow-d9/n2';
import React from 'react';
import {Logo} from '../../common/icons';
import {Bar} from './bar';
import {RecentProjectsEventBusProvider} from './event-bus';
import {RecentProjectsSection} from './recent-projects';
import {RecentContainer, RecentContent} from './widgets';

export const CreateOrRecentPage = () => {
	return <GlobalEventBusProvider>
		<RecentProjectsEventBusProvider>
			<Alert/>
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
