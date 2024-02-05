import {Tree} from './tree';
import {useRepaint} from './use-repaint';
import {NoRecentProject} from './widgets';

export const RecentProjects = () => {
	useRepaint();
	const recentProjectsRoot = window.electron.recentProjects.get();
	const hasRecentProjects = (recentProjectsRoot.categories ?? []).length !== 0 || (recentProjectsRoot.projects ?? []).length !== 0;

	if (hasRecentProjects) {
		return <Tree root={recentProjectsRoot}/>;
	} else {
		return <NoRecentProject>
			No recently opened projects.
			<br/>
			Create a new category or project or select a directory to open an existing project.
		</NoRecentProject>;
	}
};
