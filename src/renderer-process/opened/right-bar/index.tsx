import {DatabaseIcon, NotificationIcon} from '../../../assets/icons';
import {SideBarButton} from '../side-bar';
import {RightBarContainer} from './widgets';

const RightBarUppers = () => {
	return <>
		<SideBarButton icon={<NotificationIcon/>} tooltip="Notifications" left={true}/>
		<SideBarButton icon={<DatabaseIcon/>} tooltip="Database" left={true}/>
	</>;
};

export const RightBar = () => {
	return <RightBarContainer uppers={<RightBarUppers/>}/>;
};
