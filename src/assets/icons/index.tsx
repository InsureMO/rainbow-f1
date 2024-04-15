import {Icons} from '@rainbow-d9/n2';
import React from 'react';
import {DatabaseIcon} from './database';
import {EllipsisVerticalIcon} from './ellipsis-vertical';
import {FolderClosedIcon} from './folder-closed';
import {FolderClosedEmptyIcon} from './folder-closed-empty';
import {FolderOpenIcon} from './folder-open';
import {FolderRootIcon} from './folder-root';
import {FunctionIcon} from './function';
import {LogoIcon} from './logo';
import {MinusIcon} from './minus';
import {ModuleRootIcon} from './module-root';
import {NotificationIcon} from './notification';
import {ProblemIcon} from './problem';
import {ProjectIcon} from './project';
import {ProjectRootIcon} from './project-root';
import {RunIcon} from './run';
import {SearchIcon} from './search';
import {SettingsIcon} from './settings';
import {StructureIcon} from './structure';
import {TerminalIcon} from './terminal';
import {TodoIcon} from './todo';

Icons.Registrar.register({
	f1Database: () => <DatabaseIcon/>,
	f1FolderRoot: () => <FolderRootIcon/>,
	f1Function: () => <FunctionIcon/>,
	f1Minus: () => <MinusIcon/>,
	f1Notification: () => <NotificationIcon/>,
	f1Problem: () => <ProblemIcon/>,
	f1Project: () => <ProjectIcon/>,
	f1Run: () => <RunIcon/>,
	f1Search: () => <SearchIcon/>,
	f1Settings: () => <SettingsIcon/>,
	f1Structure: () => <StructureIcon/>,
	f1Terminal: () => <TerminalIcon/>,
	f1Todo: () => <TodoIcon/>,
	f1FolderOpen: () => <FolderOpenIcon/>,
	f1FolderClosed: () => <FolderClosedIcon/>,
	f1FolderClosedEmpty: () => <FolderClosedEmptyIcon/>,
	f1EllipsisVertical: () => <EllipsisVerticalIcon/>,
	f1ProjectRoot: () => <ProjectRootIcon/>,
	f1ModuleRoot: () => <ModuleRootIcon/>
});

export {
	DatabaseIcon,
	FolderRootIcon, FunctionIcon,
	MinusIcon,
	NotificationIcon,
	ProblemIcon, ProjectIcon,
	RunIcon,
	SearchIcon, SettingsIcon, StructureIcon,
	TerminalIcon, TodoIcon,

	FolderOpenIcon, FolderClosedIcon, FolderClosedEmptyIcon,

	EllipsisVerticalIcon,

	ProjectRootIcon, ModuleRootIcon,

	LogoIcon
};
