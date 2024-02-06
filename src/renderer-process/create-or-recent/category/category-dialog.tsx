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
import {nanoid} from 'nanoid';
import {useEffect, useRef, useState} from 'react';
import {RecentProjectCategory, RecentProjectRoot} from '../../../shared/types';
import {RecentProjectsEventTypes, useRecentProjectsEventBus} from '../event-bus';
import {InvalidMessage} from '../widgets';
import {RecentProjectCategoryCandidate} from './types';

interface CreateCategoryDialogState {
	changed: boolean;
	parentCategoryId: string;
	name: string;
	message?: string;
}

export const CategoryDialog = (props: {
	root: RecentProjectRoot; options: Array<RecentProjectCategoryCandidate>; map: Record<string, RecentProjectCategory>;
	parentCategoryId?: string;
	currentCategoryId?: string; rename?: boolean; move?: boolean;
}) => {
	const {
		root, options, map,
		parentCategoryId = '',
		currentCategoryId, rename = false, move = false
	} = props;

	const {fire} = useGlobalEventBus();
	const recentProjectsEventBus = useRecentProjectsEventBus();
	const inputRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<CreateCategoryDialogState>(() => {
		const category = map[currentCategoryId];
		return {changed: false, parentCategoryId, name: category?.name ?? ''};
	});
	useEffect(() => {
		inputRef.current?.focus();
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
			if (state.parentCategoryId === '') {
				siblings = root.categories ?? [];
			} else {
				siblings = map[state.parentCategoryId]?.categories ?? [];
			}
			if (siblings.filter(category => category.id !== currentCategoryId).some(category => category.name === name)) {
				setState(state => ({...state, message: 'Category name already exists.'}));
				return;
			}
			if (currentCategoryId != null && map[currentCategoryId].name === name) {
				setState(state => ({...state, message: 'Category name not changed.'}));
				return;
			}
			if (/[\\\/]/.test(name)) {
				setState(state => ({...state, message: 'Category name cannot contain / or \\.'}));
				return;
			}
		} else {
			// move category
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
			if (state.parentCategoryId === '') {
				window.electron.recentProjects.addCategory({id: nanoid(32), name: state.name});
			} else {
				window.electron.recentProjects.addCategory({id: nanoid(32), name: state.name}, state.parentCategoryId);
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
	const availableOptions = move ? options.filter(option => {
		// option is not my current parent, myself, and not my descendants
		return option.value !== currentCategoryId
			&& option.value !== parentCategoryId
			&& !option.parentCategoryIds.some(id => id === currentCategoryId);
	}) : options;
	const okButtonLabel = rename ? 'Rename' : (move ? 'Move' : 'Create');

	return <>
		<DialogHeader>
			<DialogTitle>{title}</DialogTitle>
		</DialogHeader>
		<DialogBody data-flex-column={true}>
			<UnwrappedCaption>{parentLabel}</UnwrappedCaption>
			<UnwrappedDropdown options={availableOptions} onValueChange={onParentChanged} value={state.parentCategoryId}
			                   disabled={rename} clearable={false}/>
			<UnwrappedCaption>Category name</UnwrappedCaption>
			<UnwrappedInput onValueChange={onNameChanged} value={state.name} disabled={move}
			                ref={inputRef}/>
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
