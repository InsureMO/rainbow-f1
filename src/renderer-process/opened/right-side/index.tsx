import {DatabaseIcon, NotificationIcon} from '../../../assets/icons';
import {SideBarButton} from '../side-bar';
import {RightBar, RightBarContainer, RightContainer} from './widgets';

const RightBarUppers = () => {
	return <>
		<SideBarButton icon={<NotificationIcon/>} tooltip="Notifications" left={true}/>
		<SideBarButton icon={<DatabaseIcon/>} tooltip="Database" left={true}/>
	</>;
};

export const RightSide = () => {
	return <RightBarContainer>
		<RightContainer/>
		<RightBar uppers={<RightBarUppers/>}/>
	</RightBarContainer>;
};
