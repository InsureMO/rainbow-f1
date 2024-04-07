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
	MOVE_PROJECT = 'recent-projects-move-project',
	REMOVE_PROJECT = 'recent-projects-remove-project',
	ADD_CATEGORY = 'recent-projects-add-category',
	RENAME_CATEGORY = 'recent-projects-rename-category',
	MOVE_CATEGORY = 'recent-projects-move-category',
	REMOVE_CATEGORY = 'recent-projects-remove-category',
	CLEAR_ALL = 'recent-projects-clear-all',
}
