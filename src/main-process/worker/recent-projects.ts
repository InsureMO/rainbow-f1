import {ipcMain} from 'electron';
import {nanoid} from 'nanoid';
import {
	F1_PROJECT_FILE,
	F1Project,
	isBlank,
	RecentProject,
	RecentProjectCategory,
	RecentProjectHolder,
	RecentProjectRoot,
	RecentProjectRootId,
	RecentProjectsEvent
} from '../../shared';
import {FileSystemWorker} from './file-system';
import {PathWorker} from './path';
import {StoreKey, StoreWorker} from './store';

class RecentProjectsWorker {
	public getRecentProjects(): RecentProjectRoot {
		const root = StoreWorker.get<RecentProjectRoot>(StoreKey.RECENT_PROJECTS, {id: RecentProjectRootId});
		if (isBlank(root.id)) {
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
				return [];
			}
		} else {
			return [];
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
		StoreWorker.set(StoreKey.RECENT_PROJECTS, root);
	}

	protected findRecentProject(ancestorOrParent: RecentProjectHolder, projectId: string): RecentProject | undefined {
		let found = ancestorOrParent.projects?.find(p => p.id === projectId);
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

	protected findAllRecentProjects(ancestorOrParent: RecentProjectHolder): Array<RecentProject> {
		return [
			...(ancestorOrParent.projects || []),
			...(ancestorOrParent.categories || []).map(c => this.findAllRecentProjects(c)).flat()
		];
	}

	public renameRecentProject(projectId: string, newName: string): void {
		const root = this.getRecentProjects();
		const found = this.findRecentProject(root, projectId);
		if (found != null) {
			found.name = newName;
			StoreWorker.set(StoreKey.RECENT_PROJECTS, root);
		}
	}

	/**
	 * move given project to root when parent category not given or not found
	 */
	public moveRecentProject(projectId: string, newParentCategoryId?: string): void {
		const root = this.getRecentProjects();
		const found = this.findRecentProject(root, projectId);
		if (found != null) {
			this.removeRecentProjectFromParent(root, projectId);
			if (isBlank(newParentCategoryId)) {
				root.projects = [...(root.projects ?? []), found];
			} else {
				const [, category] = this.findRecentProjectCategory(root, newParentCategoryId);
				if (category != null) {
					category.projects = [...(category.projects ?? []), found];
				} else {
					root.projects = [...(root.projects ?? []), found];
				}
			}
		}
		StoreWorker.set(StoreKey.RECENT_PROJECTS, root);
	}

	protected removeRecentProjectFromParent(ancestorOrParent: RecentProjectHolder, projectId: string): boolean {
		let foundIndex = ancestorOrParent.projects?.findIndex(p => p.id === projectId);
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
		StoreWorker.set(StoreKey.RECENT_PROJECTS, root);
	}

	public clearRecentProjects(): void {
		StoreWorker.set(StoreKey.RECENT_PROJECTS, {id: RecentProjectRootId});
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
		StoreWorker.set(StoreKey.RECENT_PROJECTS, root);
	}

	public renameRecentProjectCategory(categoryId: string, newName: string): void {
		const root = this.getRecentProjects();
		const [, foundCategory] = this.findRecentProjectCategory(root, categoryId);
		if (foundCategory != null) {
			foundCategory.name = newName;
		}
		StoreWorker.set(StoreKey.RECENT_PROJECTS, root);
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
		StoreWorker.set(StoreKey.RECENT_PROJECTS, root);
	}

	public removeRecentProjectCategory(categoryId: string): void {
		const root = this.getRecentProjects();
		const [parent, foundCategory] = this.findRecentProjectCategory(root, categoryId);
		if (parent != null && foundCategory != null) {
			parent.categories = parent.categories.filter(c => c.id !== categoryId);
		}
		StoreWorker.set(StoreKey.RECENT_PROJECTS, root);
	}

	protected getRecentProjectAsMap(): [RecentProjectRoot, Record<string, RecentProject>] {
		const root = this.getRecentProjects();
		const allProjects = this.findAllRecentProjects(root);
		const projectMap = allProjects.reduce((map, project) => {
			map[project.id] = project;
			return map;
		}, {} as Record<string, RecentProject>);
		return [root, projectMap];
	}

	public addLastProject(project: F1Project) {
		let projectId;
		const lastProjectIds = StoreWorker.get<Array<string>>(StoreKey.LAST_PROJECT);
		if (lastProjectIds == null || lastProjectIds.length === 0) {
			projectId = nanoid(32);
			StoreWorker.set(StoreKey.LAST_PROJECT, [projectId]);
		}
		const [root, projectMap] = this.getRecentProjectAsMap();
		const exists = Object.values(projectMap).find(p => p.path === project.directory);
		if (exists == null) {
			root.projects = root.projects || [];
			root.projects.push({id: projectId, name: project.name, path: project.directory, exists: true});
			StoreWorker.set(StoreKey.RECENT_PROJECTS, root);
		}
	}

	public removeLastProject(project: F1Project) {
		const [, projectMap] = this.getRecentProjectAsMap();
		const exists = Object.values(projectMap).find(p => p.path === project.directory);
		if (exists != null) {
			const projectId = exists.id;
			const lastProjectIds = StoreWorker.get<Array<string>>(StoreKey.LAST_PROJECT, [])
				.filter(id => id !== projectId);
			StoreWorker.set(StoreKey.LAST_PROJECT, lastProjectIds);
		}
	}

	public getLastProjects(): Array<F1Project> {
		const lastProjectIds = StoreWorker.get<Array<string>>(StoreKey.LAST_PROJECT, []);
		if (lastProjectIds == null || lastProjectIds.length === 0) {
			return [];
		}

		const [, projectMap] = this.getRecentProjectAsMap();
		const found = lastProjectIds
			.map(lastProjectId => projectMap[lastProjectId])
			.filter(x => x != null);
		if (found.length === 0) {
			StoreWorker.delete(StoreKey.LAST_PROJECT);
			return [];
		}

		// check project files
		return found.map(recent => {
			const directory = recent.path;
			const f1ProjectFile = PathWorker.resolve(directory, F1_PROJECT_FILE);
			const exists = FileSystemWorker.exists(directory).ret && FileSystemWorker.exists(f1ProjectFile).ret;
			if (!exists) {
				return null;
			}
			const project = FileSystemWorker.readJSON<F1Project>(f1ProjectFile);
			if (project == null) {
				// cannot read project file correctly
				return null;
			}
			if (isBlank(project.name)) {
				project.name = recent.name;
			}
			project.directory = directory;
			return project;
		}).filter(x => x != null);
	}
}

const INSTANCE = (() => {
	const worker = new RecentProjectsWorker();
	ipcMain.on(RecentProjectsEvent.GET_ALL, (event: Electron.IpcMainEvent): void => {
		event.returnValue = worker.getRecentProjects();
	});
	ipcMain.on(RecentProjectsEvent.ADD_PROJECT, (_: Electron.IpcMainEvent, project: RecentProject, categoryId?: string): void => {
		worker.addRecentProject(project, categoryId);
	});
	ipcMain.on(RecentProjectsEvent.RENAME_PROJECT, (_: Electron.IpcMainEvent, projectId: string, newName: string): void => {
		worker.renameRecentProject(projectId, newName);
	});
	ipcMain.on(RecentProjectsEvent.MOVE_PROJECT, (_: Electron.IpcMainEvent, projectId: string, newParentCategoryId?: string): void => {
		worker.moveRecentProject(projectId, newParentCategoryId);
	});
	ipcMain.on(RecentProjectsEvent.REMOVE_PROJECT, (_: Electron.IpcMainEvent, projectId: string): void => {
		worker.removeRecentProject(projectId);
	});
	ipcMain.on(RecentProjectsEvent.CLEAR_ALL, (): void => {
		worker.clearRecentProjects();
	});
	ipcMain.on(RecentProjectsEvent.ADD_CATEGORY, (_: Electron.IpcMainEvent, category: RecentProjectCategory, parentCategoryId?: string): void => {
		worker.addRecentProjectCategory(category, parentCategoryId);
	});
	ipcMain.on(RecentProjectsEvent.RENAME_CATEGORY, (_: Electron.IpcMainEvent, categoryId: string, newName: string): void => {
		worker.renameRecentProjectCategory(categoryId, newName);
	});
	ipcMain.on(RecentProjectsEvent.MOVE_CATEGORY, (_: Electron.IpcMainEvent, categoryId: string, newParentCategoryId?: string): void => {
		worker.moveRecentProjectCategory(categoryId, newParentCategoryId);
	});
	ipcMain.on(RecentProjectsEvent.REMOVE_CATEGORY, (_: Electron.IpcMainEvent, categoryId: string): void => {
		worker.removeRecentProjectCategory(categoryId);
	});
	return worker;
})();
export {INSTANCE as RecentProjectsWorker};
