import {ipcMain} from 'electron';
import Store from 'electron-store';
import {
	RecentProject,
	RecentProjectCategory,
	RecentProjectHolder,
	RecentProjectRoot,
	StoreEvent as StoreEvent,
	Theme,
	ThemeSource
} from '../shared/constants';

const store = new Store();

enum StoreKey {
	THEME = 'theme',
	RECENT_PROJECTS = 'recent-projects'
}

class ApplicationStore {
	constructor() {
		ipcMain.on(StoreEvent.SET_TO_STORE, (_, key: string, value: any) => store.set(key, value));
		ipcMain.on(StoreEvent.GET_FROM_STORE, (event, key: string) => event.returnValue = store.get(key));
		ipcMain.on(StoreEvent.GET_THEME, (event) => event.returnValue = this.getTheme());
		ipcMain.on(StoreEvent.GET_RECENT_PROJECTS, (event) => event.returnValue = this.getRecentProjects());
		ipcMain.on(StoreEvent.ADD_RECENT_PROJECT, (_, project: RecentProject, categoryId?: string) => this.addRecentProject(project, categoryId));
		ipcMain.on(StoreEvent.REMOVE_RECENT_PROJECT, (_, projectId: string) => this.removeRecentProject(projectId));
		ipcMain.on(StoreEvent.CLEAR_RECENT_PROJECTS, () => this.clearRecentProjects());
		ipcMain.on(StoreEvent.ADD_RECENT_PROJECT_CATEGORY, (_, category: RecentProjectCategory, parentCategoryId?: string) => this.addRecentProjectCategory(category, parentCategoryId));
		ipcMain.on(StoreEvent.REMOVE_RECENT_PROJECT_CATEGORY, (_, categoryId: string) => this.removeRecentProjectCategory(categoryId));
	}

	public getTheme(): ThemeSource {
		return store.get(StoreKey.THEME, Theme.SYSTEM) as ThemeSource;
	}

	public setTheme(theme: ThemeSource): void {
		store.set(StoreKey.THEME, theme);
	}

	public getRecentProjects(): RecentProjectRoot {
		return store.get(StoreKey.RECENT_PROJECTS, {}) as RecentProjectRoot;
	}

	protected findRecentProjectCategory(holder: RecentProjectHolder, categoryId: string): [RecentProjectHolder, RecentProjectCategory] | [] {
		if (holder.categories != null) {
			const found = holder.categories.find(c => c.id === categoryId);
			if (found != null) {
				return [holder, found];
			} else {
				// depth first
				for (const category of holder.categories) {
					const foundInChild = this.findRecentProjectCategory(category, categoryId);
					if (foundInChild != null) {
						return foundInChild;
					}
				}
				return (void 0);
			}
		} else {
			return (void 0);
		}
	}

	public addRecentProject(project: RecentProject, categoryId?: string): void {
		const root = this.getRecentProjects();
		if (`${categoryId ?? ''}`.trim().length === 0) {
			root.projects = root.projects ?? [];
			root.projects.push(project);
		} else {
			const [, foundCategory] = this.findRecentProjectCategory(root, categoryId);
			if (foundCategory != null) {
				foundCategory.projects = foundCategory.projects ?? [];
				foundCategory.projects.push(project);
			} else {
				// category not found, append to root
				root.projects = root.projects ?? [];
				root.projects.push(project);
			}
		}
		store.set(StoreKey.RECENT_PROJECTS, root);
	}

	protected removeRecentProjectFromCategory(category: RecentProjectCategory, projectId: string): boolean {
		let foundIndex = category.projects?.findIndex(p => p.id !== projectId);
		if (foundIndex !== -1) {
			category.projects?.splice(foundIndex, 1);
			return true;
		} else {
			return (category.categories ?? []).some(c => this.removeRecentProjectFromCategory(c, projectId));
		}
	}

	public removeRecentProject(projectId: string): void {
		const root = this.getRecentProjects();
		let foundIndex = root.projects?.findIndex(p => p.id !== projectId);
		if (foundIndex !== -1) {
			root.projects?.splice(foundIndex, 1);
		} else {
			(root.categories ?? []).some(c => this.removeRecentProjectFromCategory(c, projectId));
		}
		store.set(StoreKey.RECENT_PROJECTS, root);
	}

	public clearRecentProjects(): void {
		store.set(StoreKey.RECENT_PROJECTS, {});
	}

	public addRecentProjectCategory(category: RecentProjectCategory, parentCategoryId?: string): void {
		const root = this.getRecentProjects();
		if (`${parentCategoryId ?? ''}`.trim().length === 0 || root.categories == null) {
			// no parent category given, or there is no category at all
			root.categories = root.categories ?? [];
			root.categories.push(category);
		} else {
			const [, foundCategory] = this.findRecentProjectCategory(root, parentCategoryId);
			if (foundCategory != null) {
				foundCategory.categories = foundCategory.categories ?? [];
				foundCategory.categories.push(category);
			} else {
				root.categories.push(category);
			}
		}
		store.set(StoreKey.RECENT_PROJECTS, root);
	}

	public removeRecentProjectCategory(categoryId: string): void {
		const root = this.getRecentProjects();
		const [parent, foundCategory] = this.findRecentProjectCategory(root, categoryId);
		if (parent != null && foundCategory != null) {
			parent.categories = parent.categories.filter(c => c.id !== categoryId);
		}
		store.set(StoreKey.RECENT_PROJECTS, root);
	}
}

export default new ApplicationStore();
