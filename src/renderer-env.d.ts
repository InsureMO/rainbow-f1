import {ContextMenu, RecentProject, RecentProjectCategory, RecentProjectRoot} from './shared/constants';
import {CreateF1ProjectOptions, F1Project, OpenDialogOptions, OpenDialogResult, ThemeSource} from './shared/types';

declare global {
	interface WindowElectronVersions {
		node: string;
		chrome: string;
		v8: string;
		electron: string;
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
		create(options: CreateF1ProjectOptions): F1Project;
	}

	interface WindowElectronHandler {
		versions: WindowElectronVersions;
		store: WindowElectronStore;
		theme: WindowElectronTheme;
		recentProjects: WindowElectronRecentProjects;
		contextMenu: WindowElectronContextMenu;
		dialog: WindowElectronDialog;
		f1Project: WindowElectronF1Project;
	}

	interface Window {
		electron: WindowElectronHandler;
	}
}
