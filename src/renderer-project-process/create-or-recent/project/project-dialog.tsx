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
import {InvalidMessage} from '../../../renderer-common/widgets';
import {RecentProject, RecentProjectHolder, RecentProjectRoot, RecentProjectRootId} from '../../../shared';
import {
	filterAvailableCategoriesForMoveProject,
	getSelectedParentCategoryId,
	RecentProjectCategoryCandidate
} from '../category';
import {RecentProjectsEventTypes, useRecentProjectsEventBus} from '../event-bus';

interface ProjectDialogState {
	changed: boolean;
	parentCategoryId: string;
	name: string;
	message?: string;
}

export const ProjectDialog = (props: {
	root: RecentProjectRoot; options: Array<RecentProjectCategoryCandidate>; map: Record<string, RecentProjectHolder>;
	parentCategoryId?: string; project: RecentProject;
}) => {
	const {
		root, options, map,
		parentCategoryId = RecentProjectRootId, project
	} = props;

	const {fire} = useGlobalEventBus();
	const recentProjectsEventBus = useRecentProjectsEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<ProjectDialogState>(() => {
		return {
			changed: false,
			parentCategoryId: getSelectedParentCategoryId(filterAvailableCategoriesForMoveProject(options, parentCategoryId)),
			name: project.name
		};
	});
	useEffect(() => {
		(containerRef.current?.querySelector('div[data-w=dropdown]') as HTMLDivElement)?.focus();
	}, []);
	useEffect(() => {
		if (!state.changed) {
			return;
		}
		// move parent, compare with given parent category id
		if (state.parentCategoryId == parentCategoryId) {
			// move to current parent is nonsense
			setState(state => ({...state, message: 'Project already in the target category.'}));
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
		window.electron.recentProjects.moveProject(project.id, state.parentCategoryId);
		recentProjectsEventBus.fire(RecentProjectsEventTypes.REPAINT);
		fire(GlobalEventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(GlobalEventTypes.HIDE_DIALOG);
	};

	const title = 'Move project to';
	const parentLabel = 'Move to';
	// filter myself and all my descendants when move is true
	const availableOptions = filterAvailableCategoriesForMoveProject(options, parentCategoryId);
	const okButtonLabel = 'Move';

	return <>
		<DialogHeader>
			<DialogTitle>{title}</DialogTitle>
		</DialogHeader>
		<DialogBody data-flex-column={true} ref={containerRef}>
			<UnwrappedCaption>{parentLabel}</UnwrappedCaption>
			<UnwrappedDropdown options={availableOptions} onValueChange={onParentChanged}
			                   value={getSelectedParentCategoryId(availableOptions, state.parentCategoryId)}
			                   clearable={false}/>
			<UnwrappedCaption>Project</UnwrappedCaption>
			<UnwrappedInput onValueChange={onNameChanged} value={state.name} disabled={true} ref={inputRef}/>
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
