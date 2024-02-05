import {DropdownOption, GlobalEventTypes, useGlobalEventBus} from '@rainbow-d9/n2';
import {Fragment} from 'react';
import {RecentProjectCategory, RecentProjectHolder} from '../../../shared/types';
import {CreateCategoryDialog} from './create-category-dialog';

export const useCreateCategory = () => {
	const {fire} = useGlobalEventBus();
	// map doesn't include root
	const transformCategoriesToMap = (parent: RecentProjectHolder): Record<string, RecentProjectCategory> => {
		const holders: Record<string, RecentProjectCategory> = {};
		const collectHolders = (holder: RecentProjectHolder) => {
			if ((holder as RecentProjectCategory).id != null) {
				holders[(holder as RecentProjectCategory).id] = holder as RecentProjectCategory;
			}
			(holder.categories ?? []).forEach(collectHolders);
		};
		collectHolders(parent);
		return holders;
	};
	const transformCategoriesToOptions = (parent: RecentProjectHolder, prefix: string): Array<DropdownOption> => {
		return (parent.categories ?? []).map((category: RecentProjectCategory) => {
			return [
				{value: category.id, label: `${prefix}${category.name}`},
				...transformCategoriesToOptions(category, `${prefix}${category.name}/`)
			];
		}).flat();
	};

	return (parentCategory?: RecentProjectCategory) => {
		const recentProjectsRoot = window.electron.recentProjects.get();
		const options = [
			{value: '', label: ''},
			...transformCategoriesToOptions(recentProjectsRoot, '/').sort((a: DropdownOption, b: DropdownOption) => {
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
				stringify: () => option.label
			} as DropdownOption;
		});
		const map = transformCategoriesToMap(recentProjectsRoot);
		fire(GlobalEventTypes.SHOW_DIALOG,
			<CreateCategoryDialog root={recentProjectsRoot} options={options} map={map}
			                      parentCategoryId={parentCategory?.id}/>,
			{margin: 'max(96px, 20vh) auto auto'});
	};
};
