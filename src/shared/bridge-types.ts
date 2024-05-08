import {ContextMenu} from './context-menu-types';
import {OpenDialogOptions, OpenDialogResult} from './dialog-types';
import {FileSystemBooleanResult, FileSystemContentResult} from './file-system-types';
import {ProjectCliSet} from './project-cli-types';
import {
	F1Project,
	F1ProjectCreated,
	F1ProjectExisted,
	F1ProjectLoaded,
	F1ProjectSettings,
	F1ProjectStructureLoaded
} from './project-types';
import {
	RecentProject,
	RecentProjectCategory,
	RecentProjectEntityId,
	RecentProjectEntityName,
	RecentProjectRoot
} from './recent-projects-types';
import {ThemeSource} from './theme-types';

export namespace ElectronBridges {
	export interface WindowElectronVersions {
		node: string;
		chrome: string;
		v8: string;
		electron: string;
		app: () => string;
	}

	export interface WindowElectronStore {
		get: (key: string) => any;
		set: (key: string, value: any) => void;
	}

	export interface WindowElectronTheme {
		get: () => ThemeSource;
	}

	export interface WindowElectronContextMenu {
		onClick: (listener: (command: string) => void) => void;
		showContextMenu: (menu: ContextMenu) => void;
	}

	export interface WindowElectronDialog {
		open(options: OpenDialogOptions): OpenDialogResult;
	}

	export interface WindowElectronFileSystem {
		exists: (path: string) => FileSystemBooleanResult;
		empty: (directory: string) => FileSystemBooleanResult;
		mkdir: (directory: string) => FileSystemBooleanResult;
		createFile: (path: string, content: string) => FileSystemBooleanResult;
		readFile: (path: string) => FileSystemContentResult;
	}

	export interface WindowElectronPath {
		basename: (path: string, suffix?: string) => string;
	}

	export interface WindowElectronRecentProjects {
		get: () => RecentProjectRoot;
		addProject: (project: RecentProject, categoryId?: RecentProjectEntityId) => void;
		renameProject: (projectId: RecentProjectEntityId, newName: RecentProjectEntityName) => void;
		moveProject: (projectId: RecentProjectEntityId, newParentCategoryId?: RecentProjectEntityId) => void;
		removeProject: (projectId: RecentProjectEntityId) => void;
		clear: () => void;
		addCategory: (category: RecentProjectCategory, parentCategoryId?: RecentProjectEntityId) => void;
		renameCategory: (categoryId: RecentProjectEntityId, newName: RecentProjectEntityName) => void;
		moveCategory: (categoryId: RecentProjectEntityId, newParentCategoryId: RecentProjectEntityId) => void;
		removeCategory: (categoryId: RecentProjectEntityId) => void;
	}

	export interface WindowElectronProjectCli {
		commands: (set?: ProjectCliSet) => Promise<ProjectCliSet>;
		version: (key: keyof ProjectCliSet, path: string) => Promise<string | undefined>;
	}

	export interface WindowElectronProject {
		create: (settings: F1ProjectSettings) => Promise<F1ProjectCreated>;

		open: (project: F1Project) => void;

		tryToOpen: (directory: string) => Promise<F1ProjectExisted>;

		/** try to close current window, when failed to open project */
		closeOnFailedOpen: () => void;
		/**
		 * ask project, only used in main window, and project was bound this window already
		 */
		loadAttached: () => Promise<F1ProjectLoaded>;
		/**
		 * notify main process that project opened
		 */
		opened: (project: F1Project) => void;
		/**
		 * ask project structure, only used in main window, and project was bound this window already
		 */
		loadAttachedStructure: () => Promise<F1ProjectStructureLoaded>;
	}

	export interface WindowElectronBridge {
		versions: WindowElectronVersions;

		store: WindowElectronStore;
		theme: WindowElectronTheme;
		contextMenu: WindowElectronContextMenu;
		dialog: WindowElectronDialog;
		fs: WindowElectronFileSystem;
		path: WindowElectronPath;

		recentProjects: WindowElectronRecentProjects;
		cli: WindowElectronProjectCli;
		project: WindowElectronProject;
	}
}