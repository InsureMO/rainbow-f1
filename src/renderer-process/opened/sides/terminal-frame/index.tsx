import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {SideFrame} from '../side-bar';

export const TerminalFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Terminal" contentKey={SideContentKey.TERMINAL} contentPosition={position}>

	</SideFrame>;
};
