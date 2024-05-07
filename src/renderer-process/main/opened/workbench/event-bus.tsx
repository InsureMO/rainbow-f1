import {useCreateEventBus} from '@rainbow-d9/n1';
import {createContext, ReactNode, useContext} from 'react';
import {F1Project, F1ProjectStructure} from '../../../../shared';
import {Resource} from '../types';

export enum SideContentKey {
	PROJECT = 'project',
	STRUCTURE = 'structure',
	TODO = 'todo',
	SEARCH = 'search',
	RUN = 'run',
	TERMINAL = 'terminal',
	PROBLEM = 'problem',
	NOTIFICATIONS = 'notifications',
	DATABASE = 'database',
}

export enum SideContentPosition {
	LEFT_UPPER = 'left-upper', LEFT_LOWER = 'left-lower',
	RIGHT_UPPER = 'right-upper', RIGHT_LOWER = 'right-lower',
	BOTTOM = 'bottom'
}

export enum WorkbenchEventTypes {
	OPEN_SIDE_FRAME = 'open-side-frame', SIDE_FRAME_OPENED = 'side-frame-opened',
	CLOSE_SIDE_FRAME = 'close-side-frame', SIDE_FRAME_CLOSED = 'side-frame-closed',
	ASK_PROJECT = 'ask-project', ASK_PROJECT_STRUCTURE = 'ask-project-structure',
	RESOURCE_SELECTED = 'resource-selected',
	OPEN_RESOURCE = 'open-resource', CLOSE_RESOURCE = 'close-resource'
}

export interface WorkbenchEventBus {
	fire(type: WorkbenchEventTypes.OPEN_SIDE_FRAME, key: SideContentKey, pos: SideContentPosition): this;

	on(type: WorkbenchEventTypes.OPEN_SIDE_FRAME, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: WorkbenchEventTypes.OPEN_SIDE_FRAME, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	fire(type: WorkbenchEventTypes.CLOSE_SIDE_FRAME, key: SideContentKey, pos: SideContentPosition): this;

	on(type: WorkbenchEventTypes.CLOSE_SIDE_FRAME, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: WorkbenchEventTypes.CLOSE_SIDE_FRAME, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	fire(type: WorkbenchEventTypes.SIDE_FRAME_OPENED, key: SideContentKey, pos: SideContentPosition): this;

	on(type: WorkbenchEventTypes.SIDE_FRAME_OPENED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: WorkbenchEventTypes.SIDE_FRAME_OPENED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	fire(type: WorkbenchEventTypes.SIDE_FRAME_CLOSED, key: SideContentKey, pos: SideContentPosition): this;

	on(type: WorkbenchEventTypes.SIDE_FRAME_CLOSED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: WorkbenchEventTypes.SIDE_FRAME_CLOSED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	fire(type: WorkbenchEventTypes.ASK_PROJECT, callback: (project: F1Project) => void): this;

	on(type: WorkbenchEventTypes.ASK_PROJECT, listener: (callback: (project: F1Project) => void) => void): this;

	off(type: WorkbenchEventTypes.ASK_PROJECT, listener: (callback: (project: F1Project) => void) => void): this;

	fire(type: WorkbenchEventTypes.ASK_PROJECT_STRUCTURE, callback: (project: F1Project, structure: F1ProjectStructure) => void): this;

	on(type: WorkbenchEventTypes.ASK_PROJECT_STRUCTURE, listener: (callback: (project: F1Project, structure: F1ProjectStructure) => void) => void): this;

	off(type: WorkbenchEventTypes.ASK_PROJECT_STRUCTURE, listener: (callback: (project: F1Project, structure: F1ProjectStructure) => void) => void): this;

	fire(type: WorkbenchEventTypes.RESOURCE_SELECTED, resource: Resource): this;

	on(type: WorkbenchEventTypes.RESOURCE_SELECTED, listener: (resource: Resource) => void): this;

	off(type: WorkbenchEventTypes.RESOURCE_SELECTED, listener: (resource: Resource) => void): this;

	fire(type: WorkbenchEventTypes.OPEN_RESOURCE, resource: Resource): this;

	on(type: WorkbenchEventTypes.OPEN_RESOURCE, listener: (resource: Resource) => void): this;

	off(type: WorkbenchEventTypes.OPEN_RESOURCE, listener: (resource: Resource) => void): this;

	fire(type: WorkbenchEventTypes.CLOSE_RESOURCE, resource?: Resource): this;

	on(type: WorkbenchEventTypes.CLOSE_RESOURCE, listener: (resource?: Resource) => void): this;

	off(type: WorkbenchEventTypes.CLOSE_RESOURCE, listener: (resource?: Resource) => void): this;
}

const Context = createContext<WorkbenchEventBus>({} as WorkbenchEventBus);
Context.displayName = 'EventBus';

export const WorkbenchEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<WorkbenchEventBus>('workbench');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useWorkbenchEventBus = () => useContext(Context);