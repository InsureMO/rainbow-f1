import {
	FolderRootIcon,
	ProblemIcon,
	RunIcon,
	SearchIcon,
	StructureIcon,
	TerminalIcon,
	TodoIcon
} from '../../../assets/icons';
import {SideBarButton} from '../side-bar';
import {LeftBar, LeftContainer, LeftSideContainer} from './widgets';

const LeftBarUppers = () => {
	return <>
		<SideBarButton icon={<FolderRootIcon/>} tooltip="Project"/>
	</>;
};

const LeftBarLowers = () => {
	return <>
		<SideBarButton icon={<StructureIcon/>} tooltip="Structure"/>
	</>;
};

const LeftBarBottoms = () => {
	return <>
		<SideBarButton icon={<TodoIcon/>} tooltip="Todo"/>
		<SideBarButton icon={<SearchIcon/>} tooltip="Find"/>
		<SideBarButton icon={<RunIcon/>} tooltip="Run"/>
		<SideBarButton icon={<TerminalIcon/>} tooltip="Terminal"/>
		<SideBarButton icon={<ProblemIcon/>} tooltip="Problem"/>
	</>;
};

export const LeftSide = () => {
	return <LeftSideContainer>
		<LeftBar uppers={<LeftBarUppers/>} lowers={<LeftBarLowers/>} bottoms={<LeftBarBottoms/>}/>
		<LeftContainer></LeftContainer>
	</LeftSideContainer>;
};
