import {PROPERTY_PATH_ME, PropValue, Undefinable} from '@rainbow-d9/n1';
import {AlertLabel, GlobalEventTypes, TreeNodeDef, UnwrappedTree, useGlobalEventBus} from '@rainbow-d9/n2';
import {MouseEvent} from 'react';
import {
	RecentProject,
	RecentProjectCategory,
	RecentProjectEntityName,
	RecentProjectHolder,
	RecentProjectRoot
} from '../../../shared';
import {ContextMenuItem, showContextMenu} from '../../common/context-menu';
import {EllipsisVertical, FolderClosed, FolderClosedEmpty, FolderOpen} from '../../common/icons';
import {useCategory} from './category';
import {RecentProjectsEventTypes, useRecentProjectsEventBus} from './event-bus';
import {useProject} from './project';

const computeShortName = (name: RecentProjectEntityName): string => {
	return (name ?? '').trim().split(/[\s-_]/).map(s => s[0].toUpperCase()).filter((_, i) => i < 2).join('');
};

export const Tree = (props: { root: RecentProjectRoot }) => {
	const {root} = props;

	const {fire} = useGlobalEventBus();
	const recentProjectsEventBus = useRecentProjectsEventBus();
	const {performCategoryOperation} = useCategory();
	const {performProjectOperation} = useProject();

	const createSubCategory = (category: RecentProjectCategory) => {
		performCategoryOperation({parentCategory: category});
	};
	const renameCategory = (parent: RecentProjectHolder, category: RecentProjectCategory) => {
		performCategoryOperation({parentCategory: parent, category, rename: true});
	};
	const moveCategory = (parent: RecentProjectHolder, category: RecentProjectCategory) => {
		performCategoryOperation({parentCategory: parent, category, move: true});
	};
	const removeCategory = (_parent: RecentProjectHolder, category: RecentProjectCategory) => {
		fire(GlobalEventTypes.SHOW_YES_NO_DIALOG, <>
			<span data-w="dialog-label">Are you sure you want to remove this category?</span>
			<span data-w="dialog-label">All subcategories and items will be removed simultaneously.</span>
		</>, () => {
			window.electron.recentProjects.removeCategory(category.id);
			fire(GlobalEventTypes.HIDE_DIALOG);
			recentProjectsEventBus.fire(RecentProjectsEventTypes.REPAINT);
		}, () => fire(GlobalEventTypes.HIDE_DIALOG));
	};
	const openProject = async (recentProject: RecentProject) => {
		const {success, project, message} = await window.electron.project.tryToOpen(recentProject.path);
		if (!success) {
			fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>{message}</AlertLabel>);
		} else {
			window.electron.project.open(project);
		}
	};
	const moveProject = (parent: RecentProjectHolder, project: RecentProject) => {
		performProjectOperation({parentCategory: parent, project});
	};
	const removeProject = (_parent: RecentProjectHolder, project: RecentProject) => {
		fire(GlobalEventTypes.SHOW_YES_NO_DIALOG, <>
			<span data-w="dialog-label">Are you sure you want to remove this project?</span>
		</>, () => {
			window.electron.recentProjects.removeProject(project.id);
			fire(GlobalEventTypes.HIDE_DIALOG);
			recentProjectsEventBus.fire(RecentProjectsEventTypes.REPAINT);
		}, () => fire(GlobalEventTypes.HIDE_DIALOG));
	};
	const onCategoryOperatorClicked = (parent: RecentProjectHolder, category: RecentProjectCategory) => (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		event.preventDefault();
		// when category is the only one in root, cannot perform moving
		let movable = true;
		if (parent === root) {
			movable = (parent.categories ?? []).length > 1;
		}
		showContextMenu([
			{label: 'Create sub category', click: 'create-sub-category', invoke: () => createSubCategory(category)},
			{type: 'separator'},
			{label: 'Rename', click: 'rename-category', invoke: () => renameCategory(parent, category)},
			movable ? {
				label: 'Move to...', click: 'move-category', invoke: () => moveCategory(parent, category)
			} : null,
			{type: 'separator'},
			{
				label: 'Remove from recent projects',
				click: 'remove-category', invoke: () => removeCategory(parent, category)
			}
		].filter(x => x != null) as Array<ContextMenuItem>);
	};
	const onProjectClicked = (project: RecentProject) => async (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		event.preventDefault();
		await openProject(project);
	};
	const onProjectOperatorClicked = (parent: RecentProjectHolder, project: RecentProject) => (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		event.preventDefault();
		// when project is under root, and no category exists, cannot perform moving
		const movable = parent !== root || (parent.categories ?? []).length >= 1;
		showContextMenu([
			{label: 'Open', click: 'open-project', invoke: () => openProject(project)},
			{type: 'separator'},
			movable ? {label: 'Move to...', click: 'move-project', invoke: () => moveProject(parent, project)} : null,
			movable ? {type: 'separator'} : null,
			{
				label: 'Remove from recent projects',
				click: 'remove-project', invoke: () => removeProject(parent, project)
			}
		].filter(x => x != null) as Array<ContextMenuItem>);
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
				label: <span data-recent-category="">
					{hasChild ? <FolderClosed/> : <FolderClosedEmpty/>}
					<FolderOpen/>
					<span data-name="">{category.name}</span>
					<span data-operator=""
					      onClick={onCategoryOperatorClicked(parent, category)}><EllipsisVertical/></span>
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
				label: <span data-recent-project="" onClick={onProjectClicked(project)}>
					<span data-short-name="">{computeShortName(project.name)}</span>
					<span data-name="">{project.name}</span>
					<span data-path="">{project.path}</span>
					<span data-operator=""
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
