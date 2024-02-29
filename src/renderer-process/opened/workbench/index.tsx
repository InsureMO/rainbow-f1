import {F1Project} from '../../../shared';
import {LocationBar} from '../location-bar';
import {BottomSide} from '../sides/bottom-side';
import {LeftSide, LeftSideBar} from '../sides/left-side';
import {RightSide, RightSideBar} from '../sides/right-side';
import {StatusBar} from '../status-bar';
import {WorkArea} from '../work-area';
import {WorkbenchEventBusProvider} from './event-bus';
import {ProjectWorkbenchContainer} from './widgets';

export const ProjectWorkbench = (props: { project: F1Project }) => {
	const {project} = props;

	return <WorkbenchEventBusProvider>
		<ProjectWorkbenchContainer>
			<LocationBar project={project}/>
			<LeftSideBar/>
			<LeftSide project={project}/>
			<WorkArea/>
			<RightSide project={project}/>
			<RightSideBar/>
			<BottomSide project={project}/>
			<StatusBar/>
		</ProjectWorkbenchContainer>
	</WorkbenchEventBusProvider>;
};
