import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {SideFrame} from '../side-bar';

export const SearchFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Find" contentKey={SideContentKey.SEARCH} contentPosition={position}>

	</SideFrame>;
};
