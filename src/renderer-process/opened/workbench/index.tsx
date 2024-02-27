import {F1Project} from '../../../shared';
import {LeftBar} from '../left-bar';
import {LocationBar} from '../location-bar';
import {RightBar} from '../right-bar';
import {StatusBar} from '../status-bar';
import {WorkArea} from '../work-area';
import {ProjectWorkbenchContainer} from './widgets';

export const ProjectWorkbench = (props: {project: F1Project}) => {
	const {project} = props;

	return <ProjectWorkbenchContainer>
		<LocationBar project={project}/>
		<LeftBar/>
		<WorkArea/>
		<RightBar/>
		<StatusBar/>
	</ProjectWorkbenchContainer>;
};
