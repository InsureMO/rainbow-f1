import {DatabaseIcon, NotificationIcon} from '../../../../assets/icons';
import {switchFrame} from '../frames';
import {SideBarButton, SideContentResizeOn} from '../side-bar';
import {SideContentKey, SideContentPosition} from '../side-bar/event-bus';
import {RightBar, RightContent, RightSideContainer} from './widgets';

const RightBarUppers = () => {
	return <>
		<SideBarButton icon={<NotificationIcon/>} tooltip="Notifications" left={true}
		               contentPosition={SideContentPosition.UPPER} contentKey={SideContentKey.NOTIFICATIONS}/>
		<SideBarButton icon={<DatabaseIcon/>} tooltip="Database" left={true}
		               contentPosition={SideContentPosition.UPPER} contentKey={SideContentKey.DATABASE}/>
	</>;
};

export const RightSide = () => {
	return <RightSideContainer>
		<RightContent resizeOn={SideContentResizeOn.LEFT} switchFrame={switchFrame}/>
		<RightBar uppers={<RightBarUppers/>}/>
	</RightSideContainer>;
};
