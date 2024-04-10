import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {SideFrame} from '../opened/sides/side-bar';

export const StructureFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Structure" contentKey={SideContentKey.STRUCTURE} contentPosition={position}>

	</SideFrame>;
};
