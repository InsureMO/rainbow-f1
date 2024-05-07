import {ButtonFill, Icons} from '@rainbow-d9/n2';
import {useEffect, useRef, useState} from 'react';
import {ContextMenuItem, showContextMenu} from '../../../common/context-menu';
import {ModuleFileResource, Resource} from '../types';
import {useWorkbenchEventBus, WorkbenchEventTypes} from '../workbench/event-bus';
import {
	WorkAreaHeaderContainer,
	WorkAreaHeaderTabCloseButton,
	WorkAreaHeaderTabContainer,
	WorkAreaHeaderTabsContainer,
	WorkAreaHeaderTabTitle
} from './widgets';

interface WorkAreaHeaderState {
	active?: Resource;
	resources: Array<Resource>;
}

export const WorkAreaHeader = () => {
	const headerRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const {on, off, fire} = useWorkbenchEventBus();
	const [state, setState] = useState<WorkAreaHeaderState>({resources: []});
	useEffect(() => {
		const onOpenResource = (resource: Resource) => {
			const found = state.resources.find(item => item.marker === resource.marker);
			if (found != null) {
				setState(state => ({...state, active: found}));
			} else {
				setState({resources: [...state.resources, resource], active: resource});
			}
		};
		on(WorkbenchEventTypes.OPEN_RESOURCE, onOpenResource);
		return () => {
			off(WorkbenchEventTypes.OPEN_RESOURCE, onOpenResource);
		};
	}, [on, off, state.resources]);

	const closeResource = (resource: Resource) => {
		const index = state.resources.findIndex(item => item === resource);
		const resources = state.resources.filter(item => item !== resource);
		let nextActive: Undefinable<Resource> = (void 0);
		if (state.active === resource) {
			if (resources.length !== 0) {
				nextActive = resources[Math.min(index, resources.length - 1)];
			}
		} else {
			nextActive = state.active;
		}
		if (nextActive == null) {
			fire(WorkbenchEventTypes.CLOSE_RESOURCE, resource);
		} else {
			fire(WorkbenchEventTypes.OPEN_RESOURCE, nextActive);
		}
		setState({resources, active: nextActive});
	};
	const closeOtherResources = (resource: Resource) => {
		setState({resources: [resource], active: resource});
	};
	const closeAllResources = () => {
		fire(WorkbenchEventTypes.CLOSE_RESOURCE, state.active);
		setState({resources: []});
	};
	const copyPath = async (resource: Resource) => {
		const path = resource.segments.map(segment => segment.label).join('/');
		await window.navigator.clipboard.writeText(path);
	};
	const copyAbsolutePath = async (resource: Resource) => {
		const hasAbsolutePath = (resource as ModuleFileResource).absolutePath != null;
		if (hasAbsolutePath) {
			const path = (resource as ModuleFileResource).absolutePath();
			await window.navigator.clipboard.writeText(path);
		}
	};
	const renameResource = (resource: Resource) => {
		// TODO RENAME RESOURCE
	};
	const onClicked = (resource: Resource) => () => {
		fire(WorkbenchEventTypes.OPEN_RESOURCE, resource);
		setState(state => ({...state, active: resource}));
		fire(WorkbenchEventTypes.RESOURCE_SELECTED, resource);
	};
	const onContextMenu = (resource: Resource) => () => {
		const hasOtherTab = state.resources.length !== 1;
		const hasAbsolutePath = (resource as ModuleFileResource).absolutePath != null;
		showContextMenu([
			{label: 'Close', click: 'close', invoke: () => closeResource(resource)},
			hasOtherTab
				? {label: 'Close Other Tabs', click: 'close-other', invoke: () => closeOtherResources(resource)}
				: null,
			{label: 'Close All Tabs', click: 'close-all', invoke: () => closeAllResources()},
			{type: 'separator'},
			{label: 'Copy Path', click: 'copy-path', invoke: () => copyPath(resource)},
			hasAbsolutePath
				? {label: 'Copy Absolute Path', click: 'copy-absolute-path', invoke: () => copyAbsolutePath(resource)}
				: null,
			resource.renamable
				? {type: 'separator'}
				: null,
			resource.renamable
				? {label: 'Rename', click: 'rename', invoke: () => renameResource(resource)}
				: null
		].filter(x => x != null) as Array<ContextMenuItem>);
	};
	const onCloseClicked = (resource: Resource) => () => closeResource(resource);

	return <WorkAreaHeaderContainer ref={headerRef}>
		<WorkAreaHeaderTabsContainer ref={containerRef}>
			{state.resources.map((resource) => {
				const {marker, segments} = resource;
				const lastSegment = segments[segments.length - 1];
				return <WorkAreaHeaderTabContainer active={resource === state.active}
				                                   onClick={onClicked(resource)}
				                                   onContextMenu={onContextMenu(resource)}
				                                   key={marker}>
					{lastSegment.icon}
					<WorkAreaHeaderTabTitle>{lastSegment.label}</WorkAreaHeaderTabTitle>
					<WorkAreaHeaderTabCloseButton onClick={onCloseClicked(resource)} fill={ButtonFill.LINK}
					                              leads={[<Icons.Times/>]}/>
				</WorkAreaHeaderTabContainer>;
			})}
		</WorkAreaHeaderTabsContainer>
	</WorkAreaHeaderContainer>;
};
