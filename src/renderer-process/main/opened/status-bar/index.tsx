import {Logo} from '../../../common/icons';
import {StatusBarContainer, StatusBarSegment, StatusBarSpaceHolder} from './widgets';

export const StatusBar = () => {
	return <StatusBarContainer>
		<StatusBarSpaceHolder/>
		<StatusBarSegment><Logo/></StatusBarSegment>
	</StatusBarContainer>;
};
