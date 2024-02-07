import {useEffect, useState} from 'react';
import {F1ProjectSettings} from '../../shared/project-settings';
import {BasicSettings} from './basic-settings';
import {D9Settings} from './d9-settings';
import {CreateProjectEventTypes, useCreateProjectEventBus} from './event-bus';
import {O23Settings} from './o23-settings';
import {BaseState, ProjectModuleBase} from './types';
import {CreateProjectContent} from './widgets';

export const Content = (props: { settings: F1ProjectSettings }) => {
	const {settings} = props;

	const {on, off} = useCreateProjectEventBus();
	const [state, setState] = useState<BaseState>({
		base: ProjectModuleBase.BASIC, index: 0
	});
	useEffect(() => {
		const onProjectModuleActive = (base: ProjectModuleBase, index: number) => {
			switch (base) {
				case ProjectModuleBase.BASIC:
					setState({base, index: 0});
					break;
				case ProjectModuleBase.D9:
					setState({base, index});
					break;
				case ProjectModuleBase.O23:
					setState({base, index});
					break;
			}
		};
		on(CreateProjectEventTypes.ACTIVE, onProjectModuleActive);
		return () => {
			off(CreateProjectEventTypes.ACTIVE, onProjectModuleActive);
		};
	}, [on, off]);

	return <CreateProjectContent>
		{(state.base === ProjectModuleBase.BASIC && state.index === 0) ? <BasicSettings settings={settings}/> : null}
		{(state.base === ProjectModuleBase.D9)
			? <D9Settings settings={settings.d9[state.index]} index={state.index}/>
			: null}
		{(state.base === ProjectModuleBase.O23)
			? <O23Settings settings={settings.o23[state.index]} index={state.index}/>
			: null}
	</CreateProjectContent>;
};
