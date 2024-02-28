import {Icons} from '@rainbow-d9/n2';
import {DatabaseIcon} from './database';
import {FolderRootIcon} from './folder-root';
import {MinusIcon} from './minus';
import {NotificationIcon} from './notification';
import {ProblemIcon} from './problem';
import {ProjectIcon} from './project';
import {RunIcon} from './run';
import {SearchIcon} from './search';
import {SettingsIcon} from './settings';
import {StructureIcon} from './structure';
import {TerminalIcon} from './terminal';
import {TodoIcon} from './todo';

Icons.Registrar.register({
	f1Database: () => <DatabaseIcon/>,
	f1FolderRoot: () => <FolderRootIcon/>,
	f1Minus: () => <MinusIcon/>,
	f1Notification: () => <NotificationIcon/>,
	f1Problem: () => <ProblemIcon/>,
	f1Project: () => <ProjectIcon/>,
	f1Run: () => <RunIcon/>,
	f1Search: () => <SearchIcon/>,
	f1Settings: () => <SettingsIcon/>,
	f1Structure: () => <StructureIcon/>,
	f1Terminal: () => <TerminalIcon/>,
	f1Todo: () => <TodoIcon/>
});

export {
	DatabaseIcon,
	FolderRootIcon,
	MinusIcon,
	NotificationIcon,
	ProblemIcon, ProjectIcon,
	RunIcon,
	SearchIcon, SettingsIcon, StructureIcon,
	TerminalIcon, TodoIcon
};
