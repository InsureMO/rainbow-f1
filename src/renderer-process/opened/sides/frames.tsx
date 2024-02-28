import {SideContentKey, SideContentPosition} from '../workbench/event-bus';
import {DatabaseFrame} from './database-frame';
import {NotificationsFrame} from './notifications-frame';
import {ProblemFrame} from './problem-frame';
import {ProjectFrame} from './project-frame';
import {RunFrame} from './run-frame';
import {SearchFrame} from './search-frame';
import {StructureFrame} from './structure-frame';
import {TerminalFrame} from './terminal-frame';
import {TodoFrame} from './todo-frame';

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
		case SideContentKey.TODO:
			return <TodoFrame position={pos}/>;
		case SideContentKey.SEARCH:
			return <SearchFrame position={pos}/>;
		case SideContentKey.RUN:
			return <RunFrame position={pos}/>;
		case SideContentKey.TERMINAL:
			return <TerminalFrame position={pos}/>;
		case SideContentKey.PROBLEM:
			return <ProblemFrame position={pos}/>;
		default:
			return (void 0);
	}
};
