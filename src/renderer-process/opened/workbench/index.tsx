import {LeftBar} from '../left-bar';
import {LocationBar} from '../location-bar';
import {RightBar} from '../right-bar';
import {StatusBar} from '../status-bar';
import {WorkArea} from '../work-area';
import {ProjectWorkbenchContainer} from './widgets';

export const ProjectWorkbench = () => {
	return <ProjectWorkbenchContainer>
		<LocationBar/>
		<LeftBar/>
		<WorkArea/>
		<RightBar/>
		<StatusBar/>
	</ProjectWorkbenchContainer>;
};
