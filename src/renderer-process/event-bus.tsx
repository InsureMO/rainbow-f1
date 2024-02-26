import {useCreateEventBus} from '@rainbow-d9/n1';
import {createContext, ReactNode, useContext} from 'react';
import {F1Project} from '../shared';

export enum MainEventTypes {
	SET_PROJECT = 'set-project',
	PROJECT_SETTLED = 'project-settled',
	ASK_PROJECT = 'ask-project',
	SET_FAILED_TO_ASK_PROJECT = 'set-failed-to-ask-project',
	FAILURE_SETTLED = 'failure-settled',
	ASK_PROJECT_FAILURE = 'ask-project-failure'
}

export interface MainEventBus {
	fire(type: MainEventTypes.SET_PROJECT, project: F1Project): this;

	on(type: MainEventTypes.SET_PROJECT, listener: (project: F1Project) => void): this;

	off(type: MainEventTypes.SET_PROJECT, listener: (project: F1Project) => void): this;

	fire(type: MainEventTypes.PROJECT_SETTLED, project: F1Project): this;

	on(type: MainEventTypes.PROJECT_SETTLED, listener: (project: F1Project) => void): this;

	off(type: MainEventTypes.PROJECT_SETTLED, listener: (project: F1Project) => void): this;

	fire(type: MainEventTypes.ASK_PROJECT, callback: (project: F1Project) => void): this;

	on(type: MainEventTypes.ASK_PROJECT, listener: (callback: (project: F1Project) => void) => void): this;

	off(type: MainEventTypes.ASK_PROJECT, listener: (callback: (project: F1Project) => void) => void): this;

	fire(type: MainEventTypes.SET_FAILED_TO_ASK_PROJECT, message: string): this;

	on(type: MainEventTypes.SET_FAILED_TO_ASK_PROJECT, listener: (message: string) => void): this;

	off(type: MainEventTypes.SET_FAILED_TO_ASK_PROJECT, listener: (message: string) => void): this;

	fire(type: MainEventTypes.FAILURE_SETTLED, message: string): this;

	on(type: MainEventTypes.FAILURE_SETTLED, listener: (message: string) => void): this;

	off(type: MainEventTypes.FAILURE_SETTLED, listener: (message: string) => void): this;

	fire(type: MainEventTypes.ASK_PROJECT_FAILURE, callback: (message: string) => void): this;

	on(type: MainEventTypes.ASK_PROJECT_FAILURE, listener: (callback: (message: string) => void) => void): this;

	off(type: MainEventTypes.ASK_PROJECT_FAILURE, listener: (callback: (message: string) => void) => void): this;
}

const Context = createContext<MainEventBus>({} as MainEventBus);
Context.displayName = 'EventBus';

export const MainEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<MainEventBus>('main');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useMainEventBus = () => useContext(Context);