import {VUtils} from '@rainbow-d9/n1';
import {useState} from 'react';
import {F1ModuleSettings, F1ProjectSettings} from '../../shared/project-settings';
import {CreateProjectEventTypes, useCreateProjectEventBus} from './event-bus';
import {BaseState, ProjectModuleBase} from './types';
import {CreateProjectBaseItem, CreateProjectSidebar} from './widgets';

export const SideBar = (props: { settings: F1ProjectSettings }) => {
	const {settings} = props;

	const {fire} = useCreateProjectEventBus();
	const [state, setState] = useState<BaseState>({
		base: ProjectModuleBase.BASIC, index: 0
	});

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
		{settings.d9.map((d9, index) => {
			return <CreateProjectBaseItem data-active={state.base === ProjectModuleBase.D9 && state.index === index}
			                              onClick={onItemClicked(ProjectModuleBase.D9, index)}
			                              key={`d9-${index}`}>
				{getDisplayName(d9, index)}
				<span>@Rainbow-D9</span>
			</CreateProjectBaseItem>;
		})}
		{settings.o23.map((o23, index) => {
			return <CreateProjectBaseItem data-active={state.base === ProjectModuleBase.O23 && state.index === index}
			                              onClick={onItemClicked(ProjectModuleBase.O23, index)}
			                              key={`o23-${index}`}>
				{getDisplayName(o23, index + settings.d9.length)}
				<span>@Rainbow-O23</span>
			</CreateProjectBaseItem>;
		})}
	</CreateProjectSidebar>;
};
