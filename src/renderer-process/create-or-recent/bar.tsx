import {
	ButtonFill,
	ButtonInk,
	GlobalEventTypes,
	UnwrappedButton,
	UnwrappedButtonBar,
	useGlobalEventBus
} from '@rainbow-d9/n2';
import {useCategory} from './category';
import {RecentProjectsEventTypes, useRecentProjectsEventBus} from './event-bus';
import {useRepaint} from './use-repaint';
import {ButtonBarSpacer} from './widgets';

export const Bar = () => {
	const {fire} = useGlobalEventBus();
	const recentProjectsEventBus = useRecentProjectsEventBus();
	const {performCategoryOperation} = useCategory();
	useRepaint();

	const onClearClicked = () => {
		fire(GlobalEventTypes.SHOW_YES_NO_DIALOG, 'Are you sure to clear recent projects?', () => {
			window.electron.recentProjects.clear();
			fire(GlobalEventTypes.HIDE_DIALOG);
			recentProjectsEventBus.fire(RecentProjectsEventTypes.REPAINT);
		}, () => fire(GlobalEventTypes.HIDE_DIALOG));
	};
	const onCreateCategoryClicked = () => performCategoryOperation();
	const onCreateProjectClicked = () => {
		// TODO CREATE PROJECT
	};
	const onOpenFolderClicked = () => {
		// TODO OPEN FOLDER
	};

	const recentProjectsRoot = window.electron.recentProjects.get();
	const hasRecentProjects = (recentProjectsRoot.categories ?? []).length !== 0 || (recentProjectsRoot.projects ?? []).length !== 0;

	return <UnwrappedButtonBar>
		<UnwrappedButton onClick={onClearClicked} ink={ButtonInk.WAIVE} fill={ButtonFill.FILL}
		                 disabled={!hasRecentProjects}>
			Clear recent projects
		</UnwrappedButton>
		<UnwrappedButton onClick={onCreateCategoryClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}>
			New category
		</UnwrappedButton>
		<ButtonBarSpacer/>
		<UnwrappedButton onClick={onCreateProjectClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}>
			New project
		</UnwrappedButton>
		<UnwrappedButton onClick={onOpenFolderClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}>
			Open an existing project
		</UnwrappedButton>
	</UnwrappedButtonBar>;
};