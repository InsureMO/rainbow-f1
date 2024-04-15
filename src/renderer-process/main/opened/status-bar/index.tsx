import {LogoIcon} from '../../../../assets/icons';
import {StatusBarContainer, StatusBarSegment, StatusBarSpaceHolder} from './widgets';

export const StatusBar = () => {
	return <StatusBarContainer>
		<StatusBarSpaceHolder/>
		<StatusBarSegment><LogoIcon/></StatusBarSegment>
	</StatusBarContainer>;
};
