import {
	ButtonFill,
	ButtonInk,
	DialogBody,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	GlobalEventTypes,
	UnwrappedButton,
	UnwrappedCaption,
	UnwrappedDropdown,
	UnwrappedInput,
	useGlobalEventBus
} from '@rainbow-d9/n2';
import {useEffect, useRef, useState} from 'react';
import {
	RecentProjectCategory,
	RecentProjectEntityId,
	RecentProjectHolder,
	RecentProjectRoot,
	RecentProjectRootId
} from '../../../../shared';
import {InvalidMessage} from '../../../common/widgets';
import {RecentProjectsEventTypes, useRecentProjectsEventBus} from '../event-bus';
import {RecentProjectCategoryCandidate} from './types';
import {filterAvailableCategoriesForMoveCategory, generateCategoryId, getSelectedParentCategoryId} from './utils';

interface CreateCategoryDialogState {
	changed: boolean;
	parentCategoryId: string;
	name: string;
	message?: string;
}

export const CategoryDialog = (props: {
	root: RecentProjectRoot; options: Array<RecentProjectCategoryCandidate>; map: Record<RecentProjectEntityId, RecentProjectHolder>;
	parentCategoryId?: RecentProjectEntityId;
	currentCategoryId?: RecentProjectEntityId; rename?: boolean; move?: boolean;
}) => {
	const {
		root, options, map,
		parentCategoryId = RecentProjectRootId,
		currentCategoryId, rename = false, move = false
	} = props;

	const {fire} = useGlobalEventBus();
	const recentProjectsEventBus = useRecentProjectsEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<CreateCategoryDialogState>(() => {
		const category = map[currentCategoryId];
		// current category id never be root, thus it is a category when found in map
		return {
			changed: false,
			// leave undefined if it is a moving operation
			parentCategoryId: move ? getSelectedParentCategoryId(filterAvailableCategoriesForMoveCategory(options, currentCategoryId, parentCategoryId)) : parentCategoryId,
			name: (category as RecentProjectCategory)?.name ?? ''
		};
	});
	useEffect(() => {
		if (move) {
			(containerRef.current?.querySelector('div[data-w=dropdown]') as HTMLDivElement)?.focus();
		} else {
			inputRef.current?.focus();
		}
	}, []);
	useEffect(() => {
		if (!state.changed) {
			return;
		}
		if (!move) {
			// create or rename category
			const name = state.name.trim();
			if (name === '') {
				setState(state => ({...state, message: 'Please fill in the category name.'}));
				return;
			}
			let siblings: Array<RecentProjectCategory>;
			if (state.parentCategoryId === RecentProjectRootId) {
				siblings = root.categories ?? [];
			} else {
				siblings = map[state.parentCategoryId]?.categories ?? [];
			}
			if (siblings.filter(category => category.id !== currentCategoryId).some(category => category.name === name)) {
				setState(state => ({...state, message: 'Category name already exists.'}));
				return;
			}
			// current category id never be root, thus it is a category when found in map
			if (currentCategoryId != null && (map[currentCategoryId] as RecentProjectCategory).name === name) {
				setState(state => ({...state, message: 'Category name not changed.'}));
				return;
			}
			if (/[\\\/]/.test(name)) {
				setState(state => ({...state, message: 'Category name cannot contain / or \\.'}));
				return;
			}
		} else {
			// move category, compare with given parent category id
			if (state.parentCategoryId == parentCategoryId) {
				// move to current parent is nonsense
				setState(state => ({...state, message: 'Category already in the target parent.'}));
				return;
			}
		}
		setState(state => ({...state, message: (void 0)}));
	}, [state.changed, state.parentCategoryId, state.name]);

	const onParentChanged = (value: string) => {
		setState(state => ({...state, parentCategoryId: value, changed: true}));
	};
	const onNameChanged = (value: string) => {
		setState(state => ({...state, name: value, changed: true}));
	};
	const onConfirmClicked = () => {
		if (rename) {
			window.electron.recentProjects.renameCategory(currentCategoryId, state.name);
		} else if (move) {
			window.electron.recentProjects.moveCategory(currentCategoryId, state.parentCategoryId);
		} else {
			if (state.parentCategoryId === RecentProjectRootId) {
				window.electron.recentProjects.addCategory({id: generateCategoryId(map), name: state.name});
			} else {
				window.electron.recentProjects.addCategory(
					{id: generateCategoryId(map), name: state.name}, state.parentCategoryId);
			}
		}
		recentProjectsEventBus.fire(RecentProjectsEventTypes.REPAINT);
		fire(GlobalEventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(GlobalEventTypes.HIDE_DIALOG);
	};

	const title = rename ? 'Rename category' : (move ? 'Move category to' : 'Create new category');
	const parentLabel = move ? 'Move to' : 'Parent category';
	// filter myself and all my descendants when move is true
	const availableOptions = move ? filterAvailableCategoriesForMoveCategory(options, currentCategoryId, parentCategoryId) : options;
	const okButtonLabel = rename ? 'Rename' : (move ? 'Move' : 'Create');

	return <>
		<DialogHeader>
			<DialogTitle>{title}</DialogTitle>
		</DialogHeader>
		<DialogBody data-flex-column={true} ref={containerRef}>
			<UnwrappedCaption>{parentLabel}</UnwrappedCaption>
			<UnwrappedDropdown options={availableOptions} onValueChange={onParentChanged}
			                   value={getSelectedParentCategoryId(availableOptions, state.parentCategoryId)}
			                   disabled={rename} clearable={false}/>
			<UnwrappedCaption>Category name</UnwrappedCaption>
			<UnwrappedInput onValueChange={onNameChanged} value={state.name} disabled={move} ref={inputRef}/>
			{state.message != null ? <InvalidMessage>{state.message}</InvalidMessage> : null}
		</DialogBody>
		<DialogFooter>
			<UnwrappedButton onClick={onConfirmClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN}
			                 disabled={state.message != null}>
				{okButtonLabel}
			</UnwrappedButton>
			<UnwrappedButton onClick={onCancelClicked} ink={ButtonInk.WAIVE} fill={ButtonFill.PLAIN}>
				Cancel
			</UnwrappedButton>
		</DialogFooter>
	</>;
};
