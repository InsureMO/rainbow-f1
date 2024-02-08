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
import {F1ProjectSettings} from '../../shared/project-settings';
import {CreateProjectEventTypes, useCreateProjectEventBus} from './event-bus';
import {ProjectModuleBase} from './types';
import {
	validateD9N3N5,
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
	const onCreateProjectClicked = () => {
		const rules = [
			...[
				() => validateProjectName(settings.name),
				() => validateProjectDirectory(settings.directory)
			].map(validate => ({validate, base: ProjectModuleBase.BASIC, index: 0})),
			...(settings.d9 ?? []).map((d9, index) => {
				return [
					() => validateModuleName(d9.name),
					() => validateModuleNameDuplication({settings, base: ProjectModuleBase.D9, index}),
					() => validateD9N3N5(d9.dependencies?.['@rainbow-d9/n3'], d9.dependencies?.['@rainbow-d9/n5'])
				].map(validate => ({validate, base: ProjectModuleBase.D9, index}));
			}).flat(),
			...(settings.o23 ?? []).map((o23, index) => {
				return [
					() => validateModuleName(o23.name),
					() => validateModuleNameDuplication({settings, base: ProjectModuleBase.O23, index})
				].map(validate => ({validate, base: ProjectModuleBase.O23, index}));
			}).flat()
		];
		for (let {validate, base, index} of rules) {
			const message = validate();
			if (message != null) {
				global.fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>{message}</AlertLabel>, () => {
					fire(CreateProjectEventTypes.ACTIVE_AND_VALIDATE, base, index);
				});
			}
		}

		window.electron.f1.create(settings);
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