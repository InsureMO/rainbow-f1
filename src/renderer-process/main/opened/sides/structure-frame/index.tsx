import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {SideFrame} from '../side-bar';

export const StructureFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Structure" contentKey={SideContentKey.STRUCTURE} contentPosition={position}>

	</SideFrame>;
};
