import {useCreateEventBus} from '@rainbow-d9/n1';
import {createContext, ReactNode, useContext} from 'react';
import {F1ModuleSettings} from '../../shared';
import {ProjectModuleBase} from './types';

export enum CreateProjectEventTypes {
	ACTIVE = 'active',
	ACTIVE_AND_VALIDATE = 'active-and-validate',
	VALIDATE = 'validate',
	MODULE_NAME_CHANGED = 'module-name-changed'
}

export interface CreateProjectEventBus {
	fire(type: CreateProjectEventTypes.ACTIVE, base: ProjectModuleBase, index: number): this;

	on(type: CreateProjectEventTypes.ACTIVE, listener: (base: ProjectModuleBase, index: number) => void): this;

	off(type: CreateProjectEventTypes.ACTIVE, listener: (base: ProjectModuleBase, index: number) => void): this;

	fire(type: CreateProjectEventTypes.ACTIVE_AND_VALIDATE, base: ProjectModuleBase, index: number): this;

	on(type: CreateProjectEventTypes.ACTIVE_AND_VALIDATE, listener: (base: ProjectModuleBase, index: number) => void): this;

	off(type: CreateProjectEventTypes.ACTIVE_AND_VALIDATE, listener: (base: ProjectModuleBase, index: number) => void): this;

	fire(type: CreateProjectEventTypes.VALIDATE, base: ProjectModuleBase, index: number): this;

	on(type: CreateProjectEventTypes.VALIDATE, listener: (base: ProjectModuleBase, index: number) => void): this;

	off(type: CreateProjectEventTypes.VALIDATE, listener: (base: ProjectModuleBase, index: number) => void): this;

	fire(type: CreateProjectEventTypes.MODULE_NAME_CHANGED, base: ProjectModuleBase, index: number, settings: F1ModuleSettings): this;

	on(type: CreateProjectEventTypes.MODULE_NAME_CHANGED, listener: (base: ProjectModuleBase, index: number, settings: F1ModuleSettings) => void): this;

	off(type: CreateProjectEventTypes.MODULE_NAME_CHANGED, listener: (base: ProjectModuleBase, index: number, settings: F1ModuleSettings) => void): this;
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