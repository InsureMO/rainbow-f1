import {SideFrame} from '../opened/sides/side-bar';
import {SideContentKey, SideContentPosition} from '../opened/workbench/event-bus';

export const SearchFrame = (props: { position: SideContentPosition }) => {
	const {position} = props;

	return <SideFrame title="Find" contentKey={SideContentKey.SEARCH} contentPosition={position}>

	</SideFrame>;
};
