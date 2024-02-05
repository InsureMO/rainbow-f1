import {
	ButtonFill,
	ButtonInk,
	DialogBody,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DropdownOptions,
	GlobalEventTypes,
	UnwrappedButton,
	UnwrappedCaption,
	UnwrappedDropdown,
	UnwrappedInput,
	useGlobalEventBus
} from '@rainbow-d9/n2';
import {nanoid} from 'nanoid';
import {Fragment, useEffect, useRef, useState} from 'react';
import {RecentProjectCategory, RecentProjectRoot} from '../../../shared/types';
import {RecentProjectsEventTypes, useRecentProjectsEventBus} from '../event-bus';
import {InvalidMessage} from '../widgets';

interface CreateCategoryDialogState {
	changed: boolean;
	parentCategoryId: string;
	name: string;
	message?: string;
}

export const CategoryDialog = (props: {
	root: RecentProjectRoot; options: DropdownOptions; map: Record<string, RecentProjectCategory>;
	parentCategoryId?: string;
	currentCategoryId?: string; rename?: boolean;
}) => {
	const {
		root, options, map,
		parentCategoryId = '',
		currentCategoryId, rename = false
	} = props;

	const {fire} = useGlobalEventBus();
	const recentProjectsEventBus = useRecentProjectsEventBus();
	const inputRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<CreateCategoryDialogState>(() => {
		const category = map[currentCategoryId];
		return {changed: false, parentCategoryId, name: category?.name};
	});
	useEffect(() => {
		inputRef.current?.focus();
	}, []);
	useEffect(() => {
		if (!state.changed) {
			return;
		}
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
			// TODO RENAME CATEGORY
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

	const title = rename ? 'Rename category' : 'Create new category';
	const okButtonLabel = rename ? 'Rename' : 'Create';

	return <>
		<DialogHeader>
			<DialogTitle>{title}</DialogTitle>
		</DialogHeader>
		<DialogBody data-flex-column={true}>
			<UnwrappedCaption>Parent category</UnwrappedCaption>
			<UnwrappedDropdown options={options} onValueChange={onParentChanged} value={state.parentCategoryId}
			                   disabled={rename}
			                   clearable={false}/>
			<UnwrappedCaption>Category name</UnwrappedCaption>
			<UnwrappedInput onValueChange={onNameChanged} value={state.name}
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
