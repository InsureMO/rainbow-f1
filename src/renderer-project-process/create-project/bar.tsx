import {VUtils} from '@rainbow-d9/n1';
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

export const Bar = (props: { settings: F1ProjectSettings }) => {
	const {settings} = props;

	const navigate = useNavigate();
	const global = useGlobalEventBus();
	const {fire} = useCreateProjectEventBus();
	const onBackClicked = () => {
		navigate('/');
	};
	const onCreateProjectClicked = () => {
		// TODO CREATE PROJECT, CREATE PROJECT ON SELECTED DIRECTORY WITH FILLED SETTINGS DATA
		if (VUtils.isBlank(settings.name)) {
			global.fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>
				Project name is required.
			</AlertLabel>, () => {
				fire(CreateProjectEventTypes.ACTIVE_AND_VALIDATE, ProjectModuleBase.BASIC, 0);
			});
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