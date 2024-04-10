import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {SideFrame} from '../opened/sides/side-bar';

export const TerminalFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Terminal" contentKey={SideContentKey.TERMINAL} contentPosition={position}>

	</SideFrame>;
};
