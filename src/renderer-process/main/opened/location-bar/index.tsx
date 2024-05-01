import {Icons} from '@rainbow-d9/n2';
import {Fragment, useEffect, useState} from 'react';
import {ProjectIcon} from '../../../../assets/icons';
import {F1Project} from '../../../../shared';
import {Resource} from '../types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../workbench/event-bus';
import {useAskProject, useProject} from '../workbench/use-project';
import {LocationBarContainer, LocationSegment} from './widgets';

interface LocationState {
	project?: F1Project;
	resource?: Resource;
}

export const LocationBar = () => {
	const {on, off} = useWorkbenchEventBus();
	const {ask} = useProject();
	const [state, setState] = useState<LocationState>({});
	useAskProject(ask, (project) => setState({project}));
	useEffect(() => {
		const onResourceActive = (resource: Resource) => {
			setState(state => ({...state, resource}));
		};
		on(WorkbenchEventTypes.RESOURCE_SELECTED, onResourceActive);
		return () => {
			off(WorkbenchEventTypes.RESOURCE_SELECTED, onResourceActive);
		};
	}, [on, off]);

	if (state.project == null) {
		return <LocationBarContainer/>;
	}

	return <LocationBarContainer>
		<LocationSegment>
			<ProjectIcon/>
			<span>{state.project.name}</span>
		</LocationSegment>
		{state.resource == null
			? null
			: state.resource.segments.map((segment, index) => {
				return <Fragment key={`${segment.label}-${index}`}>
					<Icons.AngleRight/>
					<LocationSegment>
						{segment.icon}
						<span>{segment.label}</span>
					</LocationSegment>
				</Fragment>;
			})}
	</LocationBarContainer>;
};
