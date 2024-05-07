import {SideFrame} from '../../opened/sides/side-bar';
import {SideContentKey, SideContentPosition} from '../../opened/workbench/event-bus';

export const DatabaseFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Database" contentKey={SideContentKey.DATABASE} contentPosition={position}>

	</SideFrame>;
};
