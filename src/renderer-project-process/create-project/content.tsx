import {useEffect, useState} from 'react';
import {F1ProjectSettings} from '../../shared/project-settings';
import {BasicSettings} from './basic-settings';
import {D9Settings} from './d9-settings';
import {CreateProjectEventTypes, useCreateProjectEventBus} from './event-bus';
import {O23Settings} from './o23-settings';
import {BaseState, ProjectModuleBase} from './types';
import {CreateProjectContent} from './widgets';

interface ContextState extends BaseState {
	validate: boolean;
}

export const Content = (props: { settings: F1ProjectSettings }) => {
	const {settings} = props;

	const {on, off, fire} = useCreateProjectEventBus();
	const [state, setState] = useState<ContextState>({
		base: ProjectModuleBase.BASIC, index: 0, validate: false
	});
	useEffect(() => {
		const createOnProjectModuleActive = (validate: boolean) => (base: ProjectModuleBase, index: number) => {
			switch (base) {
				case ProjectModuleBase.BASIC:
					setState({base, index: 0, validate});
					break;
				case ProjectModuleBase.D9:
					setState({base, index, validate});
					break;
				case ProjectModuleBase.O23:
					setState({base, index, validate});
					break;
			}
		};
		const onProjectModuleActive = createOnProjectModuleActive(false);
		const onProjectModuleActiveAndValidate = createOnProjectModuleActive(true);
		on(CreateProjectEventTypes.ACTIVE, onProjectModuleActive);
		on(CreateProjectEventTypes.ACTIVE_AND_VALIDATE, onProjectModuleActiveAndValidate);
		return () => {
			off(CreateProjectEventTypes.ACTIVE, onProjectModuleActive);
			off(CreateProjectEventTypes.ACTIVE_AND_VALIDATE, onProjectModuleActiveAndValidate);
		};
	}, [on, off]);
	useEffect(() => {
		if (state.validate) {
			setState(state => ({...state, validate: false}));
			console.log('fire validation');
			fire(CreateProjectEventTypes.VALIDATE, state.base, state.index);
		}
	}, [fire, state.validate]);

	return <CreateProjectContent>
		{(state.base === ProjectModuleBase.BASIC && state.index === 0) ? <BasicSettings project={settings}/> : null}
		{(state.base === ProjectModuleBase.D9)
			? <D9Settings project={settings} module={settings.d9[state.index]} index={state.index}/>
			: null}
		{(state.base === ProjectModuleBase.O23)
			? <O23Settings project={settings} module={settings.o23[state.index]} index={state.index}/>
			: null}
	</CreateProjectContent>;
};
