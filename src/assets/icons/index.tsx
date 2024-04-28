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
import {ModuleCommandIcon} from './module-command';
import {ModuleCommandsIcon} from './module-commands';
import {ModuleDBScriptsIcon} from './module-db-scripts';
import {ModuleEnvsIcon} from './module-envs';
import {ModuleNodeFilesIcon} from './module-node-files';
import {ModulePipelineIcon} from './module-pipeline';
import {ModulePipelinesIcon} from './module-pipelines';
import {ModuleRootIcon} from './module-root';
import {ModuleScriptsIcon} from './module-scripts';
import {ModuleServerIcon} from './module-server';
import {ModuleSourceFilesIcon} from './module-source-files';
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
	f1ModuleRoot: () => <ModuleRootIcon/>,
	f1ModuleEnvs: () => <ModuleEnvsIcon/>,
	f1ModuleServer: () => <ModuleServerIcon/>,
	f1ModuleScripts: () => <ModuleScriptsIcon/>,
	f1ModuleDBScripts: () => <ModuleDBScriptsIcon/>,
	f1ModuleCommands: () => <ModuleCommandsIcon/>,
	f1ModuleCommand: () => <ModuleCommandIcon/>,
	f1ModuleNodeFiles: () => <ModuleNodeFilesIcon/>,
	f1ModuleSourceFiles: () => <ModuleSourceFilesIcon/>,
	f1ModulePipelines: () => <ModulePipelinesIcon/>,
	f1ModulePipeline: () => <ModulePipelineIcon/>
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
	ModuleEnvsIcon, ModuleServerIcon, ModuleScriptsIcon, ModuleDBScriptsIcon, ModuleCommandsIcon, ModuleCommandIcon,
	ModuleNodeFilesIcon, ModuleSourceFilesIcon, ModulePipelinesIcon, ModulePipelineIcon,

	LogoIcon
};
