import {F1Project} from '../../../shared';
import {LeftSide} from '../left-side';
import {LocationBar} from '../location-bar';
import {RightSide} from '../right-side';
import {StatusBar} from '../status-bar';
import {WorkArea} from '../work-area';
import {ProjectWorkbenchContainer} from './widgets';

export const ProjectWorkbench = (props: { project: F1Project }) => {
	const {project} = props;

	return <ProjectWorkbenchContainer>
		<LocationBar project={project}/>
		<LeftSide/>
		<WorkArea/>
		<RightSide/>
		<StatusBar/>
	</ProjectWorkbenchContainer>;
};
