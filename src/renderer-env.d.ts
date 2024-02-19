import {ContextMenu, RecentProject, RecentProjectCategory, RecentProjectRoot} from './shared/constants';
import {F1ProjectSettings} from './shared/project-settings';
import {
	CommandLines,
	F1Project,
	FileSystemBooleanResult,
	OpenDialogOptions,
	OpenDialogResult,
	ThemeSource
} from './shared/types';

declare global {
	interface WindowElectronVersions {
		node: string;
		chrome: string;
		v8: string;
		electron: string;
		app: () => string;
	}

	interface WindowElectronStore {
		get: (key: string) => any;
		set: (key: string, value: any) => void;
	}

	interface WindowElectronTheme {
		get: () => ThemeSource;
	}

	interface WindowElectronRecentProjects {
		get: () => RecentProjectRoot;
		addProject: (project: RecentProject, categoryId?: string) => void;
		renameProject: (projectId: string, newName: string) => void;
		removeProject: (projectId: string) => void;
		clear: () => void;
		addCategory: (category: RecentProjectCategory, parentCategoryId?: string) => void;
		renameCategory: (categoryId: string, newName: string) => void;
		moveCategory: (categoryId: string, newParentCategoryId: string) => void;
		removeCategory: (categoryId: string) => void;
	}

	interface WindowElectronContextMenu {
		onClick: (listener: (command: string) => void) => void;
		showContextMenu: (menu: ContextMenu) => void;
	}

	interface WindowElectronDialog {
		open(options: OpenDialogOptions): OpenDialogResult;
	}

	interface WindowElectronF1Project {
		create(options: F1ProjectSettings): { success: boolean; project: F1Project; message?: string };
	}

	interface WindowElectronFileSystem {
		exists: (path: string) => FileSystemBooleanResult;
		empty: (directory: string) => FileSystemBooleanResult;
		mkdir: (directory: string) => FileSystemBooleanResult;
		createFile: (path: string, content: string) => FileSystemBooleanResult;
	}

	interface WindowElectronPath {
		basename: (path: string, suffix?: string) => string;
	}

	interface WindowElectronCommandLines {
		commands: (commandLines?: CommandLines) => CommandLines;
	}

	interface WindowElectronHandler {
		versions: WindowElectronVersions;
		fs: WindowElectronFileSystem;
		path: WindowElectronPath;
		cli: WindowElectronCommandLines;
		store: WindowElectronStore;
		theme: WindowElectronTheme;
		recentProjects: WindowElectronRecentProjects;
		contextMenu: WindowElectronContextMenu;
		dialog: WindowElectronDialog;
		f1: WindowElectronF1Project;
	}

	interface Window {
		electron: WindowElectronHandler;
	}
}
