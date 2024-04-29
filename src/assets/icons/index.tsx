import {Icons} from '@rainbow-d9/n2';
import React from 'react';
import {BabelIcon} from './babel';
import {DatabaseIcon} from './database';
import {EllipsisVerticalIcon} from './ellipsis-vertical';
import {EslintIcon} from './eslint';
import {FolderIcon} from './folder';
import {FolderClosedIcon} from './folder-closed';
import {FolderClosedEmptyIcon} from './folder-closed-empty';
import {FolderOpenIcon} from './folder-open';
import {FolderRootIcon} from './folder-root';
import {FunctionIcon} from './function';
import {JavascriptIcon} from './javascript';
import {LogoIcon} from './logo';
import {MinusIcon} from './minus';
import {ModuleCommandIcon} from './module-command';
import {ModuleCommandsIcon} from './module-commands';
import {ModuleDBScriptsIcon} from './module-db-scripts';
import {ModuleEnvIcon} from './module-env';
import {ModuleEnvsIcon} from './module-envs';
import {ModuleNodeFilesIcon} from './module-node-files';
import {ModulePipelineIcon} from './module-pipeline';
import {ModulePipelinesIcon} from './module-pipelines';
import {ModuleRootIcon} from './module-root';
import {ModuleScriptsIcon} from './module-scripts';
import {ModuleServerIcon} from './module-server';
import {ModuleSourceFilesIcon} from './module-source-files';
import {NestJsIcon} from './nestjs';
import {NotificationIcon} from './notification';
import {O23PipelineIcon} from './o23-pipeline';
import {PackageJsonIcon} from './package-json';
import {PrettierIcon} from './prettier';
import {ProblemIcon} from './problem';
import {ProjectIcon} from './project';
import {ProjectRootIcon} from './project-root';
import {ReadmeIcon} from './readme';
import {RunIcon} from './run';
import {SearchIcon} from './search';
import {SettingsIcon} from './settings';
import {SourceFileIcon} from './source-file';
import {SQLIcon} from './sql';
import {StructureIcon} from './structure';
import {TerminalIcon} from './terminal';
import {TodoIcon} from './todo';
import {TypescriptIcon} from './typescript';
import {TypescriptConfigIcon} from './typescript-config';
import {ViteIcon} from './vite';
import {WebpackIcon} from './webpack';

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
	f1Folder: () => <FolderIcon/>,
	f1SourceFile: () => <SourceFileIcon/>,
	f1EllipsisVertical: () => <EllipsisVerticalIcon/>,
	f1ProjectRoot: () => <ProjectRootIcon/>,
	f1ModuleRoot: () => <ModuleRootIcon/>,
	f1ModuleEnvs: () => <ModuleEnvsIcon/>,
	f1ModuleEnv: () => <ModuleEnvIcon/>,
	f1ModuleServer: () => <ModuleServerIcon/>,
	f1ModuleScripts: () => <ModuleScriptsIcon/>,
	f1ModuleDBScripts: () => <ModuleDBScriptsIcon/>,
	f1ModuleCommands: () => <ModuleCommandsIcon/>,
	f1ModuleCommand: () => <ModuleCommandIcon/>,
	f1ModuleNodeFiles: () => <ModuleNodeFilesIcon/>,
	f1ModuleSourceFiles: () => <ModuleSourceFilesIcon/>,
	f1ModulePipelines: () => <ModulePipelinesIcon/>,
	f1ModulePipeline: () => <ModulePipelineIcon/>,
	f1ModuleO23Pipeline: () => <O23PipelineIcon/>,

	f1Typescript: () => <TypescriptIcon/>,
	f1Javascript: () => <JavascriptIcon/>,
	f1Sql: () => <SQLIcon/>,
	f1NestJs: () => <NestJsIcon/>,
	f1Prettier: () => <PrettierIcon/>,
	f1Webpack: () => <WebpackIcon/>,
	f1Vite: () => <ViteIcon/>,
	f1Eslint: () => <EslintIcon/>,
	f1Babel: () => <BabelIcon/>,
	f1TypescriptConfig: () => <TypescriptConfigIcon/>,
	f1PackageJson: () => <PackageJsonIcon/>,
	f1Readme: () => <ReadmeIcon/>
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

	FolderOpenIcon, FolderClosedIcon, FolderClosedEmptyIcon, FolderIcon, SourceFileIcon,

	EllipsisVerticalIcon,

	ProjectRootIcon, ModuleRootIcon,
	ModuleEnvsIcon, ModuleEnvIcon, ModuleServerIcon, ModuleScriptsIcon, ModuleDBScriptsIcon,
	ModuleCommandsIcon, ModuleCommandIcon,
	ModuleNodeFilesIcon, ModuleSourceFilesIcon, ModulePipelinesIcon, ModulePipelineIcon,

	LogoIcon, O23PipelineIcon,

	TypescriptIcon, JavascriptIcon, SQLIcon,
	NestJsIcon, PrettierIcon, WebpackIcon, ViteIcon, EslintIcon, BabelIcon, TypescriptConfigIcon,
	PackageJsonIcon, ReadmeIcon
};
