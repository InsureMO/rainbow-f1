import {useForceUpdate} from '@rainbow-d9/n1';
import {useEffect} from 'react';
import {RecentProjectsEventTypes, useRecentProjectsEventBus} from './event-bus';

export const useRepaint = () => {
	const {on, off} = useRecentProjectsEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onRepaint = () => {
			forceUpdate();
		};
		on(RecentProjectsEventTypes.REPAINT, onRepaint);
		return () => {
			off(RecentProjectsEventTypes.REPAINT, onRepaint);
		};
	}, [on, off]);
};