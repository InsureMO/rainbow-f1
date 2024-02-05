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

export const CreateCategoryDialog = (props: {
	root: RecentProjectRoot; options: DropdownOptions; map: Record<string, RecentProjectCategory>;
	parentCategoryId?: string;
}) => {
	const {root, options, map, parentCategoryId} = props;

	const {fire} = useGlobalEventBus();
	const recentProjectsEventBus = useRecentProjectsEventBus();
	const inputRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<CreateCategoryDialogState>({changed: false, parentCategoryId, name: ''});
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
		if (siblings.some(category => category.name === name)) {
			setState(state => ({...state, message: 'Category name already exists.'}));
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
	const onCreateClicked = () => {
		if (state.parentCategoryId === '') {
			window.electron.recentProjects.addCategory({id: nanoid(32), name: state.name});
		} else {
			window.electron.recentProjects.addCategory({id: nanoid(32), name: state.name}, state.parentCategoryId);
		}
		recentProjectsEventBus.fire(RecentProjectsEventTypes.REPAINT);
		fire(GlobalEventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(GlobalEventTypes.HIDE_DIALOG);
	};

	return <>
		<DialogHeader>
			<DialogTitle>Create new category</DialogTitle>
		</DialogHeader>
		<DialogBody data-flex-column={true}>
			<UnwrappedCaption>Parent category</UnwrappedCaption>
			<UnwrappedDropdown options={options} onValueChange={onParentChanged} value={state.parentCategoryId}
			                   clearable={false}/>
			<UnwrappedCaption>Category name</UnwrappedCaption>
			<UnwrappedInput onValueChange={onNameChanged} value={state.name} ref={inputRef}/>
			{state.message != null ? <InvalidMessage>{state.message}</InvalidMessage> : null}
		</DialogBody>
		<DialogFooter>
			<UnwrappedButton onClick={onCreateClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN}>
				Create
			</UnwrappedButton>
			<UnwrappedButton onClick={onCancelClicked} ink={ButtonInk.WAIVE} fill={ButtonFill.PLAIN}>
				Cancel
			</UnwrappedButton>
		</DialogFooter>
	</>;
};
