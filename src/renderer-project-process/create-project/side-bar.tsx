import {useState} from 'react';
import {CreateProjectEventTypes, useCreateProjectEventBus} from './event-bus';
import {ProjectBase} from './types';
import {CreateProjectBaseItem, CreateProjectSidebar} from './widgets';

interface State {
	base: ProjectBase;
	index: number;
}

export const SideBar = () => {
	const {fire} = useCreateProjectEventBus();
	const [state, setState] = useState<State>({base: ProjectBase.D9, index: 0});

	const onItemClicked = (base: ProjectBase, index: number) => () => {
		setState({base, index});
		fire(CreateProjectEventTypes.ACTIVE, base, index);
	};

	return <CreateProjectSidebar>
		<CreateProjectBaseItem data-active={state.base === ProjectBase.D9 && state.index === 0}
		                       onClick={onItemClicked(ProjectBase.D9, 0)}>
			@Rainbow-D9
		</CreateProjectBaseItem>
		<CreateProjectBaseItem data-active={state.base === ProjectBase.O23 && state.index === 0}
		                       onClick={onItemClicked(ProjectBase.O23, 0)}>
			@Rainbow-O23
		</CreateProjectBaseItem>
	</CreateProjectSidebar>;
};
