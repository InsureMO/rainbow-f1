import {GlobalEventTypes, useGlobalEventBus} from '@rainbow-d9/n2';
import {RecentProject, RecentProjectHolder, RecentProjectRootId} from '../../../shared';
import {getCategoryCandidates} from '../category';
import {ProjectDialog} from './project-dialog';

export interface ProjectOperation {
	/** the parent to perform category operation, could be root */
	parentCategory: RecentProjectHolder;
	/** the category to be renamed or moved */
	project: RecentProject;
}

export const useProject = () => {
	const {fire} = useGlobalEventBus();

	const performProjectOperation = (operation: ProjectOperation) => {
		const recentProjectsRoot = window.electron.recentProjects.get();
		const {options, map} = getCategoryCandidates(recentProjectsRoot);
		fire(GlobalEventTypes.SHOW_DIALOG,
			<ProjectDialog root={recentProjectsRoot} options={options} map={map}
			               parentCategoryId={operation.parentCategory?.id ?? RecentProjectRootId}
			               project={operation.project}/>,
			{margin: 'max(96px, 25vh) auto auto'});
	};

	return {performProjectOperation};
};
