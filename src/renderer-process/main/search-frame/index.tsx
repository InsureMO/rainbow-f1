import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';
import {SideFrame} from '../opened/sides/side-bar';

export const SearchFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Find" contentKey={SideContentKey.SEARCH} contentPosition={position}>

	</SideFrame>;
};
