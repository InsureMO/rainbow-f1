import {
	AlertLabel,
	ButtonFill,
	ButtonInk,
	GlobalEventTypes,
	UnwrappedButton,
	UnwrappedButtonBar,
	useGlobalEventBus
} from '@rainbow-d9/n2';
import {useNavigate} from 'react-router-dom';
import {ButtonBarSpacer} from '../../renderer-common/widgets';
import {CommandLines, F1ProjectSettings} from '../../shared';
import {CreateProjectEventTypes, useCreateProjectEventBus} from './event-bus';
import {ProjectModuleBase} from './types';
import {
	validateEnvCli,
	validateModuleName,
	validateModuleNameDuplication,
	validateProjectDirectory,
	validateProjectName
} from './utils';

export const Bar = (props: { settings: F1ProjectSettings }) => {
	const {settings} = props;

	const navigate = useNavigate();
	const global = useGlobalEventBus();
	const {fire} = useCreateProjectEventBus();
	const onBackClicked = () => {
		navigate('/');
	};
	const onCreateProjectClicked = async () => {
		const rules = [
			...[
				() => validateProjectName(settings.name),
				() => validateProjectDirectory(settings.directory)
			].map(validate => ({validate, base: ProjectModuleBase.BASIC, index: 0})),
			...(settings.modules ?? []).map((module, index) => {
				return [
					() => validateModuleName(module.name),
					() => validateModuleNameDuplication({settings, base: ProjectModuleBase.MODULE, index})
				].map(validate => ({validate, base: ProjectModuleBase.MODULE, index}));
			}).flat(),
			...[
				'node', 'npm', 'yarn', 'volta'
			].map(key => {
				return async () => {
					const k = key as keyof CommandLines;
					const [, message] = await validateEnvCli(k, settings.envs?.cli?.[k]);
					return message;
				};
			}).map(validate => ({validate, base: ProjectModuleBase.ENVS, index: 0}))
		];
		for (let {validate, base, index} of rules) {
			const message = await validate();
			if (message != null) {
				global.fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>{message}</AlertLabel>, () => {
					fire(CreateProjectEventTypes.ACTIVE_AND_VALIDATE, base, index);
				});
				return;
			}
		}

		const {success, project, message} = await window.electron.f1.create(settings);
		if (!success) {
			global.fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>{message}</AlertLabel>);
		} else {
			window.electron.f1.open(project);
		}
	};

	return <UnwrappedButtonBar>
		<UnwrappedButton onClick={onBackClicked} ink={ButtonInk.WAIVE} fill={ButtonFill.FILL}>
			Back
		</UnwrappedButton>
		<ButtonBarSpacer/>
		<UnwrappedButton onClick={onCreateProjectClicked} ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}>
			Create
		</UnwrappedButton>
	</UnwrappedButtonBar>;
};