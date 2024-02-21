import {nanoid} from 'nanoid';
import {RecentProjectCategory, RecentProjectHolder} from '../../../shared';
import {RecentProjectCategoryCandidate} from './types';

export const transformCategoriesToMap = (parent: RecentProjectHolder): Record<string, RecentProjectHolder> => {
	const holders: Record<string, RecentProjectHolder> = {};
	const collectHolders = (holder: RecentProjectHolder) => {
		holders[holder.id] = holder;
		(holder.categories ?? []).forEach(collectHolders);
	};
	collectHolders(parent);
	return holders;
};

export const transformCategoriesToOptions = (parent: RecentProjectHolder, prefix: string, parentCategoryIdsOfParent: Array<string>): Array<RecentProjectCategoryCandidate> => {
	const parentCategoryIds = [...parentCategoryIdsOfParent, parent.id].filter(x => x != null);
	return (parent.categories ?? []).map((category: RecentProjectCategory) => {
		return [
			{value: category.id, label: `${prefix}${category.name}`, parentCategoryIds},
			...transformCategoriesToOptions(category, `${prefix}${category.name}/`, parentCategoryIds)
		];
	}).flat();
};

export const filterAvailableCategories = (options: Array<RecentProjectCategoryCandidate>, currentCategoryId: string, parentCategoryId: string): Array<RecentProjectCategoryCandidate> => {
	return options.filter(option => {
		// option is not my current parent, myself, and not my descendants
		return option.value !== currentCategoryId
			&& option.value !== parentCategoryId
			&& !option.parentCategoryIds.some(id => id === currentCategoryId);
	});
};

export const generateCategoryId = (exists: Record<string, RecentProjectHolder>): string => {
	let id = nanoid(32);
	while (exists[id] != null) {
		id = nanoid(32);
	}
	return id;
};