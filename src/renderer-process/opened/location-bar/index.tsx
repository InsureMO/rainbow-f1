import {useEffect, useState} from 'react';
import {ProjectIcon} from '../../../assets/icons';
import {F1Project} from '../../../shared';
import {useProject} from '../workbench/use-project';
import {LocationBarContainer, LocationSegment} from './widgets';

interface LocationState {
	project?: F1Project;
}

export const LocationBar = () => {
	const [locations, setLocations] = useState<LocationState>({});
	const {ask} = useProject();
	useEffect(() => {
		(async () => {
			const project = await ask();
			setLocations({project});
		})();
	}, []);

	if (locations.project == null) {
		return <LocationBarContainer/>;
	}

	return <LocationBarContainer>
		<LocationSegment>
			<ProjectIcon/>
			<span>{locations.project.name}</span>
		</LocationSegment>
	</LocationBarContainer>;
};
