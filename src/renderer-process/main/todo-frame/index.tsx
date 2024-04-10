import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {SideFrame} from '../opened/sides/side-bar';

export const TodoFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="TODO" contentKey={SideContentKey.TODO} contentPosition={position}>

	</SideFrame>;
};
