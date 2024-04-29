import {ReactNode} from 'react';
import {DatabaseFrame} from '../../database-frame';
import {NotificationsFrame} from '../../notifications-frame';
import {ProblemFrame} from '../../problem-frame';
import {ProjectFrame} from '../../project-frame';
import {RunFrame} from '../../run-frame';
import {SearchFrame} from '../../search-frame';
import {StructureFrame} from '../../structure-frame';
import {TerminalFrame} from '../../terminal-frame';
import {TodoFrame} from '../../todo-frame';
import {SideContentKey, SideContentPosition} from '../workbench/event-bus';

export interface SideFrame {
	key: SideContentKey;
	pos: SideContentPosition;
	keep: boolean;
	element: ReactNode;
}

export const switchFrame = (key: SideContentKey, pos: SideContentPosition): SideFrame | undefined => {
	switch (key) {
		case SideContentKey.PROJECT:
			return {key, pos, keep: true, element: <ProjectFrame position={pos}/>};
		case SideContentKey.STRUCTURE:
			return {key, pos, keep: false, element: <StructureFrame position={pos}/>};
		case SideContentKey.NOTIFICATIONS:
			return {key, pos, keep: false, element: <NotificationsFrame position={pos}/>};
		case SideContentKey.DATABASE:
			return {key, pos, keep: false, element: <DatabaseFrame position={pos}/>};
		case SideContentKey.TODO:
			return {key, pos, keep: false, element: <TodoFrame position={pos}/>};
		case SideContentKey.SEARCH:
			return {key, pos, keep: false, element: <SearchFrame position={pos}/>};
		case SideContentKey.RUN:
			return {key, pos, keep: true, element: <RunFrame position={pos}/>};
		case SideContentKey.TERMINAL:
			return {key, pos, keep: true, element: <TerminalFrame position={pos}/>};
		case SideContentKey.PROBLEM:
			return {key, pos, keep: false, element: <ProblemFrame position={pos}/>};
		default:
			return (void 0);
	}
};
