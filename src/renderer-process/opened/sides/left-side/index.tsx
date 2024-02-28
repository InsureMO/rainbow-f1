import {
	FolderRootIcon,
	ProblemIcon,
	RunIcon,
	SearchIcon,
	StructureIcon,
	TerminalIcon,
	TodoIcon
} from '../../../../assets/icons';
import {switchFrame} from '../frames';
import {ProjectFrame} from '../project-frame';
import {SideBarButton, SideContentResizeOn} from '../side-bar';
import {SideContentKey, SideContentPosition} from '../side-bar/event-bus';
import {LeftBar, LeftSideContainer, LeftSideContent} from './widgets';

const LeftBarUppers = () => {
	return <>
		<SideBarButton icon={<FolderRootIcon/>} tooltip="Project"
		               contentPosition={SideContentPosition.UPPER} contentKey={SideContentKey.PROJECT}/>
	</>;
};

const LeftBarLowers = () => {
	return <>
		<SideBarButton icon={<StructureIcon/>} tooltip="Structure"
		               contentPosition={SideContentPosition.LOWER} contentKey={SideContentKey.STRUCTURE}/>
	</>;
};

const LeftBarBottoms = () => {
	return <>
		<SideBarButton icon={<TodoIcon/>} tooltip="Todo"
		               contentPosition={SideContentPosition.BOTTOM} contentKey={SideContentKey.TODO}/>
		<SideBarButton icon={<SearchIcon/>} tooltip="Find"
		               contentPosition={SideContentPosition.BOTTOM} contentKey={SideContentKey.SEARCH}/>
		<SideBarButton icon={<RunIcon/>} tooltip="Run"
		               contentPosition={SideContentPosition.BOTTOM} contentKey={SideContentKey.RUN}/>
		<SideBarButton icon={<TerminalIcon/>} tooltip="Terminal"
		               contentPosition={SideContentPosition.BOTTOM} contentKey={SideContentKey.TERMINAL}/>
		<SideBarButton icon={<ProblemIcon/>} tooltip="Problem"
		               contentPosition={SideContentPosition.BOTTOM} contentKey={SideContentKey.PROBLEM}/>
	</>;
};

export const LeftSide = () => {
	return <LeftSideContainer>
		<LeftBar uppers={<LeftBarUppers/>} lowers={<LeftBarLowers/>} bottoms={<LeftBarBottoms/>}/>
		<LeftSideContent resizeOn={SideContentResizeOn.RIGHT} switchFrame={switchFrame}/>
	</LeftSideContainer>;
};
