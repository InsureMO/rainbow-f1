import {useCreateEventBus} from '@rainbow-d9/n1';
import {createContext, ReactNode, useContext} from 'react';

export enum RecentProjectsEventTypes {
	REPAINT = 'repaint',
}

export interface RecentProjectsEventBus {
	fire(type: RecentProjectsEventTypes.REPAINT): this;

	on(type: RecentProjectsEventTypes.REPAINT, listener: () => void): this;

	off(type: RecentProjectsEventTypes.REPAINT, listener: () => void): this;
}

const Context = createContext<RecentProjectsEventBus>({} as RecentProjectsEventBus);
Context.displayName = 'EventBus';

export const RecentProjectsEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<RecentProjectsEventBus>('recent-projects');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useRecentProjectsEventBus = () => useContext(Context);