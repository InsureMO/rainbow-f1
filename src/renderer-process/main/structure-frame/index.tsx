import {SideFrame} from '../opened/sides/side-bar';
import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';

export const StructureFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Structure" contentKey={SideContentKey.STRUCTURE} contentPosition={position}>

	</SideFrame>;
};
