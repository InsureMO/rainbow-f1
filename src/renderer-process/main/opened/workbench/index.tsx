import {F1Project, F1ProjectStructure} from '../../../../shared';
import {LocationBar} from '../location-bar';
import {BottomSide} from '../sides/bottom-side';
import {LeftSide, LeftSideBar} from '../sides/left-side';
import {RightSide, RightSideBar} from '../sides/right-side';
import {StatusBar} from '../status-bar';
import {WorkArea} from '../work-area';
import {WorkbenchEventBusProvider} from './event-bus';
import {ProjectHolder} from './project-holder';
import {ProjectWorkbenchContainer} from './widgets';

export const ProjectWorkbench = (props: { project: F1Project; structure: F1ProjectStructure }) => {
	const {project, structure} = props;

	return <WorkbenchEventBusProvider>
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
	</WorkbenchEventBusProvider>;
};
