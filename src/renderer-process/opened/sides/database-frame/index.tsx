import {SideFrame} from '../side-bar';
import {SideContentKey, SideContentPosition} from '../side-bar/event-bus';

export const DatabaseFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Database" contentKey={SideContentKey.DATABASE} contentPosition={position}>

	</SideFrame>;
};
