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
	UPPER = 'upper', LOWER = 'lower', BOTTOM = 'bottom'
}

export enum SideEventTypes {
	OPEN = 'open', OPENED = 'opened', CLOSE = 'close', CLOSED = 'closed'
}

export interface SideEventBus {
	fire(type: SideEventTypes.OPEN, key: SideContentKey, pos: SideContentPosition): this;

	on(type: SideEventTypes.OPEN, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: SideEventTypes.OPEN, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	fire(type: SideEventTypes.CLOSE, key: SideContentKey, pos: SideContentPosition): this;

	on(type: SideEventTypes.CLOSE, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: SideEventTypes.CLOSE, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	fire(type: SideEventTypes.OPENED, key: SideContentKey, pos: SideContentPosition): this;

	on(type: SideEventTypes.OPENED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: SideEventTypes.OPENED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	fire(type: SideEventTypes.CLOSED, key: SideContentKey, pos: SideContentPosition): this;

	on(type: SideEventTypes.CLOSED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;

	off(type: SideEventTypes.CLOSED, listener: (key: SideContentKey, pos: SideContentPosition) => void): this;
}

const Context = createContext<SideEventBus>({} as SideEventBus);
Context.displayName = 'EventBus';

export const SideEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<SideEventBus>('side');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSideEventBus = () => useContext(Context);