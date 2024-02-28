import {SideFrame} from '../side-bar';
import {SideContentKey, SideContentPosition} from '../side-bar/event-bus';

export const ProjectFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Project" contentKey={SideContentKey.PROJECT} contentPosition={position}>

	</SideFrame>;
};
