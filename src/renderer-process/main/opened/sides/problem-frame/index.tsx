import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {SideFrame} from '../side-bar';

export const ProblemFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Problems" contentKey={SideContentKey.PROBLEM} contentPosition={position}>

	</SideFrame>;
};
