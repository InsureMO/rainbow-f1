import {SideFrame} from '../side-bar';
import {SideContentKey, SideContentPosition} from '../side-bar/event-bus';

export const StructureFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Structure" contentKey={SideContentKey.STRUCTURE} contentPosition={position}>

	</SideFrame>;
};
