import {GlobalEventTypes, useGlobalEventBus} from '@rainbow-d9/n2';
import {RecentProjectCategory, RecentProjectHolder, RecentProjectRootId} from '../../../shared';
import {CategoryDialog} from './category-dialog';
import {getCategoryCandidates} from './utils';

export interface CategoryOperation {
	/** the parent to perform category operation, could be root */
	parentCategory: RecentProjectHolder;
	/** the category to be renamed or moved */
	category?: RecentProjectCategory;
	/** identify whether the dialog is for renaming */
	rename?: boolean;
	/** identify whether the dialog is for moving */
	move?: boolean;
}

export const useCategory = () => {
	const {fire} = useGlobalEventBus();

	const performCategoryOperation = (operation?: CategoryOperation) => {
		const recentProjectsRoot = window.electron.recentProjects.get();
		const {options, map} = getCategoryCandidates(recentProjectsRoot);
		fire(GlobalEventTypes.SHOW_DIALOG,
			<CategoryDialog root={recentProjectsRoot} options={options} map={map}
			                parentCategoryId={operation?.parentCategory?.id ?? RecentProjectRootId}
			                currentCategoryId={operation?.category?.id}
			                rename={operation?.rename} move={operation?.move}/>,
			{margin: 'max(96px, 25vh) auto auto'});
	};

	return {performCategoryOperation};
};
