import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {SideFrame} from '../side-bar';

export const ProjectFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Project" contentKey={SideContentKey.PROJECT} contentPosition={position}>

	</SideFrame>;
};
