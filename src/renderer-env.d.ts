import {
	ContextMenu,
	F1Project,
	F1ProjectCreated,
	F1ProjectExisted,
	F1ProjectLoaded,
	F1ProjectSettings,
	FileSystemBooleanResult,
	OpenDialogOptions,
	OpenDialogResult,
	ProjectCliSet,
	RecentProject,
	RecentProjectCategory,
	RecentProjectRoot,
	ThemeSource
} from './shared';

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

	interface WindowElectronContextMenu {
		onClick: (listener: (command: string) => void) => void;
		showContextMenu: (menu: ContextMenu) => void;
	}

	interface WindowElectronDialog {
		open(options: OpenDialogOptions): OpenDialogResult;
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

	interface WindowElectronRecentProjects {
		get: () => RecentProjectRoot;
		addProject: (project: RecentProject, categoryId?: string) => void;
		renameProject: (projectId: string, newName: string) => void;
		moveProject: (projectId: string, newParentCategoryId?: string) => void;
		removeProject: (projectId: string) => void;
		clear: () => void;
		addCategory: (category: RecentProjectCategory, parentCategoryId?: string) => void;
		renameCategory: (categoryId: string, newName: string) => void;
		moveCategory: (categoryId: string, newParentCategoryId: string) => void;
		removeCategory: (categoryId: string) => void;
	}

	interface WindowElectronProjectCli {
		commands: (set?: ProjectCliSet) => Promise<ProjectCliSet>;
		version: (key: keyof ProjectCliSet, path: string) => Promise<string | undefined>;
	}

	interface WindowElectronProject {
		create(settings: F1ProjectSettings): Promise<F1ProjectCreated>;

		open(project: F1Project): void;

		tryToOpen(directory: string): Promise<F1ProjectExisted>;

		/** try to close current window, when failed to open project */
		closeOnFailedOpen(): void;

		/**
		 * ask project, only used in main window, and project was bound this window already
		 */
		ask(): Promise<F1ProjectLoaded>;

		/**
		 * notify main process that project opened
		 */
		opened(project: F1Project): void;
	}

	interface WindowElectronBridge {
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

	interface Window {
		electron: WindowElectronBridge;
	}
}
