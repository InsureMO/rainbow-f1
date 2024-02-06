import {DropdownOption, GlobalEventTypes, useGlobalEventBus} from '@rainbow-d9/n2';
import {Fragment} from 'react';
import {
	RecentProjectCategory,
	RecentProjectHolder,
	RecentProjectRootId,
	RecentProjectRootName
} from '../../../shared/types';
import {CategoryDialog} from './category-dialog';
import {RecentProjectCategoryCandidate} from './types';
import {transformCategoriesToMap, transformCategoriesToOptions} from './utils';

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
		const options = [
			// add root manually
			{value: RecentProjectRootId, label: RecentProjectRootName, parentCategoryIds: []},
			// all categories
			...transformCategoriesToOptions(recentProjectsRoot, '/', []).sort((a: DropdownOption, b: DropdownOption) => {
				return (a.label as string).localeCompare(b.label as string);
			})
		].map(option => {
			return {
				value: option.value,
				label: (option.label as string).split('/').map((part, index) => {
					return <Fragment key={index}>
						<span>{part}</span>
						<span data-hierarchy-slash={true}>/</span>
					</Fragment>;
				}),
				stringify: () => option.label,
				parentCategoryIds: option.parentCategoryIds
			} as RecentProjectCategoryCandidate;
		});
		const map = transformCategoriesToMap(recentProjectsRoot);
		fire(GlobalEventTypes.SHOW_DIALOG,
			<CategoryDialog root={recentProjectsRoot} options={options} map={map}
			                parentCategoryId={operation?.parentCategory?.id ?? RecentProjectRootId}
			                currentCategoryId={operation?.category?.id}
			                rename={operation?.rename} move={operation?.move}/>,
			{margin: 'max(96px, 25vh) auto auto'});
	};

	return {performCategoryOperation};
};
