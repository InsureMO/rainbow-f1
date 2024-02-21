import {recentProjects} from './handlers';
import {createMainWindow} from './main-window';
import {createProjectWindow} from './project-window';

export const createFirstWindow = (showImmediate: boolean) => {
	const lastProjects = recentProjects.getLastProjects();
	if (lastProjects.length !== 0) {
		return lastProjects.map(project => createMainWindow(project, showImmediate));
	} else {
		return [createProjectWindow({showImmediate})];
	}
};
