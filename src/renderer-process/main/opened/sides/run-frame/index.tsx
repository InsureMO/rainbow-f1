import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {SideFrame} from '../side-bar';

export const RunFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Run" contentKey={SideContentKey.RUN} contentPosition={position}>

	</SideFrame>;
};
