import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {SideFrame} from '../side-bar';

export const DatabaseFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Database" contentKey={SideContentKey.DATABASE} contentPosition={position}>

	</SideFrame>;
};
