import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

export enum Theme {
	EVENT_NAME = 'theme-changed', LIGHT = 'light', DARK = 'dark', SYSTEM = 'system'
}

export type ThemeSource = Exclude<Theme, Theme.EVENT_NAME>;

export interface RecentProject {
	id: string;
	name: string;
	// absolute path to project
	path: string;
	// given path exists or not
	exists: boolean;
	// given path is initialized or not
	initialized: boolean;
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

export interface RecentProjectRoot extends RecentProjectHolder {
	id: '';
}

export enum StoreEvent {
	// store getter/setter
	GET_FROM_STORE = 'get-from-store',
	SET_TO_STORE = 'set-to-store',
	// theme
	GET_THEME = 'get-theme',
	// recent projects
	GET_RECENT_PROJECTS = 'get-recent-projects',
	ADD_RECENT_PROJECT = 'add-recent-project',
	REMOVE_RECENT_PROJECT = 'remove-recent-project',
	CLEAR_RECENT_PROJECTS = 'clear-recent-projects',
	ADD_RECENT_PROJECT_CATEGORY = 'add-recent-project-category',
	REMOVE_RECENT_PROJECT_CATEGORY = 'remove-recent-project-category'
}

export type ContextMenuTemplateItem = Omit<MenuItemConstructorOptions, 'submenu' | 'click'> & {
	submenu?: Array<ContextMenuTemplateItem>;
	click?: string;
}

export type ContextMenu = Array<ContextMenuTemplateItem>;

export enum ContextMenuEvent {
	SHOW = 'show-context-menu',
	CLICKED = 'context-menu-clicked',
	WILL_CLOSE = 'context-menu-will-close'
}