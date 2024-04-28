import {SideFrame} from '../opened/sides/side-bar';
import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';

export const NotificationsFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Notifications" contentKey={SideContentKey.NOTIFICATIONS} contentPosition={position}>

	</SideFrame>;
};
