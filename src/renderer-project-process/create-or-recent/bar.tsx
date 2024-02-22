import {
	AlertLabel,
	ButtonFill,
	ButtonInk,
	GlobalEventTypes,
	UnwrappedButton,
	UnwrappedButtonBar,
	useGlobalEventBus
} from '@rainbow-d9/n2';
import {useNavigate} from 'react-router-dom';
import {ButtonBarSpacer} from '../../renderer-common/widgets';
import {useCategory} from './category';
import {RecentProjectsEventTypes, useRecentProjectsEventBus} from './event-bus';
import {useRepaint} from './use-repaint';

export const Bar = () => {
	const navigate = useNavigate();
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
	const selectProjectFolder = () => {
		const {canceled, filePaths} = window.electron.dialog.open({
			title: 'Select project folder',
			buttonLabel: 'Open',
			properties: ['openDirectory', 'createDirectory', 'dontAddToRecent']
		});
		if (canceled) {
			return {canceled, filePaths: []};
		} else {
			return {canceled, filePaths: [filePaths[0]]};
		}
	};
	const onCreateProjectClicked = () => {
		navigate('/create-project');
	};
	const onOpenFolderClicked = async () => {
		const {canceled, filePaths: [path]} = selectProjectFolder();
		if (canceled) {
			return;
		}
		const {success, project, message} = await window.electron.f1.tryToOpen(path);
		if (!success) {
			fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>{message}</AlertLabel>);
		} else {
			window.electron.f1.open(project);
		}
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