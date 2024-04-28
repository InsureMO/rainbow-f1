import {SideFrame} from '../opened/sides/side-bar';
import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';

export const RunFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Run" contentKey={SideContentKey.RUN} contentPosition={position}>

	</SideFrame>;
};
