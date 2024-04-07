import {useState} from 'react';
import {ProjectIcon} from '../../../../assets/icons';
import {F1Project} from '../../../../shared';
import {useAskProject, useProject} from '../workbench/use-project';
import {LocationBarContainer, LocationSegment} from './widgets';

interface LocationState {
	project?: F1Project;
}

export const LocationBar = () => {
	const {ask} = useProject();
	const [state, setState] = useState<LocationState>({});
	useAskProject(ask, (project) => setState({project}));

	if (state.project == null) {
		return <LocationBarContainer/>;
	}

	return <LocationBarContainer>
		<LocationSegment>
			<ProjectIcon/>
			<span>{state.project.name}</span>
		</LocationSegment>
	</LocationBarContainer>;
};
