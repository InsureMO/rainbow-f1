import {useCreateEventBus} from '@rainbow-d9/n1';
import {createContext, ReactNode, useContext} from 'react';
import {Resource} from '../opened/types';

export enum WorkAreaEditorEventTypes {
	LOCK_CONTENT = 'lock-content', UNLOCK_CONTENT = 'unlock-content'
}

export interface WorkAreaEditorEventBus {
	fire(type: WorkAreaEditorEventTypes.LOCK_CONTENT, resource: Resource): this;

	on(type: WorkAreaEditorEventTypes.LOCK_CONTENT, listener: (resource: Resource) => void): this;

	off(type: WorkAreaEditorEventTypes.LOCK_CONTENT, listener: (resource: Resource) => void): this;

	fire(type: WorkAreaEditorEventTypes.UNLOCK_CONTENT, resource: Resource): this;

	on(type: WorkAreaEditorEventTypes.UNLOCK_CONTENT, listener: (resource: Resource) => void): this;

	off(type: WorkAreaEditorEventTypes.UNLOCK_CONTENT, listener: (resource: Resource) => void): this;
}

const Context = createContext<WorkAreaEditorEventBus>({} as WorkAreaEditorEventBus);
Context.displayName = 'WorkAreaEditorEventBus';

export const WorkAreaEditorEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<WorkAreaEditorEventBus>('work-area-editor');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useWorkAreaEditorEventBus = () => useContext(Context);