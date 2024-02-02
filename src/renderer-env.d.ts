import {RecentProject, RecentProjectCategory, RecentProjectRoot, Theme} from './shared/constants';

declare global {
	interface WindowElectronStore {
		get: (key: string) => any;
		set: (key: string, value: any) => void;
	}

	interface WindowElectronHandler {
		store: WindowElectronStore;
		getTheme: () => Exclude<Theme, Theme.EVENT_NAME>;
		getRecentProjects: () => RecentProjectRoot;
		addRecentProject: (project: RecentProject, categoryId?: string) => void;
		removeRecentProject: (projectId: string) => void;
		clearRecentProjects: () => void;
		addRecentCategory: (category: RecentProjectCategory, parentCategoryId?: string) => void;
		removeRecentCategory: (categoryId: string) => void;
	}

	interface Window {
		electron: WindowElectronHandler;
	}
}
