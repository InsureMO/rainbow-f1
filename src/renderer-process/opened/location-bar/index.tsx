import {useState} from 'react';
import {ProjectIcon} from '../../../assets/icons';
import {F1Project} from '../../../shared';
import {ProjectBaseProps} from '../types';
import {LocationBarContainer, LocationSegment} from './widgets';

interface LocationBarProps extends ProjectBaseProps {
}

interface LocationState {
	project: F1Project;
}

export const LocationBar = (props: LocationBarProps) => {
	const {project} = props;

	const [locations, setLocations] = useState<LocationState>({project});

	return <LocationBarContainer>
		<LocationSegment>
			<ProjectIcon/>
			<span>{locations.project.name}</span>
		</LocationSegment>
	</LocationBarContainer>;
};
