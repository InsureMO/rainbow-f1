export type RecentProjectEntityId = string;
export type RecentProjectEntityName = string;
export type RecentProjectPath = string;

export interface RecentProject {
	id: RecentProjectEntityId;
	name: RecentProjectEntityName;
	// absolute path to project
	path: RecentProjectPath;
	/**
	 * given path exists or not, transient value only for display purpose.
	 * must check before touch anything physically with project
	 */
	exists?: boolean;
}

export interface RecentProjectHolder {
	id: RecentProjectEntityId;
	projects?: Array<RecentProject>;
	categories?: Array<RecentProjectCategory>;
}

export interface RecentProjectCategory extends RecentProjectHolder {
	name: RecentProjectEntityName;
}

export const RecentProjectRootId = '$@#__root__#@$';
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
