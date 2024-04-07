import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {SideFrame} from '../side-bar';

export const TodoFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="TODO" contentKey={SideContentKey.TODO} contentPosition={position}>

	</SideFrame>;
};
