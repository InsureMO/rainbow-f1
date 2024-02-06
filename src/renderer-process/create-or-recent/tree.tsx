import {PROPERTY_PATH_ME, PropValue, Undefinable} from '@rainbow-d9/n1';
import {TreeNodeDef, UnwrappedTree} from '@rainbow-d9/n2';
import {MouseEvent} from 'react';
import {RecentProject, RecentProjectCategory, RecentProjectHolder, RecentProjectRoot} from '../../shared/types';
import {showContextMenu} from '../context-menu';
import {EllipsisVertical, FolderClosed, FolderClosedEmpty, FolderOpen} from '../icons';
import {useCategory} from './create-category';

const computeShortName = (name: string): string => {
	return (name ?? '').trim().split(/[\s-_]/).map(s => s[0].toUpperCase()).filter((_, i) => i < 2).join('');
};

export const Tree = (props: { root: RecentProjectRoot }) => {
	const {root} = props;

	const handleCategory = useCategory();

	const createSubCategory = (category: RecentProjectCategory) => {
		handleCategory({parentCategory: category});
	};
	const renameCategory = (parent: RecentProjectHolder, category: RecentProjectCategory) => {
		handleCategory({parentCategory: parent, category, rename: true});
	};
	const moveCategory = (parent: RecentProjectHolder, category: RecentProjectCategory) => {
		handleCategory({parentCategory: parent, category, move: true});
	};
	const removeCategory = (parent: RecentProjectHolder, category: RecentProjectCategory) => {
		// TODO REMOVE CATEGORY
	};
	const openProject = (project: RecentProject) => {
		// TODO OPEN PROJECT
	};
	const moveProject = (parent: RecentProjectHolder, project: RecentProject) => {
		// TODO MOVE PROJECT
	};
	const removeProject = (parent: RecentProjectHolder, project: RecentProject) => {
		// TODO REMOVE PROJECT
	};
	const onCategoryOperatorClicked = (parent: RecentProjectHolder, category: RecentProjectCategory) => (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		event.preventDefault();
		showContextMenu([
			{label: 'Create sub category', click: 'create-sub-category', invoke: () => createSubCategory(category)},
			{type: 'separator'},
			{label: 'Rename', click: 'rename-category', invoke: () => renameCategory(parent, category)},
			{label: 'Move to...', click: 'move-category', invoke: () => moveCategory(parent, category)},
			{type: 'separator'},
			{
				label: 'Remove from recent projects',
				click: 'remove-category', invoke: () => removeCategory(parent, category)
			}
		]);
	};
	const onProjectOperatorClicked = (parent: RecentProjectHolder, project: RecentProject) => (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		event.preventDefault();
		showContextMenu([
			{label: 'Open', click: 'open-project', invoke: () => openProject(project)},
			{type: 'separator'},
			{label: 'Move to...', click: 'move-project', invoke: () => moveProject(parent, project)},
			{type: 'separator'},
			{
				label: 'Remove from recent projects',
				click: 'remove-project', invoke: () => removeProject(parent, project)
			}
		]);
	};
	const detective = (parentNode: Undefinable<TreeNodeDef>): Array<TreeNodeDef> => {
		// the first "value" is given by UnwrappedTree, the second "value" is given by Tree
		// only root node will have two "value"
		// @ts-ignore
		const parent = (parentNode.value.value ?? parentNode.value) as unknown as RecentProjectHolder;
		const categories = parent.categories ?? [];
		const projects = parent.projects ?? [];
		const categoryNodes = categories.map((category) => {
			const hasChild = (category.categories ?? []).length !== 0 || (category.projects ?? []).length !== 0;
			return {
				marker: category.id,
				label: <span data-recent-category={true}>
					{hasChild ? <FolderClosed/> : <FolderClosedEmpty/>}
					<FolderOpen/>
					<span data-name={true}>{category.name}</span>
					<span data-operator={true} onClick={onCategoryOperatorClicked(parent, category)}><EllipsisVertical/></span>
				</span>,
				value: category as unknown as PropValue,
				$ip2r: PROPERTY_PATH_ME, $ip2p: `category-${category.id}`, leaf: false
			};
		}).sort((a, b) => {
			return (a.value as unknown as RecentProjectCategory).name.localeCompare((b.value as unknown as RecentProjectCategory).name, (void 0), {sensitivity: 'base'});
		});
		const projectNodes = projects.map((project) => {
			return {
				marker: project.id,
				label: <span data-recent-project={true}>
					<span data-short-name={true}>{computeShortName(project.name)}</span>
					<span data-name={true}>{project.name}</span>
					<span data-path={true}>{project.path}</span>
					<span data-operator={true}
					      onClick={onProjectOperatorClicked(parent, project)}><EllipsisVertical/></span>
				</span>,
				value: project as unknown as PropValue,
				$ip2r: PROPERTY_PATH_ME, $ip2p: `project-${project.id}`, leaf: true
			};
		}).sort((a, b) => {
			return (a.value as unknown as RecentProject).name.localeCompare((b.value as unknown as RecentProject).name, (void 0), {sensitivity: 'base'});
		});
		return [...categoryNodes, ...projectNodes];
	};

	return <UnwrappedTree data={root} detective={detective} initExpandLevel={0}/>;
};