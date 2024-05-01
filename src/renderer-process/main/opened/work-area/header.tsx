import {useForceUpdate} from '@rainbow-d9/n1';
import {ButtonFill, Icons, UnwrappedButton} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import {EllipsisVerticalIcon, O23PipelineIcon} from '../../../../assets/icons';
import {Resource} from '../types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../workbench/event-bus';
import {WorkAreaResource} from './types';
import {WorkAreaHeaderContainer, WorkAreaHeaderTabContainer, WorkAreaHeaderTabsContainer} from './widgets';

interface WorkAreaHeaderResource extends WorkAreaResource {
	active?: boolean;
	readonly?: boolean;
}

export const WorkAreaHeader = () => {
	const {on, off} = useWorkbenchEventBus();
	const [resources, setResources] = useState<Array<WorkAreaHeaderResource>>([
		{resource: {marker: '1', segments: [{icon: <O23PipelineIcon/>, label: '01-pipeline.yaml'}]}, active: true},
		{resource: {marker: '2', segments: [{icon: <O23PipelineIcon/>, label: '02-pipeline.yaml'}]}}
	]);
	useEffect(() => {
		const onOpenResource = (resource: Resource) => {
			// TODO
		};
		on(WorkbenchEventTypes.OPEN_RESOURCE, onOpenResource);
		return () => {
			on(WorkbenchEventTypes.OPEN_RESOURCE, onOpenResource);
		};
	}, [on, off]);
	const forceUpdate = useForceUpdate();

	const onClicked = (resource: WorkAreaHeaderResource) => () => {
		const currentActive = resources.find(resource => resource.active);
		if (currentActive != null) {
			currentActive.active = false;
		}
		resource.active = true;
		forceUpdate();
		// TODO
	};
	const onCloseClicked = (resource: WorkAreaHeaderResource) => () => {
		// TODO
	};
	const onMoreClicked = () => {
		// TODO
	};

	return <WorkAreaHeaderContainer>
		<WorkAreaHeaderTabsContainer>
			{resources.map((item) => {
				const {resource, active} = item;
				const {marker, segments} = resource;
				const lastSegment = segments[segments.length - 1];
				return <WorkAreaHeaderTabContainer active={active}
				                                   onClick={onClicked(item)}
				                                   key={marker}>
					{lastSegment.icon}
					<span>{lastSegment.label}</span>
					<UnwrappedButton onClick={onCloseClicked(item)} fill={ButtonFill.LINK} leads={[<Icons.Times/>]}
					                 data-close={true}/>
				</WorkAreaHeaderTabContainer>;
			})}
		</WorkAreaHeaderTabsContainer>
		<UnwrappedButton onClick={onMoreClicked} leads={[<EllipsisVerticalIcon/>]} fill={ButtonFill.LINK}/>
	</WorkAreaHeaderContainer>;
};
