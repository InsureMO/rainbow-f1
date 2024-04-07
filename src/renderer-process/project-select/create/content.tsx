import {useEffect, useState} from 'react';
import {D9ModuleSettings, F1ModuleSettings, F1ModuleType, F1ProjectSettings, O23ModuleSettings} from '../../../shared';
import {BasicSettings} from './basic-settings';
import {D9Settings} from './d9-settings';
import {EnvsSettings} from './envs-settings';
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
				case ProjectModuleBase.ENVS:
					setState({base, index: 0, validate});
					break;
				case ProjectModuleBase.MODULE:
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

	const Module = (props: { module?: F1ModuleSettings }) => {
		const {module} = props;

		switch (module.type) {
			case F1ModuleType.D9:
				return <D9Settings project={settings} module={module as D9ModuleSettings}
				                   index={state.index}/>;
			case F1ModuleType.O23:
				return <O23Settings project={settings} module={module as O23ModuleSettings}
				                    index={state.index}/>;
			default:
				return null;
		}
	};

	return <CreateProjectContent>
		{(state.base === ProjectModuleBase.BASIC && state.index === 0) ? <BasicSettings project={settings}/> : null}
		{(state.base === ProjectModuleBase.MODULE)
			? <Module module={settings.modules?.[state.index]}/>
			: null}
		{(state.base === ProjectModuleBase.ENVS && state.index === 0) ? <EnvsSettings project={settings}/> : null}
	</CreateProjectContent>;
};
