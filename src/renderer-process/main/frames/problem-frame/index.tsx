import {SideFrame} from '../../opened/sides/side-bar';
import {SideContentKey, SideContentPosition} from '../../opened/workbench/event-bus';

export const ProblemFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Problems" contentKey={SideContentKey.PROBLEM} contentPosition={position}>

	</SideFrame>;
};
