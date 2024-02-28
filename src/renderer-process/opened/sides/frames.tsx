import {ProjectFrame} from './project-frame';
import {SideContentKey, SideContentPosition} from './side-bar/event-bus';

export const switchFrame = (key: SideContentKey, pos: SideContentPosition) => {
	switch (key) {
		case SideContentKey.PROJECT:
			return <ProjectFrame position={pos}/>;
		default:
			return (void 0);
	}
};
