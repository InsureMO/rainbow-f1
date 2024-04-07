import {DropdownOption} from '@rainbow-d9/n2';
import {nanoid} from 'nanoid';
import {Fragment} from 'react';
import {
	RecentProjectCategory,
	RecentProjectEntityId,
	RecentProjectHolder,
	RecentProjectRoot,
	RecentProjectRootId,
	RecentProjectRootName
} from '../../../../shared';
import {RecentProjectCategoryCandidate} from './types';

export const transformCategoriesToMap = (parent: RecentProjectHolder): Record<RecentProjectEntityId, RecentProjectHolder> => {
	const holders: Record<string, RecentProjectHolder> = {};
	const collectHolders = (holder: RecentProjectHolder) => {
		holders[holder.id] = holder;
		(holder.categories ?? []).forEach(collectHolders);
	};
	collectHolders(parent);
	return holders;
};

export const transformCategoriesToOptions = (parent: RecentProjectHolder, prefix: string, parentCategoryIdsOfParent: Array<RecentProjectEntityId>): Array<RecentProjectCategoryCandidate> => {
	const parentCategoryIds = [...parentCategoryIdsOfParent, parent.id].filter(x => x != null);
	return (parent.categories ?? []).map((category: RecentProjectCategory) => {
		return [
			{value: category.id, label: `${prefix}${category.name}`, parentCategoryIds},
			...transformCategoriesToOptions(category, `${prefix}${category.name}/`, parentCategoryIds)
		];
	}).flat();
};

export const filterAvailableCategoriesForMoveCategory = (options: Array<RecentProjectCategoryCandidate>, currentCategoryId: RecentProjectEntityId, parentCategoryId: RecentProjectEntityId): Array<RecentProjectCategoryCandidate> => {
	return options.filter(option => {
		// option is not my current parent, myself, and not my descendants
		return option.value !== currentCategoryId
			&& option.value !== parentCategoryId
			&& !option.parentCategoryIds.some(id => id === currentCategoryId);
	});
};
export const filterAvailableCategoriesForMoveProject = (options: Array<RecentProjectCategoryCandidate>, parentCategoryId: RecentProjectEntityId): Array<RecentProjectCategoryCandidate> => {
	return options.filter(option => {
		// option is not my current parent
		return option.value !== parentCategoryId;
	});
};

export const getSelectedParentCategoryId = (availableOptions: Array<RecentProjectCategoryCandidate>, parentCategoryId?: RecentProjectEntityId): string => {
	if (parentCategoryId != null) {
		return parentCategoryId;
	}
	if (availableOptions[0]?.value !== parentCategoryId) {
		return availableOptions[0]?.value ?? RecentProjectRootId;
	} else {
		return availableOptions[1]?.value ?? RecentProjectRootId;
	}
};

export const generateCategoryId = (exists: Record<RecentProjectEntityId, RecentProjectHolder>): RecentProjectEntityId => {
	let id = nanoid(32);
	while (exists[id] != null) {
		id = nanoid(32);
	}
	return id;
};

export const getCategoryCandidates = (root: RecentProjectRoot) => {
	const options = [
		// add root manually
		{value: RecentProjectRootId, label: RecentProjectRootName, parentCategoryIds: []},
		// all categories
		...transformCategoriesToOptions(root, '/', [])
			.sort((a: DropdownOption, b: DropdownOption) => (a.label as string).localeCompare(b.label as string))
	].map(option => {
		return {
			value: option.value,
			label: (option.label as string)
				.split('/')
				.map((part, index) => {
					return <Fragment key={index}>
						<span>{part}</span>
						<span data-hierarchy-slash="">/</span>
					</Fragment>;
				}),
			stringify: () => option.label,
			parentCategoryIds: option.parentCategoryIds
		} as RecentProjectCategoryCandidate;
	});
	const map = transformCategoriesToMap(root);

	return {options, map};
};