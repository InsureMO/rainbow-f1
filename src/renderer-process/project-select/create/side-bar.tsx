import {useForceUpdate, VUtils} from '@rainbow-d9/n1';
import {useEffect, useState} from 'react';
import {F1ModuleSettings, F1ProjectSettings} from '../../../shared';
import {CreateProjectEventTypes, useCreateProjectEventBus} from './event-bus';
import {BaseState, ProjectModuleBase} from './types';
import {getModuleType} from './utils';
import {CreateProjectBaseItem, CreateProjectSidebar} from './widgets';

export const SideBar = (props: { settings: F1ProjectSettings }) => {
	const {settings} = props;

	const {on, off, fire} = useCreateProjectEventBus();
	const [state, setState] = useState<BaseState>({
		base: ProjectModuleBase.BASIC, index: 0
	});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onActiveAndValidate = (base: ProjectModuleBase, index: number) => {
			setState({base, index});
		};
		on(CreateProjectEventTypes.ACTIVE_AND_VALIDATE, onActiveAndValidate);
		on(CreateProjectEventTypes.MODULE_NAME_CHANGED, forceUpdate);
		return () => {
			off(CreateProjectEventTypes.ACTIVE_AND_VALIDATE, onActiveAndValidate);
			off(CreateProjectEventTypes.MODULE_NAME_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const onItemClicked = (base: ProjectModuleBase, index: number) => () => {
		setState({base, index});
		fire(CreateProjectEventTypes.ACTIVE, base, index);
	};

	const getDisplayName = (module: F1ModuleSettings, index: number) => {
		const {name} = module;
		if (VUtils.isBlank(name)) {
			return <span>Module #{index + 1}</span>;
		} else {
			return <span>{name.trim()}</span>;
		}
	};

	return <CreateProjectSidebar>
		<CreateProjectBaseItem data-active={state.base === ProjectModuleBase.BASIC && state.index === 0}
		                       onClick={onItemClicked(ProjectModuleBase.BASIC, 0)}>
			<span>Basic</span>
		</CreateProjectBaseItem>
		{(settings.modules ?? []).map((module, index) => {
			return <CreateProjectBaseItem data-active={state.base === ProjectModuleBase.MODULE && state.index === index}
			                              onClick={onItemClicked(ProjectModuleBase.MODULE, index)}
			                              key={`d9-${index}`}>
				{getDisplayName(module, index)}
				<span>@Rainbow-{getModuleType(module)}</span>
			</CreateProjectBaseItem>;
		})}
		<CreateProjectBaseItem data-active={state.base === ProjectModuleBase.ENVS && state.index === 0}
		                       onClick={onItemClicked(ProjectModuleBase.ENVS, 0)}>
			<span>Environment</span>
		</CreateProjectBaseItem>
	</CreateProjectSidebar>;
};
