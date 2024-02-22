import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import DialogOpenOptions = Electron.OpenDialogOptions;
import OpenDialogReturnValue = Electron.OpenDialogReturnValue;
import {F1ProjectSettings} from './project-settings';

export enum VersionsEvent {
	APP = 'versions-app'
}

export enum Theme {
	EVENT_NAME = 'theme-changed', LIGHT = 'light', DARK = 'dark', SYSTEM = 'system'
}

export type ThemeSource = Exclude<Theme, Theme.EVENT_NAME>;

export enum ThemeEvent {
	GET = 'theme-get',
}

export interface RecentProject {
	id: string;
	name: string;
	// absolute path to project
	path: string;
	// given path exists or not
	exists: boolean;
}

export type RecentProjects = Array<RecentProject>;

export interface RecentProjectHolder {
	id: string;
	projects?: RecentProjects;
	categories?: RecentProjectCategories;
}

export interface RecentProjectCategory extends RecentProjectHolder {
	name: string;
}

export type RecentProjectCategories = Array<RecentProjectCategory>;

export const RecentProjectRootId = '';
export const RecentProjectRootName = '';

export interface RecentProjectRoot extends RecentProjectHolder {
	id: typeof RecentProjectRootId;
}

export enum RecentProjectsEvent {
	GET_ALL = 'recent-projects-get-all',
	ADD_PROJECT = 'recent-projects-add-project',
	RENAME_PROJECT = 'recent-projects-rename-project',
	REMOVE_PROJECT = 'recent-projects-remove-project',
	ADD_CATEGORY = 'recent-projects-add-category',
	RENAME_CATEGORY = 'recent-projects-rename-category',
	MOVE_CATEGORY = 'recent-projects-move-category',
	REMOVE_CATEGORY = 'recent-projects-remove-category',
	CLEAR_ALL = 'recent-projects-clear-all',
}

export enum StoreEvent {
	GET = 'store-get',
	SET = 'store-set',
}

export type ContextMenuTemplateItem = Omit<MenuItemConstructorOptions, 'submenu' | 'click'> & {
	submenu?: Array<ContextMenuTemplateItem>;
	click?: string;
}

export type ContextMenu = Array<ContextMenuTemplateItem>;

export enum ContextMenuEvent {
	SHOW = 'context-menu-show',
	CLICKED = 'context-menu-clicked',
	WILL_CLOSE = 'context-menu-will-close'
}

export type OpenDialogOptions = DialogOpenOptions;
export type OpenDialogResult = OpenDialogReturnValue;

export enum DialogEvent {
	OPEN = 'dialog-open'
}

export interface FileSystemOperationResult<R> {
	success: boolean;
	/** return value when success */
	ret?: R;
	/** message when error rises */
	message?: string;
}

export interface FileSystemBooleanResult extends FileSystemOperationResult<boolean> {
}

export interface FileSystemFoldersResult extends FileSystemOperationResult<Array<string>> {
}

export enum FileSystemEvent {
	EXISTS = 'fs-exists',
	EMPTY = 'fs-empty',
	MKDIR = 'fs-mkdir',
	CREATE_FILE = 'fs-create-file',
}

export enum PathEvent {
	BASENAME = 'path-basename',
}

export interface F1Project extends F1ProjectSettings {
}

export interface F1ProjectCreated {
	success: boolean;
	project: F1ProjectSettings;
	message?: string;
}

export interface F1ProjectExisted {
	success: boolean;
	project?: F1ProjectSettings;
	message?: string;
}

export interface F1ProjectLoaded {
	success: boolean;
	project?: F1Project;
	message?: string;
}

export enum F1ProjectEvent {
	CREATE = 'f1-project-create',
	OPEN = 'f1-project-open',
	TRY_TO_OPEN = 'f1-project-try-to-open',
	ASK = 'f1-project-ask',
	OPENED = 'f1-project-opened'
}

export enum CommandLinesEvent {
	COMMANDS = 'cli-commands',
	VERSION = 'cli-version'
}