import {useCreateEventBus} from '@rainbow-d9/n1';
import {createContext, ReactNode, useContext} from 'react';
import {ProjectModuleBase} from './types';

export enum CreateProjectEventTypes {
	ACTIVE = 'active',
}

export interface CreateProjectEventBus {
	fire(type: CreateProjectEventTypes.ACTIVE, base: ProjectModuleBase, index: number): this;

	on(type: CreateProjectEventTypes.ACTIVE, listener: (base: ProjectModuleBase, index: number) => void): this;

	off(type: CreateProjectEventTypes.ACTIVE, listener: (base: ProjectModuleBase, index: number) => void): this;
}

const Context = createContext<CreateProjectEventBus>({} as CreateProjectEventBus);
Context.displayName = 'EventBus';

export const CreateProjectEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<CreateProjectEventBus>('create-project');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useCreateProjectEventBus = () => useContext(Context);