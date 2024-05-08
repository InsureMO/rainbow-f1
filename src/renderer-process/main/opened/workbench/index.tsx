import {Fragment, useEffect} from 'react';
import {F1Project, F1ProjectStructure} from '../../../../shared';
import {ResourceCacheHolder} from '../../cache';
import {LocationBar} from '../location-bar';
import {BottomSide} from '../sides/bottom-side';
import {LeftSide, LeftSideBar} from '../sides/left-side';
import {RightSide, RightSideBar} from '../sides/right-side';
import {StatusBar} from '../status-bar';
import {WorkArea} from '../work-area';
import {
	SideContentKey,
	SideContentPosition,
	useWorkbenchEventBus,
	WorkbenchEventBusProvider,
	WorkbenchEventTypes
} from './event-bus';
import {ProjectHolder} from './project-holder';
import {ProjectWorkbenchContainer} from './widgets';

const ProjectWorkbenchInitializer = () => {
	const {fire} = useWorkbenchEventBus();
	useEffect(() => {
		// only fire once on initializing
		fire(WorkbenchEventTypes.OPEN_SIDE_FRAME, SideContentKey.PROJECT, SideContentPosition.LEFT_UPPER);
	}, [fire]);

	return <Fragment/>;
};

export interface ProjectWorkbenchProps {
	project: F1Project;
	structure: F1ProjectStructure;
}

export const ProjectWorkbench = (props: ProjectWorkbenchProps) => {
	const {project, structure} = props;

	return <WorkbenchEventBusProvider>
		<ResourceCacheHolder project={project}/>
		<ProjectWorkbenchContainer>
			<ProjectHolder project={project} structure={structure}/>
			<LocationBar/>
			<LeftSideBar/>
			<LeftSide/>
			<WorkArea/>
			<RightSide/>
			<RightSideBar/>
			<BottomSide/>
			<StatusBar/>
		</ProjectWorkbenchContainer>
		<ProjectWorkbenchInitializer/>
	</WorkbenchEventBusProvider>;
};
