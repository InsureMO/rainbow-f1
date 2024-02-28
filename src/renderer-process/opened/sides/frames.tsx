import {DatabaseFrame} from './database-frame';
import {NotificationsFrame} from './notifications-frame';
import {ProjectFrame} from './project-frame';
import {SideContentKey, SideContentPosition} from './side-bar/event-bus';
import {StructureFrame} from './structure-frame';

export const switchFrame = (key: SideContentKey, pos: SideContentPosition) => {
	switch (key) {
		case SideContentKey.PROJECT:
			return <ProjectFrame position={pos}/>;
		case SideContentKey.STRUCTURE:
			return <StructureFrame position={pos}/>;
		case SideContentKey.NOTIFICATIONS:
			return <NotificationsFrame position={pos}/>;
		case SideContentKey.DATABASE:
			return <DatabaseFrame position={pos}/>;
		default:
			return (void 0);
	}
};
