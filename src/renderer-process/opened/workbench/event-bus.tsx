import {useCreateEventBus} from '@rainbow-d9/n1';
import {createContext, ReactNode, useContext} from 'react';

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
	OPEN = 'open', OPENED = 'opened', CLOSE = 'close', CLOSED = 'closed'
}

export interface WorkbenchEventBus {
	fire(type: WorkbenchEventTypes.OPEN, key: SideContentKey, pos: SideContentPosition): this;

	on(type: WorkbenchEventTypes.OPEN, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: WorkbenchEventTypes.OPEN, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	fire(type: WorkbenchEventTypes.CLOSE, key: SideContentKey, pos: SideContentPosition): this;

	on(type: WorkbenchEventTypes.CLOSE, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: WorkbenchEventTypes.CLOSE, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	fire(type: WorkbenchEventTypes.OPENED, key: SideContentKey, pos: SideContentPosition): this;

	on(type: WorkbenchEventTypes.OPENED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: WorkbenchEventTypes.OPENED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	fire(type: WorkbenchEventTypes.CLOSED, key: SideContentKey, pos: SideContentPosition): this;

	on(type: WorkbenchEventTypes.CLOSED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: WorkbenchEventTypes.CLOSED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;
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