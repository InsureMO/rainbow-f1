import {PROPERTY_PATH_ME, PropValue, Undefinable} from '@rainbow-d9/n1';
import {TreeNodeDef, UnwrappedTree} from '@rainbow-d9/n2';
import {MouseEvent} from 'react';
import {RecentProjectCategory, RecentProjectHolder, RecentProjectRoot} from '../../shared/types';
import {showContextMenu} from '../context-menu';
import {EllipsisVertical, FolderClosed, FolderClosedEmpty, FolderOpen} from '../icons';
import {useCreateCategory} from './create-category';

const computeShortName = (name: string): string => {
	return (name ?? '').trim().split(/[\s-_]/).map(s => s[0].toUpperCase()).filter((_, i) => i < 2).join('');
};

export const Tree = (props: { root: RecentProjectRoot }) => {
	const {root} = props;

	const onCreateCategoryClicked = useCreateCategory();

	const createSubCategory = (category: RecentProjectCategory) => {
		onCreateCategoryClicked(category);
	};
	const renameCategory = (category: RecentProjectCategory) => {
		// TODO RENAME CATEGORY
	};
	const moveCategory = (category: RecentProjectCategory) => {
		// TODO RENAME CATEGORY
	};
	const onCategoryOperatorClicked = (category: RecentProjectCategory) => (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		event.preventDefault();
		showContextMenu([
			{label: 'Create sub category', click: 'create-sub-category', invoke: () => createSubCategory(category)},
			{type: 'separator'},
			{label: 'Rename', click: 'rename-category', invoke: () => renameCategory(category)},
			{label: 'Move to...', click: 'move-category', invoke: () => moveCategory(category)}
		]);
	};
	const onProjectOperatorClicked = (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		event.preventDefault();
	};
	const detective = (parentNode: Undefinable<TreeNodeDef>): Array<TreeNodeDef> => {
		// the first "value" is given by UnwrappedTree, the second "value" is given by Tree
		// only root node will have two "value"
		// @ts-ignore
		const parent = (parentNode.value.value ?? parentNode.value) as unknown as RecentProjectHolder;
		const categories = parent.categories ?? [];
		const projects = parent.projects ?? [];
		const nodes: Array<TreeNodeDef> = [];
		categories.forEach((category) => {
			const hasChild = (category.categories ?? []).length !== 0 || (category.projects ?? []).length !== 0;
			nodes.push({
				marker: category.id,
				label: <span data-recent-category={true}>
					{hasChild ? <FolderClosed/> : <FolderClosedEmpty/>}
					<FolderOpen/>
					<span data-name={true}>{category.name}</span>
					<span data-operator={true} onClick={onCategoryOperatorClicked(category)}><EllipsisVertical/></span>
				</span>,
				value: category as unknown as PropValue,
				$ip2r: PROPERTY_PATH_ME, $ip2p: `category-${category.id}`, leaf: false
			});
		});
		projects.forEach((project) => {
			nodes.push({
				marker: project.id,
				label: <span data-recent-project={true}>
					<span data-short-name={true}>{computeShortName(project.name)}</span>
					<span data-name={true}>{project.name}</span>
					<span data-path={true}>{project.path}</span>
					<span data-operator={true} onClick={onProjectOperatorClicked}><EllipsisVertical/></span>
				</span>,
				value: project as unknown as PropValue,
				$ip2r: PROPERTY_PATH_ME, $ip2p: `project-${project.id}`, leaf: true
			});
		});
		return nodes;
	};

	return <UnwrappedTree data={root} detective={detective} initExpandLevel={0}/>;
};