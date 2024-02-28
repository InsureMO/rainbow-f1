import {SideFrame} from '../side-bar';
import {SideContentKey, SideContentPosition} from '../side-bar/event-bus';

export const NotificationsFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Notifications" contentKey={SideContentKey.NOTIFICATIONS} contentPosition={position}>

	</SideFrame>;
};
