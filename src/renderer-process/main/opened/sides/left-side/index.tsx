import {
	FolderRootIcon,
	ProblemIcon,
	RunIcon,
	SearchIcon,
	StructureIcon,
	TerminalIcon,
	TodoIcon
} from '../../../../../assets/icons';
import {SideContentKey, SideContentPosition} from '../../workbench/event-bus';
import {switchFrame} from '../frames';
import {SideBarButton, SideContentResizeOn} from '../side-bar';
import {LeftBar, LeftSideContainer, LeftSideContent} from './widgets';

const LeftBarUppers = () => {
	return <>
		<SideBarButton icon={<FolderRootIcon/>} tooltip="Project"
		               contentPosition={SideContentPosition.LEFT_UPPER} contentKey={SideContentKey.PROJECT}/>
	</>;
};

const LeftBarLowers = () => {
	return <>
		<SideBarButton icon={<StructureIcon/>} tooltip="Structure"
		               contentPosition={SideContentPosition.LEFT_LOWER} contentKey={SideContentKey.STRUCTURE}/>
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
	return <LeftSideContent resizeOn={SideContentResizeOn.RIGHT}
	                        positions={[SideContentPosition.LEFT_UPPER, SideContentPosition.LEFT_LOWER]}
	                        switchFrame={switchFrame}/>;
};

export const LeftSideBar = () => {
	return <LeftSideContainer>
		<LeftBar uppers={<LeftBarUppers/>} lowers={<LeftBarLowers/>} bottoms={<LeftBarBottoms/>}/>
	</LeftSideContainer>;
};
