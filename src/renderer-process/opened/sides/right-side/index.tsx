import {DatabaseIcon, NotificationIcon} from '../../../../assets/icons';
import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {switchFrame} from '../frames';
import {SideBarButton, SideContentResizeOn} from '../side-bar';
import {RightBar, RightContent, RightSideContainer} from './widgets';

const RightBarUppers = () => {
	return <>
		<SideBarButton icon={<NotificationIcon/>} tooltip="Notifications" left={true}
		               contentPosition={SideContentPosition.RIGHT_UPPER} contentKey={SideContentKey.NOTIFICATIONS}/>
		<SideBarButton icon={<DatabaseIcon/>} tooltip="Database" left={true}
		               contentPosition={SideContentPosition.RIGHT_UPPER} contentKey={SideContentKey.DATABASE}/>
	</>;
};

export const RightSide = () => {
	return <RightSideContainer>
		<RightContent resizeOn={SideContentResizeOn.LEFT}
		              positions={[SideContentPosition.RIGHT_UPPER, SideContentPosition.RIGHT_LOWER]}
		              switchFrame={switchFrame}/>
		<RightBar uppers={<RightBarUppers/>}/>
	</RightSideContainer>;
};
