import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {SideFrame} from '../opened/sides/side-bar';

export const ProblemFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Problems" contentKey={SideContentKey.PROBLEM} contentPosition={position}>

	</SideFrame>;
};
