import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {SideFrame} from '../opened/sides/side-bar';

export const DatabaseFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Database" contentKey={SideContentKey.DATABASE} contentPosition={position}>

	</SideFrame>;
};
