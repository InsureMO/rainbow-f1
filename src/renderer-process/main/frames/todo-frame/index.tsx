import {SideFrame} from '../../opened/sides/side-bar';
import {SideContentKey, SideContentPosition} from '../../opened/workbench/event-bus';

export const TodoFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="TODO" contentKey={SideContentKey.TODO} contentPosition={position}>

	</SideFrame>;
};
