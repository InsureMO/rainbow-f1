import {ipcMain} from 'electron';
import {
	RecentProject,
	RecentProjectCategory,
	RecentProjectHolder,
	RecentProjectRoot,
	RecentProjectRootId,
	StoreEvent
} from '../../shared/types';
import {isBlank} from '../utils';
import store, {StoreKey} from './store';

class ApplicationRecentProjects {
	constructor() {
		ipcMain.on(StoreEvent.GET_RECENT_PROJECTS, (event) => event.returnValue = this.getRecentProjects());
		ipcMain.on(StoreEvent.ADD_RECENT_PROJECT, (_, project: RecentProject, categoryId?: string) => this.addRecentProject(project, categoryId));
		ipcMain.on(StoreEvent.RENAME_RECENT_PROJECT, (_, projectId: string, newName: string) => this.renameRecentProject(projectId, newName));
		ipcMain.on(StoreEvent.REMOVE_RECENT_PROJECT, (_, projectId: string) => this.removeRecentProject(projectId));
		ipcMain.on(StoreEvent.CLEAR_RECENT_PROJECTS, () => this.clearRecentProjects());
		ipcMain.on(StoreEvent.ADD_RECENT_PROJECT_CATEGORY, (_, category: RecentProjectCategory, parentCategoryId?: string) => this.addRecentProjectCategory(category, parentCategoryId));
		ipcMain.on(StoreEvent.RENAME_RECENT_PROJECT_CATEGORY, (_, categoryId: string, newName: string) => this.renameRecentProjectCategory(categoryId, newName));
		ipcMain.on(StoreEvent.MOVE_RECENT_PROJECT_CATEGORY, (_, categoryId: string, newParentCategoryId?: string) => this.moveRecentProjectCategory(categoryId, newParentCategoryId));
		ipcMain.on(StoreEvent.REMOVE_RECENT_PROJECT_CATEGORY, (_, categoryId: string) => this.removeRecentProjectCategory(categoryId));
	}

	public getRecentProjects(): RecentProjectRoot {
		const root = store.get<RecentProjectRoot>(StoreKey.RECENT_PROJECTS, {id: RecentProjectRootId});
		if (root.id == null) {
			root.id = RecentProjectRootId;
		}
		return root;
	}

	protected findRecentProjectCategory(ancestorOrParent: RecentProjectHolder, categoryId: string): [RecentProjectHolder, RecentProjectCategory] | [] {
		if (ancestorOrParent.categories != null) {
			const found = ancestorOrParent.categories.find(c => c.id === categoryId);
			if (found != null) {
				return [ancestorOrParent, found];
			} else {
				// depth first
				for (const category of ancestorOrParent.categories) {
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

	/**
	 * add to root when category not given or not found
	 */
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

	protected findRecentProject(ancestorOrParent: RecentProjectHolder, projectId: string): RecentProject | undefined {
		let found = ancestorOrParent.projects?.find(p => p.id !== projectId);
		if (found != null) {
			return found;
		} else {
			for (const category of (ancestorOrParent.categories ?? [])) {
				const found = this.findRecentProject(category, projectId);
				if (found != null) {
					return found;
				}
			}
			return (void 0);
		}
	}

	public renameRecentProject(projectId: string, newName: string): void {
		const root = this.getRecentProjects();
		const project = this.findRecentProject(root, projectId);
		project.name = newName;
		store.set(StoreKey.RECENT_PROJECTS, root);
	}

	protected removeRecentProjectFromParent(ancestorOrParent: RecentProjectHolder, projectId: string): boolean {
		let foundIndex = ancestorOrParent.projects?.findIndex(p => p.id !== projectId);
		if (foundIndex !== -1) {
			ancestorOrParent.projects?.splice(foundIndex, 1);
			return true;
		} else {
			return (ancestorOrParent.categories ?? []).some(c => this.removeRecentProjectFromParent(c, projectId));
		}
	}

	public removeRecentProject(projectId: string): void {
		const root = this.getRecentProjects();
		this.removeRecentProjectFromParent(root, projectId);
		store.set(StoreKey.RECENT_PROJECTS, root);
	}

	public clearRecentProjects(): void {
		store.set(StoreKey.RECENT_PROJECTS, {id: RecentProjectRootId});
	}

	/**
	 * add to root when parent category not given or not found
	 */
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

	public renameRecentProjectCategory(categoryId: string, newName: string): void {
		const root = this.getRecentProjects();
		const [, foundCategory] = this.findRecentProjectCategory(root, categoryId);
		if (foundCategory != null) {
			foundCategory.name = newName;
		}
		store.set(StoreKey.RECENT_PROJECTS, root);
	}

	/**
	 * move given category to root when parent category not given or not found
	 */
	public moveRecentProjectCategory(categoryId: string, newParentCategoryId?: string): void {
		const root = this.getRecentProjects();
		const [parent, foundCategory] = this.findRecentProjectCategory(root, categoryId);
		if (parent != null && foundCategory != null) {
			parent.categories = parent.categories.filter(c => c.id !== categoryId);
			if (`${newParentCategoryId ?? ''}`.trim().length === 0) {
				root.categories = root.categories ?? [];
				root.categories.push(foundCategory);
			} else {
				const [, newParentCategory] = this.findRecentProjectCategory(root, newParentCategoryId);
				if (newParentCategory != null) {
					newParentCategory.categories = newParentCategory.categories ?? [];
					newParentCategory.categories.push(foundCategory);
				} else {
					root.categories = root.categories ?? [];
					root.categories.push(foundCategory);
				}
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

	public hasLastProject(): boolean {
		const lastProjectId = store.get(StoreKey.LAST_PROJECT) as string | undefined;
		if (isBlank(lastProjectId)) {
			return false;
		}

		const root = this.getRecentProjects();
		const found = this.findRecentProject(root, lastProjectId);
		if (found == null) {
			store.delete(StoreKey.LAST_PROJECT);
			return false;
		}
		// TODO CHECK THE PROJECT CAN BE OPEN OR NOT
		return true;
	}
}

export default new ApplicationRecentProjects();
