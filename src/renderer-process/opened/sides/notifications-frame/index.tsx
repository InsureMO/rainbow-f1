import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {SideFrame} from '../side-bar';

export const NotificationsFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Notifications" contentKey={SideContentKey.NOTIFICATIONS} contentPosition={position}>

	</SideFrame>;
};
