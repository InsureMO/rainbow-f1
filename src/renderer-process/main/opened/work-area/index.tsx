import {WorkAreaEditor} from './editor';
import {WorkAreaHeader} from './header';
import {WorkAreaContainer} from './widgets';

export const WorkArea = () => {
	return <WorkAreaContainer>
		<WorkAreaHeader/>
		<WorkAreaEditor/>
	</WorkAreaContainer>;
};
